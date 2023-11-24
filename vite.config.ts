import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig(({ command, mode}) => {
  const config: UserConfig = {}
  config.build = {
    manifest: true,
    rollupOptions: {
      /**
       * 这里虽然使用的是多入口界面，但是在文件优化时候CS和SW之间共享的内容不需要抽象，需要分开打包
       */
      input: {
        'dev page': resolve(__dirname, 'index.html'),
        /** 每个CS都是一个单独的page，这里需要写脚本进行自动化转换 */
        'content script': resolve(__dirname, 'src/contents/index.ts'),
        /** SW同上 */
        'service works': resolve(__dirname, 'src/background/index.tsx')
      }
    }
  }
  config.plugins = [react()]
  return config
})
