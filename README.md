# 命理报告生成器 - Numerology Report Generator

这是一个基于生辰八字的个性化命理分析与AI指导报告生成器，提供命令行和网页两种使用方式。

## 🌐 在线使用

**直接访问**: [https://joeaa223thub.io/numerology_report/](https://joeaa223thub.io/numerology_report/)

## 功能特点

- 🔮 **完整的命理计算**：包含生命路径数字、生日数字、挑战数字、个人年数字等
- 🤖 **AI智能报告**：基于Google Gemini AI生成个性化的命理分析报告
- 📱 **现代化界面**：美观的网页界面，支持移动端访问
- 💻 **命令行版本**：保留原始的命令行交互方式
- 🌐 **多语言支持**：支持中文界面和报告生成

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. Google AI API Key
API Key 已内置在代码中，无需手动配置。

### 3 运行方式

#### 方式一：网页版本（推荐）
```bash
npm run web
```
然后在浏览器中打开 `http://localhost:300`

#### 方式二：命令行版本
```bash
npm start
```

## 使用说明

### 网页版本使用步骤1. **输入生辰信息**：选择孩子的阳历出生日期2. **确认信息**：确认输入的日期是否正确3. **查看计算结果**：系统会显示所有命理数字的计算结果4. **生成AI报告**：点击"生成AI报告"按钮，等待AI生成个性化报告

### 报告内容

生成的报告包含以下章节：1**内在团队 (Inner Team)**
   - 核心原型分析
   - 支持性原型
   - 团队动态2*内心世界 (Inner World)**
   - 最大优势
   - 核心挑战
   - 隐藏恐惧

3父母指南 (Parents Playbook)**
   - 教育风格建议
   - 沟通技巧
   - 社交和友谊指导

4. **激发热情 (Igniting Passions)**
   - 推荐爱好
   - 职业建议
   - 反思问题
5. **总结**
   - 整体建议和鼓励

## 技术架构

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **后端**：Node.js
- **AI服务**：Google Gemini AI
- **图表库**：Chart.js
- **部署**：GitHub Pages

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 