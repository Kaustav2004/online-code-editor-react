import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import Output from './components/Output';
import { CiMaximize1, CiMinimize1 } from "react-icons/ci";
import { Toaster } from 'react-hot-toast';

function App() {
  const widowWidth=window.innerWidth/1.5;
  const each=(window.innerWidth*0.33);
  const max= window.innerWidth*0.65;
  const min = (window.innerWidth-max)/2.2; 
  const height = (window.innerHeight/1.6);
  const [formData, setformData] = useState({ HTML: "", CSS: "", JS: "" });
  const [leftWidth, setLeftWidth] = useState(each);
  const [middleWidth, setMiddleWidth] = useState(each);
  const [rightWidth, setRightWidth] = useState(each);
  const [maxil, setMaxil] = useState(false);
  const [maxim, setMaxim] = useState(false);
  const [maxir, setMaxir] = useState(false);
  const [displayValHTML,setdisplayValHTML]=useState("block");
  const [displayValCSS,setdisplayValCSS]=useState("block");
  const [displayValJS,setdisplayValJS]=useState("block");
  const changeHandler = (event) => {
    setformData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

  const changeWidth = ({ title, maxi }) => {
    if (title === "HTML") {
      if (maxi === "maxil" && !maxil) {
        setLeftWidth(max);
        setMiddleWidth(min);
        setRightWidth(min);
      } else {
        setLeftWidth(each);
        setMiddleWidth(each);
        setRightWidth(each);
      }
    } else if (title === "CSS") {
      if (maxi === "maxim" && !maxim) {
        setLeftWidth(min);
        setMiddleWidth(max);
        setRightWidth(min);
      } else {
        setLeftWidth(each);
        setMiddleWidth(each);
        setRightWidth(each);
      }
    } else if (title === "JS") {
      if (maxi === "maxir" && !maxir) {
        setLeftWidth(min);
        setMiddleWidth(min);
        setRightWidth(max);
      } else {
        setLeftWidth(each);
        setMiddleWidth(each);
        setRightWidth(each);
      }
    }
  };

  const clickHandler = ({ maxi, title }) => {
    if (maxi === "maxil") {
      setMaxil(!maxil);
      setMaxim(false);
      setMaxir(false);
    } else if (maxi === "maxim") {
      setMaxim(!maxim);
      setMaxil(false);
      setMaxir(false);
    } else if (maxi === "maxir") {
      setMaxir(!maxir);
      setMaxil(false);
      setMaxim(false);
    }
    changeWidth({ title, maxi });
  };

  const chooseEditor=({title})=>{
    if(title==="HTML"){
      setLeftWidth(widowWidth);
      setdisplayValHTML("block");
      setdisplayValCSS("none");
      setdisplayValJS("none");
    }
    else if(title==="CSS"){
      setMiddleWidth(widowWidth);
      setdisplayValCSS("block");
      setdisplayValHTML("none");
      setdisplayValJS("none");
    }
    else{
      setdisplayValJS("block");
      setdisplayValHTML("none");
      setdisplayValCSS("none");
      setRightWidth(widowWidth);
    }

  }

useEffect(() => {
  if(window.innerWidth<768){
    setdisplayValCSS('none');
    setdisplayValJS('none');
    setLeftWidth(widowWidth);
  }
}, [])

  return (
    <div className="App bg-black w-screen h-screen">

      <div className=' md:hidden text-white flex justify-center items-center gap-3'>
          <div onClick={()=>chooseEditor({title:"HTML"})} className='cursor-pointer'>HTML</div>
          <div onClick={()=>chooseEditor({title:"CSS"})} className='cursor-pointer'>CSS</div>
          <div onClick={()=>chooseEditor({title:"JS"})} className='cursor-pointer'>JS</div>
      </div>

      <div className='flex mb-2 justify-evenly pl-1 pr-1 w-[99%] min-h-fit' style={{ height: `${height}px` }}>

        <div className='pl-2 pr-2 relative transition-all duration-1000 h-full ' style={{ width: `${leftWidth}px`, display:`${displayValHTML}` }}>
          <div onClick={() => clickHandler({ maxi: "maxil", title: "HTML" })} className='transition-all duration-1000 absolute right-4 top-3 z-10 hidden md:block'>
            {maxil ? <CiMinimize1 className='fill-white cursor-pointer scale-150' /> : <CiMaximize1 className='fill-white cursor-pointer scale-150' />}
          </div>
          <Editor title="HTML" changeHandler={changeHandler} height={height}/>
        </div>

        <div className='pl-2 pr-2  relative transition-all duration-1000 h-full' style={{ width: `${middleWidth}px`, display:`${displayValCSS}` }}>
          <div onClick={() => clickHandler({ maxi: "maxim", title: "CSS" })} className='transition-all duration-1000 absolute right-4 top-3 z-10 hidden md:block'>
            {maxim ? <CiMinimize1 className='fill-white cursor-pointer scale-150' /> : <CiMaximize1 className='fill-white cursor-pointer scale-150' />}
          </div>
          <Editor title="CSS" changeHandler={changeHandler} height={height}/>
        </div>

        <div className='pl-2 pr-2  relative transition-all duration-1000 h-full' style={{ width: `${rightWidth}px` , display:`${displayValJS}`}}>
          <div onClick={() => clickHandler({ maxi: "maxir", title: "JS" })} className='transition-all duration-1000 absolute right-4 top-3 z-10 hidden md:block'>
            {maxir ? <CiMinimize1 className='fill-white cursor-pointer scale-150' /> : <CiMaximize1 className='fill-white cursor-pointer scale-150' />}
          </div>
          <Editor title="JS" changeHandler={changeHandler} height={height}/>
        </div>

      </div>

      <Output formData={formData} />
      <Toaster/>
    </div>
  );
}

export default App;