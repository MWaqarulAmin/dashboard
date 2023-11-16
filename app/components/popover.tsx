import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
} from "@fluentui/react-components";
import { MoreVertical24Regular, Delete20Regular } from "@fluentui/react-icons";
import styles from "./popoverComponent.module.scss";

const ExampleContent = () => {
  return (
    <div className={styles.popoverContainer}>
      <Delete20Regular />
      <p className={styles.contentHeader}>Mark as Closed</p>
    </div>
  );
};

export const PopoverComponent = () => {
  return (
    <Popover positioning="before">
      <PopoverTrigger disableButtonEnhancement>
        <Button>
          <MoreVertical24Regular />
        </Button>
      </PopoverTrigger>
      {/* <div className={styles.popoverSurface}>
        <ExampleContent />
      </div> */}
      <PopoverSurface className={styles.popoverSurface}>
        {/* <div><ExampleContent /></div> */}
        
      </PopoverSurface>
    </Popover>
  );
};
