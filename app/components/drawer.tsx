"use client";
import * as React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
} from "@fluentui/react-components";
import {
  Dismiss24Regular,
  Fluent24Filled,
  Navigation24Filled,
  Building24Regular,
} from "@fluentui/react-icons";
import styles from "./drawer.module.css";
import TableComponent from "./table";
import Header from "./header";

import CompanyList from "./companyList";

export const DrawerComponent = () => {
  const [leftOpen, setLeftOpen] = React.useState(false);

  return (
    <div className={styles.root}>
      <InlineDrawer open={leftOpen} separator>
        <div className={styles.sideBar}>
          {" "}
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setLeftOpen(false)}
                />
              }
            >
              HEADER
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className={styles.drawerbody}>
              <p>Drawezr content</p>
              <p>Drawer content</p>
              <p>Drawer content</p>

              <Fluent24Filled />
    
              <Building24Regular />
            </div>
          </DrawerBody>
        </div>
      </InlineDrawer>
      <div className={styles.content}>
       <div className={styles.buttons}>
        {/* <Navigation24Filled onClick={() => setLeftOpen(!leftOpen)} /> */}
          {/* <Button appearance="primary" onClick={() => setLeftOpen(!leftOpen)}>
            {leftOpen ? "Close" : "Open"} 
          </Button> */}
       <Header leftOpen={leftOpen} setLeftOpen={setLeftOpen} />
        </div> 
        <CompanyList />
        <TableComponent />
      </div>
    </div>
  );
};
