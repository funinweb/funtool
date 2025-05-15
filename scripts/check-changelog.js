const fs = require('fs');
const path = require('path');

const version = require('../package.json').version;

function readFileSafe(filepath) {
  if (!fs.existsSync(filepath)) {
    console.error(`❌ Missing file: ${filepath}`);
    process.exit(1);
  }
  return fs.readFileSync(filepath, 'utf-8');
}

const changelogEn = readFileSafe(path.resolve('./CHANGELOG.en-US.md'));
const changelogZh = readFileSafe(path.resolve('./CHANGELOG.zh-CN.md'));

function hasVersion(content, version) {
  const versionPattern = new RegExp(`^##\\s+${version.replace(/\./g, '\\.')}(\\s|$)`, 'm');
  return versionPattern.test(content);
}

if (!hasVersion(changelogEn, version)) {
  console.error(`❌ CHANGELOG.en-US.md is missing version ${version}`);
  process.exit(1);
}

if (!hasVersion(changelogZh, version)) {
  console.error(`❌ CHANGELOG.zh-CN.md is missing version ${version}`);
  process.exit(1);
}

console.log(`✅ Both changelogs contain version ${version}`);
