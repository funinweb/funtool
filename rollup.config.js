import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import babel from "rollup-plugin-babel"
import path from 'path'
import fs from 'fs'
import terser from '@rollup/plugin-terser';
import {dts} from 'rollup-plugin-dts'

const pkgPath = path.resolve('./package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const {name, version, license} = pkg

const banner =
  '/**\n' +
  ` * funtool v${version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} xiaoqiujun\n` +
  ` * Released under the ${license} License.\n` +
  ' */';

const modules = fs.readdirSync('src').filter((name) =>
	fs.statSync(path.join('src', name)).isDirectory()
);

const basePlugins = [
	// 打包插件
  resolve(),
  commonjs(),
  typescript({
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
    extensions: ['.js', '.ts']
  }),
  babel({ exclude: 'node_modules/**' })
];

const exportsMap = {
	'.': {
		import: "./dist/index.esm.js",
		require: "./dist/index.cjs.js",
		types: "./dist/index.d.ts",
		default: "./dist/index.umd.js"
	}
};

const bundleMainJS = (input = "src/index.ts") => {
	const outputs = [
		{ file: 'dist/index.cjs.js', format: 'cjs', plugins: [terser()], sourcemap: false },
		{ file: 'dist/index.esm.js', format: 'esm', plugins: [terser()], sourcemap: false },
		{ file: 'dist/index.umd.js', format: 'umd', name, plugins: [terser()], sourcemap: true },
		{ file: 'dist/browser.global.js', format: 'iife', name, plugins: [terser()], sourcemap: true }
	];
	return [{
		input,
		output: outputs,
		plugins: basePlugins
	}]
}

const bundleModuleJS = (modules) => {
	const outputs = [];
	modules.forEach((module) => {
		outputs.push({
			input: `src/${module}/index.ts`,
			output: [
				{file: `dist/${module}/index.cjs.js`,format: 'cjs',banner,plugins: [terser()],sourcemap: false},
				{file: `dist/${module}/index.esm.js`,format: 'esm',banner,plugins: [terser()],sourcemap: false},
				{file: `dist/${module}/index.umd.js`,format: 'umd',name:name,sourcemap: true,banner,plugins: [terser()]}
			],
			plugins:basePlugins
		})
		exportsMap[`./${module}`] = {
			import: `./dist/${module}/index.esm.js`,
			require: `./dist/${module}/index.cjs.js`,
			types: `./dist/${module}/index.d.ts`,
			default: `./dist/${module}/index.umd.js`
		}
	})
	return outputs;
}
const bundleDTS = (modules) => {
	const outputs = [{
		input: 'src/index.ts',
		output: { file: 'dist/index.d.ts'},
		plugins: [dts()]
	}];
	modules.forEach((module) => {
		outputs.push({
			input:`src/${module}/index.ts`,
			output: { file: `dist/${module}/index.d.ts`},
			plugins: [dts()]
		})
	})
	return outputs
}

const moduleConfigs = [...bundleMainJS(),...bundleModuleJS(modules)]
const dtsConfigs = [...bundleDTS(modules)]
pkg.exports = exportsMap
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

export default [...moduleConfigs, ...dtsConfigs]
