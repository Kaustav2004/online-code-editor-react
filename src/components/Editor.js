import React, { useState ,useRef,useEffect} from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { GoCopy } from "react-icons/go";

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; // Choose a dark theme
import 'codemirror/mode/xml/xml'; // For HTML/XML
import 'codemirror/mode/css/css'; // For CSS
import 'codemirror/mode/javascript/javascript'; // For JavaScript
import toast from 'react-hot-toast';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint'; // Hinting addon
import 'codemirror/addon/hint/html-hint'; // For HTML hints
import 'codemirror/addon/hint/javascript-hint'; // For JS hints
import 'codemirror/addon/hint/css-hint'; // For CSS hints
import 'codemirror/addon/edit/closebrackets'; // For auto closing brackets

const Editor = ({ title, changeHandler , height}) => {
  const [code, setCode] = useState('');
  const codeMirrorRef = useRef(null);
  const heightNew=(height/1.15);
  const languageModes = {
    HTML: 'xml',
    CSS: 'css',
    JS: 'javascript'
  };

  const handleChange = (editor, data, value) => {
    setCode(value);
    changeHandler({ target: { name: title, value } });
  };

  const copyHandler=()=>{
    try{
      navigator.clipboard.writeText(code);
      toast.success("Copied Succesfully");
    }
    catch(e){
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if(window.innerWidth<768){

    }
    if (codeMirrorRef.current) {
      const codeMirrorInstance = codeMirrorRef.current.editor;
      codeMirrorInstance.getWrapperElement().style.height = `${heightNew}px`;
    }
  }, []);

  return (
    <div className='w-[100%]'>
      {/* title */}
      <div className='flex justify-between pt-1 p-3 pb-1 relative'>
        <h1 className='text-white'>{title}</h1>
        <GoCopy className='fill-white absolute right-12 top-3 cursor-pointer' onClick={copyHandler}/>
      </div>
      {/* CodeMirror editor */}
      <div>
        <CodeMirror 
          ref={codeMirrorRef}
          value={code}
          options={{
            mode: languageModes[title],
            theme: 'material',
            lineNumbers: true,
            lineWrapping: true,
            viewportMargin: Infinity,
            extraKeys: {
              'Ctrl-Space': 'autocomplete', // Enable hinting on Ctrl+Space
            },
            autoCloseBrackets: true, // Automatically close brackets
            matchBrackets: true, // Match brackets
            smartIndent: true, // Smart indentation
          }}
          onBeforeChange={handleChange}
        />
      </div>
      
    </div>
  );
};

export default Editor;
