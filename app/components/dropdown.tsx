import * as React from "react";
import { MenuList } from "@fluentui/react-components";

import {
  PersonCircle20Regular,
  Settings20Regular,
  SignOut20Regular,
} from "@fluentui/react-icons";

import styles from "./dropdown.module.scss";

export const DropDown = () => {
  return (
    <div className={styles.useMenuListContainerStyles__container}>
      <MenuList>
        <div className={styles.menuItem}>
          <PersonCircle20Regular className={styles.icon} />
          Edit Profile
        </div>
        <div className={styles.menuItem}>
          <Settings20Regular className={styles.icon} />
          Settings
        </div>
        <div className={styles.menuItem}>
          <SignOut20Regular className={styles.icon} />
          Logout
        </div>
      </MenuList>
    </div>
  );
};
