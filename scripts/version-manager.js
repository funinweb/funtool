const fs = require('fs');
const path = require('path');
const SRC_DIR = path.resolve("./src")

const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
};

function updateChangelog(content, version, date) {
  const header = `## ${version} ${date}`;
  return `${header}\n\n- TODO: description here\n\n${content}`;
}
async function updateVersion(version) {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(await fs.promises.readFile(pkgPath, 'utf-8'));
  pkg.version = version;
  const versionContent = `export const VERSION = '${version}';\n`
	const versionPath = path.join(SRC_DIR, "version.ts")

  await fs.promises.writeFile(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
  await fs.promises.writeFile(versionPath, versionContent, 'utf-8');
}

function hasVersion(content, version) {
  const regex = new RegExp(`^##\\s+${version.replace(/\./g, '\\.')}`, 'm');
  return regex.test(content);
}

function checkChangelogVersion(version) {
  const files = ['CHANGELOG.en-US.md', 'CHANGELOG.zh-CN.md'];
  const missing = [];

  for (const file of files) {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      missing.push(file);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    if (!hasVersion(content, version)) {
      missing.push(file);
    }
  }

  return {
    success: missing.length === 0,
    missing
  };
}

module.exports = {
  getDate,
  updateChangelog,
  updateVersion,
  checkChangelogVersion
};
