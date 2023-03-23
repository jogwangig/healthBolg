import React, {useEffect, useRef, useState } from "react";
import "./componentCSS/sidebar.css";

const Sidebar = ({ width=280 , children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const [isListOpen , setListOpen] = useState(false);
  const side = useRef();

  
  // button 클릭 시 토글
  const toggleMenu = () => {
    isOpen ? setX(width) : setX(0); 
    setOpen(!isOpen);
  };
  
  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async e => {
    let sideCildren = side.current.contains(e.target);
    
    if (isOpen && !sideCildren) {
      await setX(width); 
      await setOpen(false);
    }
  }

  useEffect(()=> {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  })

  function openList(){
    setListOpen(!isListOpen);
  }


  return (
    <div className= "container">
      <div ref={side}  className="sidebar" style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
          <button onClick={() => toggleMenu()} 
          className= "button" style = {{left :`${width + 20}px`}}>
            {isOpen ? 
            <span>&#10060;</span> : <span>&#9995;</span>
            }
          </button>
        <div className= "content"><p  onClick={openList}>게시판</p>{isListOpen ||children}</div>
      </div>
    </div>
  );
};


export default Sidebar;

