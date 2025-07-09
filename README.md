# LaTeX Live Editor

[English](#english) | [中文](#中文)

---

## English

### Introduction

This is a real-time LaTeX editor built with React and Vite. It allows you to type LaTeX code in a text area and see the rendered mathematical formulas instantly.

### Features

- **Real-time Preview**: Instantly renders LaTeX formulas as you type.
- **Supports Inline and Display Modes**: Use `$...$` for inline formulas and `$$...$$` for display formulas.
- **Error Highlighting**: Displays an error message for invalid LaTeX syntax.
- **Simple Interface**: A clean and intuitive layout with a side-by-side editor and preview panel.

### Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web development.
- **KaTeX**: A fast, easy-to-use JavaScript library for TeX math rendering on the web.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

### How to Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/latex-live-editor.git
    cd latex-live-editor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` (or the address provided by Vite).

### 🚀 Roadmap

We are committed to making `latex-live-editor` a powerful and user-friendly online editor. Here are the features we plan to implement in future versions:

*   [ ] **Advanced Export Options**
    *   [ ] Export the rendered result as a **PDF** file for easy printing and sharing.
    *   [ ] Export formulas or specific sections as **PNG** or **SVG** images for embedding in other applications.

*   [ ] **Real-time Collaboration**
    *   [ ] Support multiple users editing the same document simultaneously and seeing each other's changes in real-time.

*   [ ] **Auto-Save & Session Restore**
    *   [ ] Automatically save the current content to the browser's local storage.
    *   [ ] When the user reopens the page, restore the content from the last session.

*   [ ] **Sync Scroll**
    *   [ ] Implement synchronized scrolling between the editor and preview panes. Scrolling one side will automatically position the other side to the corresponding location, improving the editing experience for long documents.

*   [ ] **Editor Enhancements**
    *   [ ] Add a minimap or a visual scrollbar to quickly navigate through long documents, similar to features found in modern code editors.

*   [ ] **Custom Themes**
    *   [ ] **Dark Mode**: Provide a more eye-friendly dark interface.
    *   [ ] Allow users to switch between different themes.

*   [ ] **Code Block Styling**
    *   [ ] Improve the rendering style of code blocks in the preview area to make them more aesthetically pleasing and readable.


---

## 中文

### 项目简介

这是一个使用 React 和 Vite 构建的实时 LaTeX 编辑器。您可以在文本区域中输入 LaTeX 代码，并立即看到渲染后的数学公式。

### 功能特性

- **实时预览**: 在您输入时即时渲染 LaTeX 公式。
- **支持行内和块级模式**: 使用 `$...$` 创建行内公式，使用 `$$...$$` 创建块级公式。
- **错误高亮**: 对于无效的 LaTeX 语法，会显示错误信息。
- **简洁界面**: 简洁直观的布局，包含一个并排的编辑器和预览面板。

### 技术栈

- **React**: 用于构建用户界面的 JavaScript 库。
- **Vite**: 现代化的前端构建工具，速度极快。
- **KaTeX**: 一个快速、易于使用的 JavaScript 库，用于在网页上进行 TeX 数学渲染。
- **TypeScript**: JavaScript 的类型化超集，可编译为纯 JavaScript。

### 如何运行

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/your-username/latex-live-editor.git
    cd latex-live-editor
    ```

2.  **安装依赖:**
    ```bash
    npm install
    ```

3.  **启动开发服务器:**
    ```bash
    npm run dev
    ```

4.  打开浏览器并访问 `http://localhost:5173` (或 Vite 提供的地址)。

### 🚀 未来功能规划 (Roadmap)

我们致力于将 `latex-live-editor` 打造成一个功能强大且用户友好的在线编辑器。以下是我们计划在未来版本中实现的功能：

*   [ ] **高级导出选项 (Advanced Export Options)**
    *   [ ] 将渲染结果导出为 **PDF** 文件，方便打印和分享。
    *   [ ] 将公式或特定部分导出为 **PNG** 或 **SVG** 图片，便于在其他应用中嵌入。

*   [ ] **实时协作 (Real-time Collaboration)**
    *   [ ] 支持多个用户同时编辑同一个文档，并能实时看到对方的修改。

*   [ ] **自动保存与状态恢复 (Auto-Save & Session Restore)**
    *   [ ] 将当前内容自动保存到浏览器的本地存储中。
    *   [ ] 当用户再次打开页面时，自动恢复上次关闭时的编辑状态。

*   [ ] **编辑/预览同步滚动 (Sync Scroll)**
    *   [ ] 实现编辑区和预览区的滚动条联动，当滚动一侧时，另一侧能自动定位到相应位置，提升长文稿的编辑体验。

*   [ ] **编辑器体验增强 (Editor Enhancements)**
    *   [ ] 添加代码缩略图（Minimap）或可视化滚动条，以方便在长文档中快速导航，类似现代代码编辑器中的功能。

*   [ ] **个性化主题 (Custom Themes)**
    *   [ ] **暗黑模式 (Dark Mode)**：提供对眼睛更友好的暗色界面。
    *   [ ] 允许用户在不同主题间切换。

*   [ ] **代码样式优化 (Code Block Styling)**
    *   [ ] 改进代码块（Code Block）在预览区的渲染样式，使其更美观、更具可读性。
