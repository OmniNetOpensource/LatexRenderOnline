import {  useEffect, useState} from 'react'

import DOMPurify from 'dompurify'
import {marked} from 'marked';
import markedKatex from 'marked-katex-extension'

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
  langPrefix: 'hljs language-',
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));


const useRenderContent =  (text: string)=>{

  const [finalHtml,setFinalHtml] = useState<string>('');

  useEffect(()=>{
    let isActive = true;
    const render = async ()=>{
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

      if(isActive) setFinalHtml(doc.body.innerHTML);
    };

    render();

    return ()=>{
      isActive= false;
    }
  },[text]);
  

  return finalHtml;
}


export default  useRenderContent;