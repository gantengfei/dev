
# 项目运行环境区分

项目在本地运行和打包线上运行时 或者是测试环境时有些环境是不一样的,所以 vite 提供了一种方式让我们可以区分不同的环境来运行。

## 新建.env.xxx
项目目录下新增 .env.development 和 .env.production 文件

设置.env中的内容信息 注意vue3+vite 必须使用VITE开头的配置信息 否则无法获取

**.env.development**
```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_ENV = 'development'

VITE_APP_TITLE = '开发环境配置'

# 前端部署路径
VITE_APP_WEB_PATH_API = ''

# 前端请求路径
VITE_APP_BASE_API = '/api'

# 后端服务器路径
VITE_BASE_URL_REAR = '127.0.0.1:8080'
```

**.env.production**
```
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_ENV = 'production'

VITE_APP_TITLE = '生产环境配置'

# 前端部署路径
VITE_APP_WEB_PATH_API = ''

# 前端请求路径
VITE_APP_BASE_API = '/api'

# 后端服务器路径
VITE_BASE_URL_REAR = '127.0.0.1'
```

## 配置package.json
新增完成之后 在根目录下的 `package.json` 中修改 `scripts` 的 `dev` 和 `buid` 如下：
``` Json
  "scripts": {
    "dev": "vite --mode development",
    "build": "run-p type-check build-only",
    "build:dev": "run-p type-check build-only:dev",
    // "preview": "vite preview",
    "build-only": "vite build --mode production",
    "build-only:dev": "vite build --mode development",
    // "type-check": "vue-tsc --noEmit -p tsconfig.app.json --composite false",
    // "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    // "format": "prettier --write src/"
  },
```
当运行`npm run dev`时调用的是 `.env.development` 的配置 \
当运行`npm run build`时调用的是 `.env.production` 的配置 \
当运行`npm run build:dev`时调用的是 `.env.development` 的配置

## 配置vite.config.ts
最后更改 `vite.config.ts` 文件如下：
``` TypeScript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      vue(),
    ],
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: `http://${env.VITE_BASE_URL_REAR}`,
          ws: true,
          changeOrigin: true,
          rewrite(path) {
            return path.replace(`^${env.VITE_APP_BASE_API}`, "")
          },
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
```

## 使用环境变量
使用 `import.meta.env.VITE_ENV` 获取环境变量
``` TypeScript
console.log(import.meta.env) //查看相关信息 这里不显示非VITE开头的变量
```
