# luci-app-ariox

[English](#english) | [中文](#chinese)

<a name="english"></a>
## English

`luci-app-ariox` is a modern, high-performance Aria2 download manager Web UI plugin for OpenWrt. It integrates the beautiful Vue-based **ArioxNG** frontend and securely manages the Aria2 RPC connection via an Nginx reverse proxy.

### Features
- **Modern UI**: Clean, responsive, and intuitive interface powered by Vue and Vite.
- **Native OpenWrt Integration**: Follows the latest OpenWrt 24.x/25.x client-side rendering (CBI over JS) standards.
- **Auto-configuration**: One-click setup of Aria2 defaults upon installation.

### Installation
You can build this package using the OpenWrt SDK:
```bash
# Enter OpenWrt SDK root
cd openwrt
# Update feeds
./scripts/feeds update -a
./scripts/feeds install -a
# Clone the repository
git clone https://github.com/permails/luci-app-ariox.git package/luci-app-ariox
# Compile
make package/luci-app-ariox/compile V=s
```

### Dependencies
- `luci-base`
- `aria2`
- `luci-nginx`

---

<a name="chinese"></a>
## 中文

`luci-app-ariox` 是一款为 OpenWrt 打造的现代化、高性能 Aria2 下载管理界面插件。它内置了基于 Vue 开发的精美 **ArioxNG** 前端，并通过 Nginx 反向代理实现了安全可靠的 Aria2 RPC 连接管理。

### 特性
- **现代前端 UI**：采用 Vue/Vite 构建的全新响应式界面，更加美观和流畅。
- **原生 OpenWrt 融合**：全面采用最新的 OpenWrt 24.x/25.x 客户端渲染（LuCI JS）标准构建。
- **开箱即用**：安装后内置初始化脚本自动配置 Aria2 基础参数，省去繁琐设置。

### 安装方法
推荐使用 OpenWrt SDK 源码编译：
```bash
# 进入 OpenWrt 源码根目录
cd openwrt
# 更新软件源
./scripts/feeds update -a
./scripts/feeds install -a
# 克隆本仓库到 package 目录
git clone https://github.com/permails/luci-app-ariox.git package/luci-app-ariox
# 编译插件包
make package/luci-app-ariox/compile V=s
```

### 依赖项
- `luci-base`
- `aria2`
- `luci-nginx`

---

### License
MIT License
