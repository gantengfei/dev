
# 开发环境配置 `.env.development`
```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_ENV = 'development'

VITE_APP_TITLE = '开发环境配置'

# 输出文件版本
VITE_APP_VERSION = '0.0.0-dev'

# 指定输出路径
VITE_APP_OUTDir = 'dist'

# 服务器请求响应协议
VITE_APP_SERVER_PROTOCOL = 'http://'
VITE_SERVER_API = '10.181.23.233'

# 前端部署路径
VITE_APP_WEB_PATH_API = ''

# 后台服务器数据路径
VITE_DATA_REAR = '/DATAS'
```

# 生产环境配置 `.env.production`
```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_ENV = 'production'

VITE_APP_TITLE = '生产环境配置'

# 输出文件版本 递增规则：重大变更.功能新增.Bug修复+构建元数据
VITE_APP_VERSION = '1.0.0+20250819'

# 指定输出路径
VITE_APP_OUTDir = 'qh'

# 服务器请求响应协议
VITE_APP_SERVER_PROTOCOL = 'http://'
VITE_SERVER_API = '10.181.23.233'

# 前端部署路径
VITE_APP_WEB_PATH_API = '/qh'

# 后台服务器数据路径
VITE_DATA_REAR = '/DATAS'
```


# Vite常用基本配置 `vite.config.ts`
``` TypeScript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_APP_WEB_PATH_API, // 开发或生产环境服务的公共基础路径 配置引入相对路径
    publicDir: 'public', // 静态资源服务的文件夹
    plugins: [vue()],
    server: {
      host: '0.0.0.0', // 指定服务器监听IP地址
      // port: 5173, // 指定开发服务器端口
      open: true, // 启动时自动在浏览器中打开应用程序
      proxy: {
        // 后台数据
        [env.VITE_DATA_REAR]: {
          target: `${env.VITE_APP_SERVER_PROTOCOL}${env.VITE_SERVER_API}`,
          ws: true,
          changeOrigin: true,
          rewrite(path) {
            return path.replace(`^${env.VITE_DATA_REAR}`, '')
          }
        },
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: env.VITE_APP_OUTDir, // 指定输出路径,默认值：dist
      // assetsDir: 'assets', // 指定生成静态文件目录,默认值：assets
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境时移除console
          drop_debugger: true, // 生产环境时去除debugger
        },
      },
      rollupOptions: {
        output: {
          // 依赖包-分包处理
          manualChunks(id) {
            if (id.includes('node_modules') && id.endsWith('.js') || id.endsWith('.ts')) {
              return 'vendor';
            }
          },
          // 默认生成的文件名通常包含哈希值（如app.123456.js），但不包含版本号
          // 使用哈希值([hash])和版本号同时作为文件名后缀
          entryFileNames: `assets/[name].${env.VITE_APP_VERSION}.[hash].js`,
          chunkFileNames: `assets/[name].${env.VITE_APP_VERSION}.[hash].js`,
          assetFileNames: `assets/[name].${env.VITE_APP_VERSION}.[hash].[ext]`
        }
      }
    }
  })
}
```
