"use client"
import * as React from "react";
import {
  Dismiss24Regular,
  Fluent24Filled,
  Navigation24Filled,
  Building24Regular,
} from "@fluentui/react-icons";
import styles from "./header.module.css";
import { PersonaComponent } from "./persona";


// ... (imports)

const Header = ({ leftOpen, setLeftOpen }) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSide}>
        {/* Pass updating function as prop */}
        <Navigation24Filled onClick={() => setLeftOpen(!leftOpen)} />
      </div>
    
        <PersonaComponent />
 
     
    </div>
  );
};

export default Header;
