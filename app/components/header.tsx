"use client";
import * as React from "react";
import {
  Navigation24Filled,
} from "@fluentui/react-icons";
import styles from "./header.module.css";
import { PersonaComponent } from "./persona";

const Header = ({ leftOpen, setLeftOpen }) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSide}>
        <Navigation24Filled onClick={() => setLeftOpen(!leftOpen)} />
      </div>
      <PersonaComponent />
    </div>
  );
};

export default Header;
