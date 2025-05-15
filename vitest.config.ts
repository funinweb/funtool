/*
 * @version: 请写项目版本
 * @author: xiaoqiujun
 * @Github: https://github.com/xiaoqiujun
 * @date: 
 * @LastEditors: xiaoqiujun
 * @LastEditTime: 2025-05-07 16:33:55
 * @summary: 
 * @FilePath: /funtool/vitest.config.ts
 */
import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    coverage: {
      provider: 'istanbul',
      // include: ['src/**/*'],
      // exclude: ['src/**/__tests__/**','test?(s)/**'],
    },
    watch: false,
  },
});