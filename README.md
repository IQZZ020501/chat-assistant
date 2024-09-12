<h1 align="center">chat-assistant</h1>

<p align="center">
  <img src="https://img.shields.io/badge/python-3.x-blue.svg" alt="Python Version">
  <img src="https://img.shields.io/badge/node.js->=16.0-green.svg" alt="Node.js Version">
  <img src="https://img.shields.io/badge/npm-v10.0.0-blue.svg" alt="NPM Version">
  <img src="https://img.shields.io/badge/license-Apache-brightgreen.svg" alt="License">
</p>

## 目录

- [简介](#简介)
- [特性](#特性)
- [安装](#安装)
    - [前提条件](#前提条件)
    - [步骤](#步骤)
- [使用](#使用)
    - [启动项目](#启动项目)
- [贡献](#贡献)
- [许可证](#许可证)

## 简介

这是一个使用 Python 和 TypeScript 开发的项目，包含了聊天代理和消息处理功能。

## 特性

- 使用 Python 和 TypeScript 开发
- 支持聊天代理功能
- 处理微信消息

## 安装

### 前提条件

- Python 3.x
- Node.js版本>=16.0
- npm

### 步骤

1. 克隆仓库
    ```bash
    git clone https://gitee.com/Yang_FuHua/chat-assistant.git
    cd wechatapis
    ```

2. 安装 Python 依赖
    ```bash
    cd models
    pip install -r requirements.txt
    ```

3. 安装 Node.js 依赖
    ```bash
    cd wxapis
    # 建议使用 cnpm 安装依赖，防止依赖冲突
    npm install
    ```

## 使用

### 启动项目
1. 需要到星河社区申请access_token并配置在models/setting/config.json中
    ```bash
    网址：https://aistudio.baidu.com/index/accessToken
    ```
2. 启动 Python 服务
    ```bash
    python api.py
    ```

3. 启动 TypeScript 服务
    ```bash
    npm start
    ```

## 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 仓库
2. 创建新分支 (`git checkout -b feature-foo`)
3. 提交更改 (`git commit -am 'Add some foo'`)
4. 推送到分支 (`git push origin feature-foo`)
5. 创建一个新的 Pull Request

## 许可证

此项目使用 Apache 许可证。详情请参阅 `LICENSE` 文件。