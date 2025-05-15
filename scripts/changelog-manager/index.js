const fs = require('fs-extra');
const path = require('path');
const { openMarkdownEditor } = require('./openEditor');
const { updateChangelog } = require('./updateChangelog');
const { getDate } = require('../version-manager');

async function editBilingualChangelog(changeType, version, openErrorMessage) {
  const currentDate = getDate();
  const langs = ['en-US', 'zh-CN'];
  const changelogPaths = [];

  for (const lang of langs) {
    const changelogPath = path.join(process.cwd(), `CHANGELOG.${lang}.md`);
    const content = await fs.readFile(changelogPath, 'utf-8').catch(() => '');
    const updated = updateChangelog(content, changeType, currentDate, version, lang);
    await fs.writeFile(changelogPath, updated, 'utf-8');
    changelogPaths.push(changelogPath);
  }

  for (const filePath of changelogPaths) {
    openMarkdownEditor(filePath, openErrorMessage);
  }
}

module.exports = {
  editBilingualChangelog,
};
