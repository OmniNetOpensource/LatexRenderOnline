import React, { useContext, useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import 'katex/dist/katex.min.css'
import Header from './components/Header/Header.tsx'
import DOMPurify from 'dompurify'
import {marked} from 'marked';
import markedKatex from 'marked-katex-extension'
import './App.css'
import { ThemeContext } from './contexts/ThemeContext'; // 引入 ThemeContext
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";


function insertBlankAroundDollar(src: string): string {
  const out: string[] = [];
  const lines = src.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('$')) {
      out.push('');
    }
    out.push(line);
    if (trimmed.endsWith('$')) {
      out.push('');
    }
  }
  return out.join('\n');
}
marked.use(markedKatex({ throwOnError: false }));
marked.use(markedHighlight({
  langPrefix: 'hljs language-', // class前缀，保持和 highlight.js 默认一致
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));


const renderContent = async (text: string)=>{
  const dirtyHtml = await marked.parse(insertBlankAroundDollar(text));
  const cleanHtml = DOMPurify.sanitize(dirtyHtml);
  
  const parser = new DOMParser;

  const doc = parser.parseFromString(cleanHtml,'text/html');

  const codeElements = doc.querySelectorAll('pre > code');

  codeElements.forEach(codeElement =>{
    const preElement = codeElement.parentElement;
    if (!preElement) return;

    const codeWrapper = doc.createElement('div');
    codeWrapper.className = 'code-wrapper';

    const toolbar = doc.createElement('div');
    toolbar.className='code-toolbar';
    
    const copyButton = doc.createElement('button');
    copyButton.className='copy-button';
    copyButton.textContent='copy';
    copyButton.dataset.rawCode = codeElement.textContent ?? '';
    
    const langName = doc.createElement('span');
    langName.className='lang-name';

    const langMatch = codeElement.className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : 'text';
    langName.textContent = lang;

    toolbar.appendChild(langName);
    toolbar.appendChild(copyButton);

    codeWrapper.appendChild(toolbar);
    
    preElement.parentNode?.insertBefore(codeWrapper, preElement);
    codeWrapper.appendChild(preElement);
  });

  const finalHtml = doc.body.innerHTML;

  return {__html:finalHtml};
}

const App: React.FC = () => {
  const [text, setText] = useState<string>(
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
`
  )
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


  const [htmlObj,setHtmlObj] = useState<{__html:string}>({__html:""});
  
  useEffect(()=>{
    let actived = true;
    renderContent(text).then(obj=>{
      if(actived)  setHtmlObj(obj);
    });
    return ()=>{actived = false;}
  },[text]);

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


  return (
    <div className="app-container" data-theme={theme}>
      <Header />
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
          <div ref={previewRef} className="show-area" dangerouslySetInnerHTML={htmlObj} />
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default App
