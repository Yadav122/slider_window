import  { useState, useRef, useEffect } from 'react';
import './Sidebar.css'; 

// Importing errorImage from assets folder
// import errorImage from './assets/right.png';

/**
 * Sidebar component
 */
const Sidebar = () => {
  // State to track whether the sidebar is open or not
  const [isOpen, setIsOpen] = useState(false);

  // State to track the width of the sidebar
  const [width, setWidth] = useState(false); // initial width

  // Reference to the resizer element
  const resizerRef = useRef(null);

  // Flag to track whether the user is resizing the sidebar
  const isResizing = useRef(false);

  /**
   * Handle mouse down event on the resizer
   */
  const handleMouseDown = () => {
    // Set the flag to true to indicate that the user is resizing
    isResizing.current = true;
    // Change the cursor style to indicate resizing
    resizerRef.current.style.cursor = 'ew-resize';
  };

  /**
   * Handle mouse move event on the document
   */
  const handleMouseMove = (event) => {
    // If the user is resizing, update the width of the sidebar
    if (isResizing.current) {
      setWidth(event.clientX);
    }
  };

  /**
   * Handle mouse up event on the document
   */
  const handleMouseUp = () => {
    // Set the flag to false to indicate that the user is not resizing
    isResizing.current = false;
    // Reset the cursor style
    resizerRef.current.style.cursor = 'auto';
  };

  /**
   * Add event listeners to the document
   */
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  /**
   * Toggle the sidebar open or closed
   */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Menu icon to toggle the sidebar */}
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

      {/* Sidebar navigation */}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`} style={{ width: `${width}px` }} onMouseDown={handleMouseDown}>
        {/* List of items in the sidebar */}
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

      {/* Resizer element */}
      <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown} />
    </div>
  );
};

export default Sidebar;
