const inquirer = require("inquirer").default
const fs = require("fs-extra")
const path = require("path")
const { execSync } = require("child_process")
const semver = require("semver")
const { getDate, updateChangelog, updateVersion } = require("./version-manager")
const { initChangelog } = require("./changelog-manager/initChangelog")
const { editBilingualChangelog } = require("./changelog-manager")

const DEFAULT_NPM_REGISTRY = "https://registry.npmjs.org/"
const CUSTOM_NPM_REGISTRY = "http://localhost:4873/"

const LANGUAGES = {
	"zh-CN": {
		name: "中文",
		chooseLanguage: "请选择语言:",
		chooseVersionStrategy: "请选择版本策略:",
		chooseVersionType: "请选择发布类型:",
		chooseChangeType: "请选择更改类型:",
		choosePreid: "请选择预发布标识:",
		confirmPublish: "确认发布吗？",
		releaseSuccess: "发布成功，版本已推送到 GitHub！",
		publishCancelled: "发布已取消",
		npmLoginRequired: "未检测到 npm 用户登录，请使用 `npm login` 登录。",
		useCustomRegistry: "是否使用自定义 npm 仓库？",
		npmRegistrySet: "已设置 npm 仓库为:",
		versionUpdating: "版本将更新为:",
		npmLogin: "用户已登录到 npm",
		openEditorError: "无法打开编辑器，请确保系统已安装默认文本编辑器。",
		versionError: "当前版本不是预发布版本，无法继续迭代",
		buildStart: "📦 正在构建项目...",
		buildSuccess: "📦 构建完成，正在发布到 npm...",
		buildOrPublishFail: "❌ 构建或发布失败：",
		publishNpmSuccess: "🎉 npm 发布成功！",
		askPublishToNpm: "是否继续发布到 npm 仓库？",
		skipPublishToNpm: "已跳过 npm 发布。",
	},
	"en-US": {
		name: "English",
		chooseLanguage: "Select Language:",
		chooseVersionStrategy: "Select version strategy:",
		chooseVersionType: "Select release type:",
		chooseChangeType: "Select change type:",
		choosePreid: "Select prerelease identifier:",
		confirmPublish: "Confirm to publish?",
		releaseSuccess: "Release successful, version pushed to GitHub!",
		publishCancelled: "Publish cancelled",
		npmLoginRequired: "No npm user detected, please login with `npm login`.",
		useCustomRegistry: "Use custom npm registry?",
		npmRegistrySet: "Npm registry set to:",
		versionUpdating: "The version will be updated to:",
		npmLogin: "User is logged in to npm",
		openEditorError: "Unable to open editor, please ensure you have a default text editor installed.",
		versionError: "Current version is not a pre-release version, cannot continue iteration",
		buildStart: "📦 Building project...",
		buildSuccess: "📦 Build complete, publishing to npm...",
		buildOrPublishFail: "❌ Build or publish failed:",
		publishNpmSuccess: "🎉 Published to npm successfully!",
		askPublishToNpm: "Continue to publish to npm registry?",
		skipPublishToNpm: "Skipped npm publish.",
	},
}

const EMOJIS = {
	"zh-CN": [
		{ name: "✨ 新功能", value: "feat" },
		{ name: "🐞 Bug修复", value: "fix" },
		{ name: "📖 文档更新", value: "docs" },
		{ name: "🌐 国际化", value: "i18n" },
		{ name: "🧹 日常维护", value: "chore" },
		{ name: "♻️ 代码重构", value: "refactor" },
	],
	"en-US": [
		{ name: "✨ Features", value: "feat" },
		{ name: "🐞 Bug Fixes", value: "fix" },
		{ name: "📖 Documentation", value: "docs" },
		{ name: "🌐 I18n", value: "i18n" },
		{ name: "🧹 Chores", value: "chore" },
		{ name: "♻️ Refactors", value: "refactor" },
	],
}

let selectedLang = "en-US"
function log(messageKey, ...params) {
	const message = LANGUAGES[selectedLang][messageKey]
	if (!message) return console.log(`Missing key: ${messageKey}`)
	console.log(message, ...params)
}

async function openMarkdownEditor(filePath) {
	try {
		execSync(`open ${filePath}`, { stdio: "inherit" })
	} catch (error) {
		console.error(LANGUAGES[selectedLang].openEditorError)
		process.exit(1)
	}
}

async function chooseLanguage() {
	const { language } = await inquirer.prompt([
		{
			type: "list",
			name: "language",
			message: LANGUAGES[selectedLang].chooseLanguage,
			choices: Object.entries(LANGUAGES).map(([key, value]) => ({ name: value.name, value: key })),
		},
	])
	selectedLang = language
}

async function chooseVersionStrategy() {
	const { strategy } = await inquirer.prompt([
		{
			type: "list",
			name: "strategy",
			message: LANGUAGES[selectedLang].chooseVersionStrategy,
			choices: [
				{
					name:
						selectedLang === "zh-CN"
							? "🔁 继续预发布版本 (例如：1.0.2-alpha.1)"
							: "🔁 Continue prerelease (e.g., 1.0.2-alpha.1)",
					value: "continue",
				},
				{ name: selectedLang === "zh-CN" ? "🆕 选择新的版本类型" : "🆕 Choose new version type", value: "new" },
			],
		},
	])
	return strategy
}

async function chooseVersionType() {
	const { versionType } = await inquirer.prompt([
		{
			type: "list",
			name: "versionType",
			message: LANGUAGES[selectedLang].chooseVersionType,
			choices: ["patch", "minor", "major", "prepatch", "preminor", "premajor"].map((v) => ({
				name: `${v} (${semver.inc("0.0.0", v)})`,
				value: v,
			})),
		},
	])
	return versionType
}

async function choosePreid() {
	const { preid } = await inquirer.prompt([
		{
			type: "list",
			name: "preid",
			message: LANGUAGES[selectedLang].choosePreid,
			choices: ["alpha", "beta", "rc"],
		},
	])
	return preid
}

async function chooseChangeType() {
	const { changeType } = await inquirer.prompt([
		{
			type: "list",
			name: "changeType",
			message: LANGUAGES[selectedLang].chooseChangeType,
			choices: EMOJIS[selectedLang],
		},
	])
	return changeType
}

async function confirmPublish() {
	const { confirm } = await inquirer.prompt([
		{
			type: "confirm",
			name: "confirm",
			message: LANGUAGES[selectedLang].confirmPublish,
			default: false,
		},
	])
	return confirm
}

async function checkNpmLogin() {
	try {
		execSync("npm whoami", { stdio: "pipe" })
		log("npmLogin")
	} catch {
		log("npmLoginRequired")
		process.exit(1)
	}
}

async function setNpmRegistry() {
	const { useCustomRegistry } = await inquirer.prompt([
		{
			type: "confirm",
			name: "useCustomRegistry",
			message: LANGUAGES[selectedLang].useCustomRegistry,
			default: false,
		},
	])
	const registry = useCustomRegistry ? CUSTOM_NPM_REGISTRY : DEFAULT_NPM_REGISTRY
	execSync(`npm config set registry ${registry}`)
	log("npmRegistrySet", registry)
}

async function publishRelease(version) {
	log("versionUpdating", version)
	await updateVersion(version)
	execSync("git add .")
	execSync(`git commit -m "chore: release ${version}"`)
	execSync(`git tag v${version}`)
	execSync("git push origin main")
	execSync("git push --tags")
	log("releaseSuccess")
}

// Dry-run 支持
const isDryRun = process.argv.includes("--dry-run")

async function main() {
	await chooseLanguage()
	await initChangelog()
	await checkNpmLogin()
	await setNpmRegistry()

	const pkg = JSON.parse(await fs.readFile("package.json", "utf-8"))
	const currentVersion = pkg.version
	let nextVersion

	const strategy = await chooseVersionStrategy()
	if (strategy === "continue") {
		const preid = semver.prerelease(currentVersion)?.[0]
		if (!preid) {
			console.error(LANGUAGES[selectedLang].versionError)
			process.exit(1)
		}
		nextVersion = semver.inc(currentVersion, "prerelease", preid)
	} else {
		const versionType = await chooseVersionType()
		let preid
		if (["prepatch", "preminor", "premajor"].includes(versionType)) {
			preid = await choosePreid()
		}
		nextVersion = semver.inc(currentVersion, versionType, preid)
	}

	const changeType = await chooseChangeType()
	await editBilingualChangelog(changeType, nextVersion, LANGUAGES[selectedLang].openEditorError)

	if (isDryRun) {
		console.log(`Dry-run mode: Version ${nextVersion} update simulated (no actual changes made).`)
		process.exit(0)
	}

	if (await confirmPublish()) {
		await publishRelease(nextVersion)
		const { publishToNpm } = await inquirer.prompt([
			{
				type: "confirm",
				name: "publishToNpm",
				message:
					selectedLang === "zh-CN" ? "是否继续发布到 npm 仓库？" : "Continue to publish to npm registry?",
				default: true,
			},
		])

		if (publishToNpm) {
			try {
				log("buildStart")
				execSync("npm run build", { stdio: "inherit" })

				log("buildSuccess")
				execSync("npm publish", { stdio: "inherit" })

				log("publishNpmSuccess")
			} catch (error) {
				console.error(LANGUAGES[selectedLang].buildOrPublishFail, error.message)
				process.exit(1)
			}
		} else {
			log("skipPublishToNpm")
		}
	} else {
		log("publishCancelled")
	}
}

main()
