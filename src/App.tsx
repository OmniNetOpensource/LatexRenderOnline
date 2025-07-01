import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './App.css'

const App: React.FC = () => {
  const [latex, setLatex] = useState<string>('$\\int_{0}^{1} x^2 dx$')
  const renderLatex = (text:string)=>{
    const parts=text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
    return parts.map((part,index)=>{
      if(part.startsWith("$$") && part.endsWith("$$")){
        try{
          const content = part.substring(2,part.length-2);
          
          const renderedHtml = katex.renderToString(content,{
            throwOnError:false,
            displayMode : true,
          });
          
          return <span key={index}  dangerouslySetInnerHTML={{__html:renderedHtml}}/>
        } catch (err: unknown) {
          return <span key={index} style={{color:`red`}}>{`invalid latex:${err}`}</span>
        }
      }else if(part.startsWith("$") && part.endsWith("$")){
        try{
          const content = part.substring(1,part.length-1);
          
          const renderedHtml = katex.renderToString(content,{
            throwOnError:false,
            displayMode : false,
          });
          
          return <span key={index}  dangerouslySetInnerHTML={{__html:renderedHtml}}/>
        } catch (err: unknown) {
          return <span key={index} style={{color:`red`}}>{`invalid latex:${err}`}</span>
        }
      }else{
        return <span key={index}>{part}</span>
      }
    });
  }

  return (
    <div className='platform'>
      <textarea 
        className='edit-area'
        value={latex}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setLatex(e.target.value)}
        spellCheck={false}
      />
      <div className='show-area'>
        {renderLatex(latex)}
      </div>
    </div>
  )
}

export default App
