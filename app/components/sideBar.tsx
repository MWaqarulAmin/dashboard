// Sidebar.tsx
import React, { useState } from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  // Add any additional props you may need
}

const SideBar: React.FC<SidebarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      {/* Add your sidebar content here */}
    </div>
  );
};

export default SideBar;
