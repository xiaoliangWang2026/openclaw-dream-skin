# OpenClaw Dream Skin

> 给 OpenClaw WebChat / Control UI 换肤 —— 一键安装的 Tampermonkey 用户脚本，零侵入、零依赖。

## 🚀 一键安装（30 秒）

**第 1 步：安装 Tampermonkey**（Chrome/Edge 应用商店搜索 "Tampermonkey" 安装，一次性）

**第 2 步：打开直链，自动弹出安装**

```
https://raw.githubusercontent.com/xiaoliangWang2026/openclaw-dream-skin/main/openclaw-dream-skin.user.js
```

> 若没自动识别：Tampermonkey 图标 → **管理面板 → 工具 → 从 URL 导入** → 粘贴上方链接 → 安装。

**第 3 步：打开 OpenClaw**（`http://127.0.0.1:18789`）→ 右下角 **🎨 面板** → 选主题 + 导入背景图。

## ✅ 兼容地址（脚本已内置）

- `http://127.0.0.1:18789/*`
- `http://localhost:18789/*`
- `http://192.168.*:18789/*`（局域网）

## 🎨 主题

### 油猴脚本内置（4 套）

| 皮肤 | 风格 | 类型 |
|------|------|------|
| 🌙 暗夜 Midnight Noir | 北境星空 · 极光 · 星粒 | 暗色 |
| ☀️ 极简白 Minimal Light | 晨光几何 · 柔焦光斑 | 浅色 |
| ⚡ 赛博朋克 Cyberpunk | 霓虹矩阵 · 透视网格 | 暗色 |
| 🍵 和风侘寂 Wabi-Sabi | 墨韵金箔 · 宣纸纹理 | 浅色 |

### 独立 CSS 主题（`themes/` 目录，共 10 套）

| 文件 | 风格 | 类型 |
|------|------|------|
| `midnight-noir.css` | 北境星空 · 极光 · 星粒 | 暗色 |
| `minimal-light.css` | 晨光几何 · 柔焦光斑 | 浅色 |
| `cyberpunk-neon.css` | 霓虹矩阵 · 透视网格 · 扫描线 | 暗色 |
| `wabi-sabi.css` | 墨韵金箔 · 宣纸纹理 | 浅色 |
| `dawn-voyage.css` | 破晓启航 · 航海冒险 · 羊皮纸基地 · 金线 | 浅色 |
| `rose-daydream.css` | 玫瑰白日梦 · 柔粉浪漫 | 浅色 |
| `soft-idol-studio.css` | 柔和偶像工作室 · 清新可爱 | 浅色 |
| `soul-passage.css` | 灵魂之旅 · 神秘深邃 | 暗色 |
| `starlight-muse.css` | 星光缪斯 · 璀璨星空 | 暗色 |
| `preset-backgrounds.css` | 预设背景合集 | — |

> `themes/` 下的独立 CSS 可直接在浏览器 Console 注入，或用 `manager.html` 预览。

## 📁 文件结构

```
openclaw-dream-skin/
├── openclaw-dream-skin.user.js   # 油猴用户脚本（一键安装核心）
├── themes/                       # 10 套独立 CSS 主题
│   ├── midnight-noir.css
│   ├── minimal-light.css
│   ├── cyberpunk-neon.css
│   ├── wabi-sabi.css
│   ├── dawn-voyage.css
│   ├── rose-daydream.css
│   ├── soft-idol-studio.css
│   ├── soul-passage.css
│   ├── starlight-muse.css
│   └── preset-backgrounds.css
└── README.md
```

## 背景图说明

- 油猴脚本的自定义背景图以 **base64** 存在浏览器本地（Tampermonkey 存储），换电脑需重新导入
- 预设主题背景为 **CSS 渐变**，无需任何图片文件
- `manager.html` 可可视化预览 + 生成 CSS

## 原理

OpenClaw Control UI 使用 317 个 CSS 自定义属性构建界面，覆盖 `:root` 变量即可完整换肤。背景图通过 `body::before` 伪元素注入。**不改任何源文件，不依赖调试端口。**

> 和工具换一张脸，不改变它的灵魂。
