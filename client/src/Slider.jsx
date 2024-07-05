import  { useState, useRef, useEffect } from 'react';
import './Sidebar.css'; 

// import errorImage from './assets/right.png';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(false); // initial width
  const resizerRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    
    isResizing.current = true;
    resizerRef.current.style.cursor = 'ew-resize';
  };

  const handleMouseMove = (event) => {
    if (isResizing.current) {
      setWidth(event.clientX);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    resizerRef.current.style.cursor = 'auto';
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
    
    
      <svg
        className="menu-icon"
        onClick={toggleSidebar}
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      {/*       <img src={icons.right} className="right-icon"  alt="RightIcon"   onMouseDown={handleMouseDown}/> */}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`} style={{ width: `${width}px` }}   onMouseDown={handleMouseDown}  >
     {/* <img src={errorImage} alt="Description of image" className=" list-image"  /> */}
        <ul>
          <li>Agile is a popular software development methodology that emphasizes iterative development</li>
          <li>DevOps is a set of practices that combine</li>
          <li>Cloud computing has revolutionized</li>
          <li>Amazon Cloud Service</li>
          <li>Android development</li>
          <li>web development</li>
          <li>Devops methology</li>
        </ul>
      </nav>

      <div 
      className="resizer"
        ref={resizerRef}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Sidebar