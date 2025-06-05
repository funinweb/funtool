import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'app'),
  base: '/funtool/',
  logo:'',
  icon: '/rspress-icon.png',
  lang: 'zh',
  title: 'funtool',
  locales: [
    {
      lang: 'en',
      // 导航栏切换语言的标签
      label: 'English',
      title: 'English',
      description: 'English',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: '简体中文',
      description: '简体中文',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/funinweb/funtool',
      },
    ],
    locales: [
      {
        lang: 'en',
        outlineTitle: 'ON THIS PAGE',
        label:'English',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/funinweb/funtool/tree/main/docs',
          text: '📝 Edit this page on GitHub',
        },
      },
      {
        lang: 'zh',
        outlineTitle: '大纲',
        label:'简体中文',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/funinweb/funtool/tree/main/docs',
          text: '📝 在 GitHub 上编辑此页',
        },
      },
    ],
  },
});
