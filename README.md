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

> 💡 升级：已装过旧版脚本时，点 Tampermonkey 图标 → 脚本 → **检查更新** 即可拉取最新版（v2.1.0）。

## ✅ 兼容地址（脚本已内置）

- `http://127.0.0.1:18789/*`
- `http://localhost:18789/*`
- `http://192.168.*:18789/*`（局域网）

## 🎨 9 套主题（全部带真实背景图）

每套主题的**高清背景图**托管在 GitHub CDN（`bg-images/`），脚本按主题自动加载，铺满全屏。选主题即可看到完整氛围。

| 主题 | 风格 | 类型 |
|------|------|------|
| 🌙 暗夜 Midnight Noir | 北境星空 · 极光 · 星粒 | 暗色 |
| ☀️ 极简白 Minimal Light | 晨光几何 · 柔焦光斑 | 浅色 |
| ⚡ 赛博朋克 Cyberpunk | 霓虹矩阵 · 透视网格 · 扫描线 | 暗色 |
| 🍵 和风侘寂 Wabi-Sabi | 墨韵金箔 · 宣纸纹理 | 浅色 |
| ⛵ 破晓启航 Dawn Voyage | 羊皮纸 · 天海蓝 · 金色点缀 | 浅色 |
| 🌹 玫瑰白日梦 Rose Daydream | 柔粉浪漫 · 玫瑰花瓣 · 甜梦 | 浅色 |
| 🎀 柔和偶像 Soft Idol | 清新可爱 · 偶像工作室 · 粉嫩 | 浅色 |
| 🔮 灵魂之旅 Soul Passage | 神秘深邃 · 星空隧道 · 灵性 | 暗色 |
| ✨ 星光缪斯 Starlight Muse | 璀璨星空 · 银河 · 星光 | 浅色 |

## 📁 仓库结构

```
openclaw-dream-skin/
├── openclaw-dream-skin.user.js   # 油猴用户脚本（一键安装核心，v2.1.0）
├── bg-images/                    # 9 套主题的高清背景图（PNG，GitHub CDN）
│   ├── bg-midnight.png
│   ├── bg-light.png
│   ├── bg-cyberpunk.png
│   ├── bg-wabisabi.png
│   ├── bg-dawnvoyage.png
│   ├── bg-rosedaydream.png
│   ├── bg-softidol.png
│   ├── bg-soulpassage.png
│   └── bg-starlight.png
├── themes/                       # 10 套独立 CSS 主题（可脱离脚本单独注入）
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

## 背景图机制（v2.1.0）

脚本背景加载优先级：
1. **自定义导入**（base64，存浏览器本地）→ 优先
2. **主题真实背景图**（从 GitHub `bg-images/` 加载，cover 铺满）
3. **CSS 渐变**（兜底，无图时用）

> 主题背景图来自 GitHub CDN，首次加载需联网；图片体积较大（单张 3~7MB），但只在选主题时加载一次。

## 自定义背景图说明

- 自定义导入的背景图以 **base64** 存浏览器（Tampermonkey 存储），换电脑需重新导入
- 预设主题背景为 GitHub 高清图，跨电脑自动生效（无需导入）

## 原理

OpenClaw Control UI 使用 317 个 CSS 自定义属性构建界面，覆盖 `:root` 变量即可完整换肤。背景图通过 `body::before` 伪元素注入。**不改任何源文件，不依赖调试端口。**

> 和工具换一张脸，不改变它的灵魂。
