import React, { useContext, useEffect, useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import 'katex/dist/katex.min.css'
import Header from './components/Header/Header.tsx'

import './App.css'
import { ThemeContext } from './contexts/ThemeContext'; // 引入 ThemeContext

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useLocalStorage from './hooks/useLocalStorage.ts'
import useRenderContent from './hooks/useRenderContent.ts';





const App: React.FC = () => {
  const [text, setText] = useLocalStorage('text',
`# LaTeX and Markdown Live Editor

This editor supports both **Markdown** and **LaTeX**.

## Markdown Features
- Lists
- **Bold** and *italic* text
- \`inline code\`
- And more...

## LaTeX Examples
An inline formula: $E=mc^2$

A block formula:
$$
\\int_{0}^{1} x^2 \\mathrm{d}x = \\tfrac{1}{3}
$$

\`\`\`c
#include<stdio.c>
return 0;
\`\`\`
`);
    
  const renderHtml = useRenderContent(text);

  const {theme} = useContext(ThemeContext);

  useEffect(() => {
  const existingLink = document.getElementById('highlight-theme');
  if (existingLink) {
    existingLink.remove();
  }

  const link = document.createElement('link');
  link.id = 'highlight-theme';
  link.rel = 'stylesheet';
  link.href = theme === 'dark'
    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
    : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
  
  document.head.appendChild(link);

  }, [theme]);

  

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{

    const handleclick = (event:MouseEvent)=>{

      const target = event.target as HTMLElement;
      if(target.classList.contains('copy-button')){
        if(target.textContent!=='copy'){
          return;
        }

        const codeToCopy = target.dataset.rawCode??'';
        navigator.clipboard.writeText(codeToCopy).then(()=>{
          target.textContent = '√ copied';
          setTimeout(()=>{
            target.textContent='copy';
          },1000);
        }).catch(err =>{
          console.error('无法复制到剪切板', err);
        })
      }
    }


    const previewElement = previewRef.current;
    if(previewElement){
      previewElement.addEventListener('click',handleclick);
    }
    
    return ()=>{
      if(previewElement){
        previewElement.removeEventListener('click',handleclick);
      }
    }
  },[]);


  useEffect(()=>{
    localStorage.setItem('text',text);
  },[text]);

  const handleExportPDF = () => {
    const input = previewRef.current;
    if (!input) {
      console.error("Preview element not found!");
      return;
    }

    // 使用 html2canvas 将 div 转换为 canvas
    html2canvas(input, { 
      useCORS: true, // 允许加载跨域图片和样式
      scale: 4, // 提高分辨率，使PDF更清晰
    }).then(canvas => {
      // 获取 canvas 的图像数据
      const imgData = canvas.toDataURL('image/png');
      
      // 创建 jsPDF 实例
      // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 计算图像在PDF中的尺寸
      const imgWidth = 210; // A4 宽度 (mm)
      const pageHeight = 297; // A4 高度 (mm)
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;

      // 添加第一页
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 如果内容超出一页，则添加新页面
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // 保存PDF文件
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
      const fileName = `latex_render_${timestamp}.pdf`;
      
      pdf.save(fileName);
    });
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Header onExportPDF={handleExportPDF} />
      <PanelGroup direction="horizontal" className="platform">
        <Panel defaultSize={50} minSize={20}>
          <textarea
            className="edit-area"
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            spellCheck={false}
          />
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel defaultSize={50} minSize={20}>
          <div ref={previewRef} className="show-area" dangerouslySetInnerHTML={{__html:renderHtml}} />
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default App
