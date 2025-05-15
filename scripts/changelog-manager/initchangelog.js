const fs = require('fs-extra');
const path = require('path');

const DEFAULT_TEMPLATE = `# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Initial changelog file created.

## [1.0.0] - YYYY-MM-DD
### Added
- Initial release.
`;

const DEFAULT_TEMPLATE_ZH = `# 更新日志

本文件记录了本项目所有值得注意的变更。

## [未发布]

### 添加
- 初始 changelog 文件创建。

## [1.0.0] - YYYY-MM-DD
### 添加
- 初始发布。
`;

async function initChangelog() {
  const changelogEnPath = path.join(process.cwd(), 'CHANGELOG.en-US.md');
  const changelogZhPath = path.join(process.cwd(), 'CHANGELOG.zh-CN.md');

  if (!fs.existsSync(changelogEnPath)) {
    await fs.writeFile(changelogEnPath, DEFAULT_TEMPLATE, 'utf-8');
    console.log('Created CHANGELOG.en-US.md');
  }

  if (!fs.existsSync(changelogZhPath)) {
    await fs.writeFile(changelogZhPath, DEFAULT_TEMPLATE_ZH, 'utf-8');
    console.log('Created CHANGELOG.zh-CN.md');
  }
}

module.exports = {
  initChangelog,
};
