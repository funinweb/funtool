const { TYPE_LABELS } = require('./constants');

function getHeaderTemplate(lang = 'en-US') {
  return lang === 'zh-CN'
    ? `# 更新日志

\`funtool\` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：发布一个带有新特性功能迭代。
- 主版本号：含有破坏性更新和新特性。

---\n\n`
    : `# Changelog

\`funtool\` strictly follows [Semantic Versioning 2.0.0](https://semver.org/) specification.

#### Release Schedule

- Patch version: bugfix updates (can be released anytime for urgent bugs).
- Minor version: new feature iterations.
- Major version: breaking changes and new features.

---\n\n`;
}
// function updateChangelog(content, changeType, date, version, lang = 'en-US') {
//   const title = `## ${version} (${date})`;
//   const sectionTitle = TYPE_LABELS[changeType]?.[lang] ?? changeType;
//   const insert = `${title}\n\n### ${sectionTitle}\n- _Describe your change here_\n\n`;

//   if (content.includes(title)) return content;
//   return insert + content;
// }
function updateChangelog(content, changeType, date, version, lang = 'en-US') {
  const versionBlock = `\n\n## ${version} - ${date}\n\n- TODO\n`;
  const header = getHeaderTemplate(lang);
  const sectionTitle = TYPE_LABELS[changeType]?.[lang] ?? changeType;
  const title = `## ${version}`
  const insert = `${title}\n\n*${date}*\n\n### ${sectionTitle}\n\n- _Describe your change here_\n\n`;
  // 如果已有 header，则直接插入版本更新内容到 header 下方
  if (content.startsWith('#')) {
    const splitIndex = content.indexOf('---') + 3;
    return content.slice(0, splitIndex) + '\n\n' + insert + content.slice(splitIndex);
  } else {
    return header + insert + '\n';
  }
}

module.exports = {
  updateChangelog,
};
