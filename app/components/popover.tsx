import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
} from "@fluentui/react-components";
import { MoreVertical24Regular } from "@fluentui/react-icons";
import styles from "./popoverComponent.module.scss";

const ExampleContent = () => {
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This popover has an arrow pointing to its target</div>
    </div>
  );
};

export const PopoverComponent = () => (
  <Popover positioning="before">
    <PopoverTrigger disableButtonEnhancement>
      <Button>
        <MoreVertical24Regular />{" "}
      </Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
