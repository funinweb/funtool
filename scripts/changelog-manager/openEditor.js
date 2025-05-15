const { execSync } = require('child_process');
const os = require('os');

function openMarkdownEditor(filePath, errorMessage) {
  const openCommand = process.platform === 'win32'
    ? 'start'
    : process.platform === 'linux'
    ? 'xdg-open'
    : 'open';

  try {
    execSync(`${openCommand} "${filePath}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error(errorMessage);
    process.exit(1);
  }
}

module.exports = {
  openMarkdownEditor,
};
