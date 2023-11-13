import * as React from "react";
import { Tab, TabList } from "@fluentui/react-components";
import type { TabListProps } from "@fluentui/react-components";
import styles from "./companyList.module.css";

const CompanyList = () => {
  return (
    <>
      <h1>Company List</h1>
   
        <div className={styles.tabList}>
          <p className="tabName">Active Companies</p>
          <p className="tabName">Closed Companies</p>
          <p className="tabName">All Companies</p>
        </div>
  
    </>
  );
};

export default CompanyList;
