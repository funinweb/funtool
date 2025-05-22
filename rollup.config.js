import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import babel from '@rollup/plugin-babel';
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

const extensions = ['.js', '.ts']

const basePlugins = [
	// 打包插件
  resolve(),
  commonjs(),
  typescript({
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
    extensions: extensions,
		check: false,
		exclude: ['node_modules/**']
  }),
  babel({ 
		babelHelpers: 'bundled',
  	extensions: extensions,
		exclude: 'node_modules/**'
	 })
];

const legacyBabelPlugin = babel({
  babelHelpers: 'bundled',
  extensions: extensions,
  exclude: 'node_modules/**',
	presets: ['@babel/preset-env'],
	plugins: [
    // ["@babel/plugin-transform-runtime"]
  ]
});

const exportsMap = {
	'.': {
		import: "./dist/index.esm.js",
		require: "./dist/index.cjs.js",
		default: "./dist/index.umd.js",
	}
};

const bundleMainJS = (input = "src/index.ts") => {
	return [
    {
      input,
      output: [
        { file: 'dist/index.cjs.js', format: 'cjs', plugins: [terser()], sourcemap: true },
        { file: 'dist/index.esm.js', format: 'esm', plugins: [terser()], sourcemap: true },
        { file: 'dist/index.umd.js', format: 'umd', name, plugins: [terser()], sourcemap: true },
      ],
      plugins: basePlugins // 普通构建
    },
    {
      input,
      output: [
        { file: 'dist/browser.global.js', format: 'iife', name: name, sourcemap: true, plugins: [terser()] },
      ],
      plugins: [...basePlugins.filter(p => p !== basePlugins[3]), legacyBabelPlugin]
    }
  ]
}

const bundleModuleJS = (modules) => {
	const outputs = [];
	modules.forEach((module) => {
		outputs.push({
			input: `src/${module}/index.ts`,
			output: [
				{file: `dist/${module}/index.cjs.js`,format: 'cjs',banner,plugins: [terser()],sourcemap: true},
				{file: `dist/${module}/index.esm.js`,format: 'esm',banner,plugins: [terser()],sourcemap: true},
				{file: `dist/${module}/index.umd.js`,format: 'umd',name:name,sourcemap: true,banner,plugins: [terser()]}
			],
			plugins:basePlugins
		})
		exportsMap[`./${module}`] = {
			types: `./dist/${module}/index.d.ts`,
			import: `./dist/${module}/index.esm.js`,
			require: `./dist/${module}/index.cjs.js`,
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
