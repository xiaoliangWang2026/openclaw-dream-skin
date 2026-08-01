// ==UserScript==
// @name         OpenClaw Dream Skin
// @namespace    openclaw-dream-skin
// @version      2.0.0
// @description  给 OpenClaw 换肤 — 预设背景图 + 自定义导入 + 4套主题 + 保存切换
// @author       OpenClaw Assistant
// @match        http://127.0.0.1:18789/*
// @match        http://localhost:18789/*
// @match        http://192.168.*:18789/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
  'use strict'

  const SKIN_KEY = 'ods_theme'
  const CUSTOM_KEY = 'ods_custom'
  const BG_KEY = 'ods_bg'
  const BG_OPACITY_KEY = 'ods_bg_opacity'
  const BG_BLUR_KEY = 'ods_bg_blur'

  // ===== PRESET BACKGROUNDS — 多层 CSS 叠加模拟真实质感 =====
  const presetBackgrounds = {
    /* 暗夜 Midnight: 北境星空 — 深空 + 星粒 + 极光飘带 + 远山剪影 */
    'midnight': `
      radial-gradient(ellipse 100% 100% at 20% 0%, #0d1128 0%, transparent 50%),
      radial-gradient(ellipse 80% 100% at 80% 100%, #0a0f2e 0%, transparent 50%),
      radial-gradient(ellipse 120% 40% at 50% 25%, rgba(34,211,168,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 80% 25% at 30% 30%, rgba(124,140,248,0.05) 0%, transparent 50%),
      radial-gradient(ellipse 60% 20% at 70% 20%, rgba(34,211,168,0.04) 0%, transparent 50%),
      radial-gradient(2px 2px at 10% 15%, rgba(255,255,255,0.12) 0%, transparent 100%),
      radial-gradient(1px 1px at 25% 8%, rgba(255,255,255,0.10) 0%, transparent 100%),
      radial-gradient(2px 2px at 45% 22%, rgba(255,255,255,0.08) 0%, transparent 100%),
      radial-gradient(1px 1px at 65% 12%, rgba(255,255,255,0.11) 0%, transparent 100%),
      radial-gradient(2px 2px at 85% 18%, rgba(255,255,255,0.09) 0%, transparent 100%),
      radial-gradient(1px 1px at 15% 35%, rgba(255,255,255,0.07) 0%, transparent 100%),
      radial-gradient(2px 2px at 55% 28%, rgba(255,255,255,0.10) 0%, transparent 100%),
      radial-gradient(1px 1px at 75% 40%, rgba(255,255,255,0.06) 0%, transparent 100%),
      radial-gradient(1px 1px at 35% 50%, rgba(255,255,255,0.08) 0%, transparent 100%),
      radial-gradient(2px 2px at 90% 55%, rgba(255,255,255,0.07) 0%, transparent 100%),
      linear-gradient(0deg, rgba(9,11,16,0.6) 0%, transparent 40%),
      radial-gradient(ellipse 50% 50% at 50% 40%, rgba(124,140,248,0.04) 0%, transparent 100%)
    `,
    /* 极简白 Minimal: 晨光几何 — 暖白基底 + 几何暗纹 + 柔焦光斑 */
    'light': `
      radial-gradient(ellipse 80% 60% at 30% 0%, rgba(248,247,244,0.8) 0%, transparent 50%),
      radial-gradient(ellipse 100% 100% at 90% 0%, rgba(255,245,230,0.4) 0%, transparent 60%),
      radial-gradient(ellipse 80% 100% at 10% 100%, rgba(230,240,255,0.3) 0%, transparent 50%),
      radial-gradient(300px 300px at 85% 15%, rgba(200,200,210,0.08) 0%, transparent 100%),
      radial-gradient(200px 200px at 15% 85%, rgba(200,200,210,0.06) 0%, transparent 100%),
      repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0,0,0,0.008) 60px, rgba(0,0,0,0.008) 61px),
      radial-gradient(50px 50px at 75% 25%, rgba(79,110,247,0.04) 0%, transparent 100%),
      radial-gradient(40px 40px at 20% 70%, rgba(14,168,143,0.03) 0%, transparent 100%),
      linear-gradient(180deg, transparent 70%, rgba(240,239,236,0.5) 100%)
    `,
    /* 赛博朋克 Cyberpunk: 霓虹矩阵 — 深紫基底 + 透视网格 + 扫描线 + 光晕 */
    'cyberpunk': `
      radial-gradient(ellipse 100% 100% at 50% 0%, #0d0a20 0%, transparent 60%),
      radial-gradient(ellipse 80% 100% at 50% 100%, #1a0a20 0%, transparent 50%),
      linear-gradient(0deg, transparent 65%, rgba(255,45,149,0.04) 65.5%, transparent 66%),
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,229,255,0.015) 40px, rgba(0,229,255,0.015) 41px),
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,45,149,0.015) 40px, rgba(255,45,149,0.015) 41px),
      radial-gradient(ellipse 5% 60% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 100%),
      radial-gradient(30% 30% at 20% 30%, rgba(255,45,149,0.05) 0%, transparent 100%),
      radial-gradient(25% 25% at 80% 60%, rgba(0,229,255,0.04) 0%, transparent 100%),
      radial-gradient(ellipse 100% 15% at 50% 100%, rgba(255,45,149,0.06) 0%, transparent 100%),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
    `,
    /* 和风侘寂 Wabi-Sabi: 墨韵金箔 — 宣纸基底 + 水墨晕染 + 金箔碎片 + 纤维纹理 */
    'wabisabi': `
      radial-gradient(ellipse 100% 60% at 50% 0%, #faf7f2 0%, transparent 50%),
      radial-gradient(ellipse 80% 80% at 50% 100%, #ede6db 0%, transparent 50%),
      radial-gradient(300px 200px at 30% 40%, rgba(139,90,43,0.04) 0%, transparent 100%),
      radial-gradient(250px 180px at 70% 30%, rgba(139,90,43,0.03) 0%, transparent 100%),
      radial-gradient(150px 150px at 50% 60%, rgba(74,124,89,0.03) 0%, transparent 100%),
      radial-gradient(100px 100px at 20% 70%, rgba(139,90,43,0.02) 0%, transparent 100%),
      radial-gradient(8px 5px at 15% 25%, rgba(192,160,100,0.12) 0%, transparent 100%),
      radial-gradient(12px 6px at 75% 15%, rgba(192,160,100,0.08) 0%, transparent 100%),
      radial-gradient(6px 4px at 55% 85%, rgba(192,160,100,0.10) 0%, transparent 100%),
      radial-gradient(10px 7px at 30% 55%, rgba(192,160,100,0.06) 0%, transparent 100%),
      radial-gradient(5px 3px at 85% 70%, rgba(192,160,100,0.09) 0%, transparent 100%),
      repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160,140,110,0.02) 3px, rgba(160,140,110,0.02) 4px),
      radial-gradient(ellipse 100% 100% at 0% 50%, rgba(200,180,150,0.04) 0%, transparent 50%),
      radial-gradient(ellipse 100% 100% at 100% 50%, rgba(200,180,150,0.03) 0%, transparent 50%)
    `
  }

  // ===== THEME DEFINITIONS =====
  const themes = {
    midnight: {
      name: '🌙 暗夜 Midnight Noir',
      desc: '北境星空 · 极光飘带 · 星粒闪烁',
      css: `:root{--bg:#090b10;--bg-accent:#0f1119;--bg-elevated:#141720;--bg-hover:#1a1e2a;--bg-muted:#1a1e2a;--card:#11131b;--card-foreground:#e8e8ee;--popover:#141720;--popover-foreground:#e8e8ee;--panel:#090b10;--panel-strong:#141720;--panel-hover:#1a1e2a;--chrome:#090b10f5;--chrome-strong:#090b10fa;--text:#c8c8d4;--text-strong:#eee;--chat-text:#c8c8d4;--muted:#707080;--muted-strong:#787890;--border:#1a1d28;--border-strong:#282c3a;--border-hover:#383c4a;--input:#1a1d28;--accent:#7c8cf8;--accent-hover:#96a4ff;--accent-muted:#7c8cf8b3;--accent-subtle:#7c8cf81a;--accent-foreground:#fafafa;--accent-glow:#7c8cf833;--accent-2:#22d3a8;--accent-2-muted:#22d3a8b3;--accent-2-subtle:#22d3a81a;--primary:#7c8cf8;--primary-foreground:#fff;--secondary:#11131b;--secondary-foreground:#e8e8ee;--ring:#7c8cf8;--focus:#7c8cf833;--ok:#22c55e;--destructive:#ef4444;--warn:#f59e0b;--danger:#ef4444;--info:#60a5fa;--grid-line:#ffffff06;--selection-bg:#3b5998}`,
      bgPreset: 'midnight'
    },
    light: {
      name: '☀️ 极简白 Minimal Light',
      desc: '晨光几何 · 柔焦光斑 · 细线纹理',
      css: `:root{--bg:#f8f7f4;--bg-accent:#f0efec;--bg-elevated:#fff;--bg-hover:#ecebe8;--bg-muted:#f0efec;--card:#fff;--card-foreground:#1a1a1e;--popover:#fff;--popover-foreground:#1a1a1e;--panel:#f8f7f4;--panel-strong:#fff;--panel-hover:#ecebe8;--chrome:#f8f7f4f5;--chrome-strong:#f8f7f4fa;--text:#3c3c44;--text-strong:#1a1a1e;--chat-text:#3c3c44;--muted:#889;--muted-strong:#707080;--border:#e0dfdc;--border-strong:#d0cfcc;--border-hover:#c0bfbc;--input:#f0efec;--accent:#4f6ef7;--accent-hover:#3d5ce5;--accent-muted:#4f6ef7b3;--accent-subtle:#4f6ef715;--accent-foreground:#fff;--accent-glow:#4f6ef720;--accent-2:#0ea88f;--accent-2-muted:#0ea88fb3;--accent-2-subtle:#0ea88f15;--primary:#4f6ef7;--primary-foreground:#fff;--secondary:#f0efec;--secondary-foreground:#1a1a1e;--ring:#4f6ef7;--focus:#4f6ef720;--ok:#16a34a;--destructive:#dc2626;--warn:#d97706;--danger:#dc2626;--info:#2563eb;--grid-line:#00000006;--selection-bg:#4f6ef730;--selection-fg:#1a1a1e}`,
      bgPreset: 'light'
    },
    cyberpunk: {
      name: '⚡ 赛博朋克 Cyberpunk',
      desc: '霓虹矩阵 · 透视网格 · 扫描线',
      css: `:root{--bg:#0a0a14;--bg-accent:#0d0d20;--bg-elevated:#12122a;--bg-hover:#181838;--bg-muted:#12122a;--card:#0f0f24;--card-foreground:#e0e0ff;--popover:#12122a;--popover-foreground:#e0e0ff;--panel:#0a0a14;--panel-strong:#12122a;--panel-hover:#181838;--chrome:#0a0a14f0;--chrome-strong:#0a0a14f8;--text:#b8b8e0;--text-strong:#e0e0ff;--chat-text:#c0c0e8;--muted:#6060a0;--muted-strong:#7070b0;--border:#1a1a40;--border-strong:#2a2a60;--border-hover:#4040ff;--input:#1a1a40;--accent:#ff2d95;--accent-hover:#ff5cb5;--accent-muted:#ff2d95b3;--accent-subtle:#ff2d9520;--accent-foreground:#fff;--accent-glow:#ff2d9540;--accent-2:#00e5ff;--accent-2-muted:#00e5ffb3;--accent-2-subtle:#00e5ff20;--primary:#ff2d95;--primary-foreground:#fff;--secondary:#0f0f24;--secondary-foreground:#e0e0ff;--ring:#ff2d95;--focus:#ff2d9540;--ok:#00ff88;--destructive:#ff3366;--warn:#fa0;--danger:#ff3366;--info:#0cf;--grid-line:#ff00ff0a;--selection-bg:#ff2d9540}`,
      bgPreset: 'cyberpunk'
    },
    wabisabi: {
      name: '🍵 和风侘寂 Wabi-Sabi',
      desc: '墨韵金箔 · 宣纸纹理 · 水墨晕染',
      css: `:root{--bg:#f5f0e8;--bg-accent:#ede6db;--bg-elevated:#faf7f2;--bg-hover:#e8e0d0;--bg-muted:#f0ebe0;--card:#faf7f2;--card-foreground:#2c2416;--popover:#faf7f2;--popover-foreground:#2c2416;--panel:#f5f0e8;--panel-strong:#faf7f2;--panel-hover:#e8e0d0;--chrome:#f5f0e8f5;--chrome-strong:#f5f0e8fa;--text:#5c4a3a;--text-strong:#2c2416;--chat-text:#5c4a3a;--muted:#8b7866;--muted-strong:#6b5a4a;--border:#e0d5c0;--border-strong:#d0c4a8;--border-hover:#b8a888;--input:#f0ebe0;--accent:#c0563d;--accent-hover:#a0403a;--accent-muted:#c0563db3;--accent-subtle:#c0563d15;--accent-foreground:#fff;--accent-glow:#c0563d20;--accent-2:#4a7c59;--accent-2-muted:#4a7c59b3;--accent-2-subtle:#4a7c5915;--primary:#8b5e3c;--primary-foreground:#fff;--secondary:#ede6db;--secondary-foreground:#2c2416;--ring:#c0563d;--focus:#c0563d20;--ok:#5a8f6a;--destructive:#c04040;--warn:#c08030;--danger:#c04040;--info:#4a6a8a;--grid-line:#8b5e3c08;--selection-bg:#c0563d30;--selection-fg:#2c2416}`,
      bgPreset: 'wabisabi'
    }
  }

  // ===== STATE =====
  let currentTheme = GM_getValue(SKIN_KEY, 'default')
  let customBgData = GM_getValue(BG_KEY, null) // base64 or null
  let bgOpacity = GM_getValue(BG_OPACITY_KEY, 0.15)
  let bgBlur = GM_getValue(BG_BLUR_KEY, 0)
  let styleEl = null
  let bgStyleEl = null
  let panelEl = null

  // ===== BACKGROUND SYSTEM =====
  function getBackgroundCSS() {
    if (!currentTheme || currentTheme === 'default') return ''

    // Custom uploaded background takes priority
    if (customBgData) {
      return `
        body::before {
          content: '';
          position: fixed; inset: 0; z-index: -1;
          background-image: url(${customBgData});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: ${bgOpacity};
          filter: blur(${bgBlur}px);
          pointer-events: none;
        }
      `
    }

    // Theme preset background
    const theme = themes[currentTheme]
    if (!theme || !theme.bgPreset) return ''
    const preset = presetBackgrounds[theme.bgPreset]
    if (!preset) return ''

    return `
      body::before {
        content: '';
        position: fixed; inset: 0; z-index: -1;
        background: ${preset};
        opacity: ${bgOpacity * 6};
        pointer-events: none;
      }
    `
  }

  function applyBackground() {
    if (bgStyleEl) bgStyleEl.remove()
    const css = getBackgroundCSS()
    if (css) {
      bgStyleEl = document.createElement('style')
      bgStyleEl.id = 'ods-bg-style'
      bgStyleEl.textContent = css
      document.head.appendChild(bgStyleEl)
    }
  }

  function removeBackground() {
    if (bgStyleEl) bgStyleEl.remove()
    bgStyleEl = null
  }

  // ===== SKIN SYSTEM =====
  function applyTheme(id) {
    if (styleEl) styleEl.remove()

    if (id === 'default') {
      currentTheme = 'default'
      GM_setValue(SKIN_KEY, 'default')
      removeBackground()
      return
    }

    const theme = id === 'custom'
      ? { css: GM_getValue(CUSTOM_KEY, ''), bgPreset: null }
      : themes[id]

    if (!theme || !theme.css) return

    styleEl = document.createElement('style')
    styleEl.id = 'ods-theme-style'
    styleEl.textContent = theme.css
    document.head.appendChild(styleEl)

    currentTheme = id
    GM_setValue(SKIN_KEY, id)
    applyBackground()
  }

  function removeSkin() {
    if (styleEl) styleEl.remove()
    styleEl = null
    removeBackground()
    currentTheme = 'default'
    GM_setValue(SKIN_KEY, 'default')
  }

  // ===== IMAGE IMPORT =====
  function importBackgroundImage(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('请选择图片文件（PNG / JPG / WebP）')
      return
    }
    if (file.size > 16 * 1024 * 1024) {
      alert('图片不能超过 16MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      // Validate image dimensions
      const img = new Image()
      img.onload = () => {
        if (img.width > 16384 || img.height > 16384 || img.width * img.height > 50_000_000) {
          alert('图片尺寸过大（最大 16384px 或 50MP）')
          return
        }
        customBgData = e.target.result
        GM_setValue(BG_KEY, customBgData)
        applyBackground()
        renderList()
        alert('背景图已应用！\n\n提示：可在面板中调整透明度和模糊度')
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  function clearBackground() {
    customBgData = null
    GM_deleteValue(BG_KEY)
    applyBackground()
    renderList()
  }

  // ===== UI PANEL =====
  function createPanel() {
    panelEl = document.createElement('div')
    panelEl.id = 'ods-panel-root'
    panelEl.innerHTML = `
      <style id="ods-panel-css">
        #ods-panel-root * { box-sizing:border-box;margin:0;padding:0 }
        .ods-trigger {
          position:fixed; bottom:20px; right:20px; z-index:99999;
          width:44px; height:44px; border-radius:14px;
          background:var(--bg-elevated,#191c24);
          border:1px solid var(--border,#1e2028);
          color:var(--text,#d4d4d8);
          cursor:pointer; font-size:22px;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.2s; backdrop-filter:blur(12px);
        }
        .ods-trigger:hover {
          background:var(--bg-hover,#1f2330);
          border-color:var(--accent,#ff5c5c);
          color:var(--accent,#ff5c5c);
          transform:scale(1.05);
        }
        .ods-trigger.has-bg { border-color:var(--accent-2,#14b8a6) }
        .ods-panel {
          position:fixed; bottom:76px; right:20px; z-index:99998;
          display:none; font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;
        }
        .ods-panel.open { display:block }
        .ods-card {
          background:var(--bg-elevated,#191c24);
          border:1px solid var(--border,#1e2028);
          border-radius:16px; padding:18px; width:280px;
          box-shadow:0 12px 40px rgba(0,0,0,0.5);
          backdrop-filter:blur(16px);
        }
        .ods-title {
          font-size:15px; font-weight:700;
          color:var(--text-strong,#f4f4f5);
          margin-bottom:4px;
        }
        .ods-subtitle {
          font-size:11px; color:var(--muted,#8b8b94);
          margin-bottom:14px;
        }
        .ods-section-label {
          font-size:10px; font-weight:600; text-transform:uppercase;
          color:var(--muted,#8b8b94); letter-spacing:0.5px;
          margin:14px 0 8px;
        }
        .ods-list { display:flex; flex-direction:column; gap:5px }
        .ods-item {
          display:flex; align-items:center; gap:10px;
          padding:9px 12px; border-radius:10px;
          cursor:pointer; transition:all 0.15s;
          border:1px solid transparent;
        }
        .ods-item:hover {
          background:var(--bg-hover,#1f2330);
          border-color:var(--border-strong,#2e3040);
        }
        .ods-item.active {
          background:var(--accent-subtle,#ff5c5c1a);
          border-color:var(--accent,#ff5c5c);
        }
        .ods-item .dot {
          width:12px; height:12px; border-radius:50%; flex-shrink:0;
          box-shadow:0 0 6px rgba(0,0,0,0.3);
        }
        .ods-item .info { flex:1; min-width:0 }
        .ods-item .name { font-size:13px; color:var(--text,#d4d4d8); line-height:1.3 }
        .ods-item .desc { font-size:11px; color:var(--muted,#8b8b94) }
        .ods-item .check {
          font-size:14px; color:var(--accent,#ff5c5c); display:none;
        }
        .ods-item.active .check { display:block }
        .ods-footer {
          margin-top:14px; padding-top:14px;
          border-top:1px solid var(--border,#1e2028);
          display:flex; gap:8px; flex-wrap:wrap;
        }
        .ods-btn {
          flex:1; min-width:70px; padding:9px 10px; border-radius:8px;
          border:1px solid var(--border,#1e2028);
          background:var(--bg,#0e1015); color:var(--text,#d4d4d8);
          font-size:11px; cursor:pointer; text-align:center;
          transition:all 0.15s; white-space:nowrap;
        }
        .ods-btn:hover {
          background:var(--bg-hover,#1f2330);
          border-color:var(--border-strong,#2e3040);
        }
        .ods-btn.accent { color:var(--accent-2,#14b8a6); border-color:var(--accent-2-subtle,#14b8a61a) }
        .ods-btn.danger { color:var(--destructive,#ef4444) }
        .ods-slider-group { margin-top:12px; display:none }
        .ods-slider-group.visible { display:block }
        .ods-slider-label {
          display:flex; justify-content:space-between;
          font-size:11px; color:var(--muted,#8b8b94); margin-bottom:4px;
        }
        .ods-slider {
          width:100%; height:4px; -webkit-appearance:none;
          background:var(--border,#1e2028); border-radius:2px;
          outline:none; margin-bottom:10px;
        }
        .ods-slider::-webkit-slider-thumb {
          -webkit-appearance:none; width:16px; height:16px;
          border-radius:50%; background:var(--accent,#ff5c5c);
          cursor:pointer; border:2px solid var(--bg,#0e1015);
        }
      </style>
      <div class="ods-trigger" id="ods-trigger">🎨</div>
      <div class="ods-panel" id="ods-panel">
        <div class="ods-card">
          <div class="ods-title">🎨 OpenClaw Dream Skin</div>
          <div class="ods-subtitle">配色 + 背景 · 外部注入 · 不碰源码</div>

          <div class="ods-section-label">🎭 主题</div>
          <div class="ods-list" id="ods-theme-list"></div>

          <div class="ods-section-label">🖼️ 背景</div>
          <div class="ods-list" id="ods-bg-status"></div>

          <div class="ods-slider-group" id="ods-bg-controls">
            <div class="ods-slider-label">
              <span>透明度</span><span id="ods-opacity-val">15%</span>
            </div>
            <input type="range" class="ods-slider" id="ods-opacity" min="5" max="60" value="15">

            <div class="ods-slider-label">
              <span>模糊度</span><span id="ods-blur-val">0px</span>
            </div>
            <input type="range" class="ods-slider" id="ods-blur" min="0" max="20" value="0">
          </div>

          <div class="ods-footer">
            <button class="ods-btn accent" id="ods-bg-import">📥 导入背景图</button>
            <button class="ods-btn" id="ods-bg-reset">🔄 重置预设</button>
            <button class="ods-btn danger" id="ods-bg-clear">✕ 清除背景</button>
            <button class="ods-btn accent" id="ods-export">📋 导出CSS</button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(panelEl)

    // Toggle panel
    const trigger = document.getElementById('ods-trigger')
    const panel = document.getElementById('ods-panel')

    trigger.addEventListener('click', () => {
      panel.classList.toggle('open')
    })

    document.addEventListener('click', (e) => {
      if (!panelEl.contains(e.target)) {
        panel.classList.remove('open')
      }
    })

    // Render
    renderList()
    updateBgControls()

    // Buttons
    document.getElementById('ods-bg-import').addEventListener('click', (e) => {
      e.stopPropagation()
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/png,image/jpeg,image/webp'
      input.onchange = () => {
        if (input.files[0]) importBackgroundImage(input.files[0])
      }
      input.click()
    })

    document.getElementById('ods-bg-reset').addEventListener('click', (e) => {
      e.stopPropagation()
      customBgData = null
      GM_deleteValue(BG_KEY)
      GM_setValue(BG_OPACITY_KEY, 0.15)
      GM_setValue(BG_BLUR_KEY, 0)
      bgOpacity = 0.15
      bgBlur = 0
      applyBackground()
      renderList()
      updateBgControls()
    })

    document.getElementById('ods-bg-clear').addEventListener('click', (e) => {
      e.stopPropagation()
      clearBackground()
      updateBgControls()
    })

    document.getElementById('ods-export').addEventListener('click', (e) => {
      e.stopPropagation()
      exportCSS()
    })

    // Sliders
    const opacitySlider = document.getElementById('ods-opacity')
    const blurSlider = document.getElementById('ods-blur')

    opacitySlider.value = bgOpacity * 100
    blurSlider.value = bgBlur

    opacitySlider.addEventListener('input', () => {
      bgOpacity = parseInt(opacitySlider.value) / 100
      GM_setValue(BG_OPACITY_KEY, bgOpacity)
      document.getElementById('ods-opacity-val').textContent = Math.round(bgOpacity * 100) + '%'
      applyBackground()
    })

    blurSlider.addEventListener('input', () => {
      bgBlur = parseInt(blurSlider.value)
      GM_setValue(BG_BLUR_KEY, bgBlur)
      document.getElementById('ods-blur-val').textContent = bgBlur + 'px'
      applyBackground()
    })
  }

  function renderList() {
    // Theme list
    const themeList = document.getElementById('ods-theme-list')
    if (!themeList) return

    const dots = {
      midnight: 'linear-gradient(135deg,#7c8cf8,#4f6ef7)',
      light: 'linear-gradient(135deg,#f8f7f4,#e0dfdc)',
      cyberpunk: 'linear-gradient(135deg,#ff2d95,#00e5ff)',
      wabisabi: 'linear-gradient(135deg,#c0563d,#f5f0e8)',
      custom: 'linear-gradient(135deg,#888,#444)'
    }

    let html = `<div class="ods-item ${currentTheme === 'default' ? 'active' : ''}" data-theme="default">
      <div class="dot" style="background:linear-gradient(135deg,#ff5c5c,#0e1015)"></div>
      <div class="info"><div class="name">🔄 默认 Default</div></div>
      <span class="check">✓</span>
    </div>`

    for (const [id, t] of Object.entries(themes)) {
      html += `<div class="ods-item ${currentTheme === id ? 'active' : ''}" data-theme="${id}">
        <div class="dot" style="background:${dots[id] || '#888'}"></div>
        <div class="info">
          <div class="name">${t.name}</div>
          <div class="desc">${t.desc}</div>
        </div>
        <span class="check">✓</span>
      </div>`
    }

    if (GM_getValue(CUSTOM_KEY, null)) {
      html += `<div class="ods-item ${currentTheme === 'custom' ? 'active' : ''}" data-theme="custom">
        <div class="dot" style="background:linear-gradient(135deg,#888,#444)"></div>
        <div class="info"><div class="name">✨ 自定义 Custom</div></div>
        <span class="check">✓</span>
      </div>`
    }

    themeList.innerHTML = html

    themeList.querySelectorAll('.ods-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        const tid = item.dataset.theme
        if (tid === 'default') removeSkin()
        else applyTheme(tid)
        renderList()
        updateBgControls()
      })
    })

    // Background status
    const bgStatus = document.getElementById('ods-bg-status')
    if (!bgStatus) return

    if (customBgData) {
      bgStatus.innerHTML = `<div style="font-size:12px;color:var(--accent-2,#14b8a6);padding:6px 0">
        ✅ 自定义背景图已应用
      </div>`
    } else if (currentTheme !== 'default' && themes[currentTheme]?.bgPreset) {
      bgStatus.innerHTML = `<div style="font-size:12px;color:var(--muted,#8b8b94);padding:6px 0">
        🎨 使用主题预设背景
      </div>`
    } else {
      bgStatus.innerHTML = `<div style="font-size:12px;color:var(--muted,#8b8b94);padding:6px 0">
        ⬜ 无背景（选择主题或导入图片）
      </div>`
    }
  }

  function updateBgControls() {
    const controls = document.getElementById('ods-bg-controls')
    const trigger = document.getElementById('ods-trigger')
    const opacitySlider = document.getElementById('ods-opacity')
    const blurSlider = document.getElementById('ods-blur')

    if (!controls || !trigger) return

    const hasBg = customBgData || (currentTheme !== 'default' && themes[currentTheme]?.bgPreset)

    controls.classList.toggle('visible', !!hasBg || !!customBgData)
    trigger.classList.toggle('has-bg', !!hasBg)

    if (opacitySlider) {
      opacitySlider.value = bgOpacity * 100
      document.getElementById('ods-opacity-val').textContent = Math.round(bgOpacity * 100) + '%'
    }
    if (blurSlider) {
      blurSlider.value = bgBlur
      document.getElementById('ods-blur-val').textContent = bgBlur + 'px'
    }
  }

  function exportCSS() {
    if (currentTheme === 'default') {
      alert('请先选择一个皮肤')
      return
    }
    const theme = currentTheme === 'custom'
      ? { css: GM_getValue(CUSTOM_KEY, ''), name: '自定义' }
      : themes[currentTheme]

    const cssParts = [theme.css.replace(':root{','').replace(/}$/,'')]
    if (customBgData) {
      cssParts.push(`/* 背景图（base64）省略，请在管理器中导出 */`)
    }

    const css = `/* OpenClaw Dream Skin — ${theme.name} */\n/* 粘贴到 OpenClaw 控制台即可应用 */\n\n:root {\n  ${cssParts.join(';\n  ')}\n}`
    navigator.clipboard.writeText(css).then(() => {
      alert('CSS 已复制！可到控制台粘贴测试')
    }).catch(() => {
      // Fallback: show in textarea
      const ta = document.createElement('textarea')
      ta.value = css
      ta.style.cssText = 'position:fixed;top:20px;left:20px;z-index:99999;width:600px;height:300px;font:12px monospace'
      document.body.appendChild(ta)
      ta.select()
      setTimeout(() => ta.remove(), 10000)
    })
  }

  // ===== INIT =====
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(initUI, 600))
    } else {
      setTimeout(initUI, 600)
    }
  }

  function initUI() {
    createPanel()
    if (currentTheme !== 'default') {
      applyTheme(currentTheme)
    }
    if (customBgData) {
      applyBackground()
    }
    updateBgControls()
  }

  init()
})()
