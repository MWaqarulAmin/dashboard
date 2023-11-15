"use client";
import * as React from "react";
import { Navigation24Filled } from "@fluentui/react-icons";
import styles from "./header.module.scss";
import { PersonaComponent } from "./persona";

const Header = ({ leftOpen, setLeftOpen }) => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.navIcon}>
          <Navigation24Filled onClick={() => setLeftOpen(!leftOpen)} />
        </div>
        <div className={styles.persona}>
          <PersonaComponent />
        </div>
      </div>
      <hr className={styles.hr} />
    </div>
  );
};

export default Header;
