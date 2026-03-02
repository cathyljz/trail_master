---
title: 'Next.js 入门指南'
date: '2026-03-01'
excerpt: '了解 Next.js 的核心概念：App Router、服务端渲染和静态生成。'
---

# Next.js 入门指南

Next.js 是目前最流行的 React 框架之一，它让构建全栈 Web 应用变得简单。

## 核心特性

### App Router
Next.js 13+ 引入了全新的 App Router，基于文件系统的路由让代码组织更清晰。

### 服务端渲染 (SSR)
页面在服务器端渲染，对 SEO 非常友好，用户也能更快看到内容。

### 静态生成 (SSG)
在构建时预渲染页面，性能极佳，适合博客、文档类网站。

## 快速开始

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

打开浏览器访问 `http://localhost:3000`，你的 Next.js 应用就运行起来了！
