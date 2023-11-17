"use client";
import * as React from "react";
import {
  DrawerBody,
  InlineDrawer,
} from "@fluentui/react-components";
import {
  Fluent32Filled,  Building32Filled,
} from "@fluentui/react-icons";
import styles from "./drawer.module.scss";
import TableComponent from "./table";
import Header from "./header";
import CompanyList from "./companyList";
import { useEffect, useState } from "react";
import {SortTable} from "./sortTable";

interface Company {
  id: number;
  companyName: string;
  companyType: string;
  companyCode: string;
  contactEmail: string;
  Phone: string;
  active: boolean;
}

export const DrawerComponent = () => {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [data, setData] = useState<Company[]>([]);
  const [filter, setFilter] = useState("true");

  // --------------------------------------
  const [fluentActive, setFluentActive] = useState(false);
  const [companiesActive, setCompaniesActive] = useState(false);
  
  // -----------------------------------------

  useEffect(() => {
    fetch("http://localhost:3001/companies")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(jsonData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleButtonClick = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleToggleStatus = (id: number, newStatus: boolean) => {
    fetch(`http://localhost:3001/companies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedCompany: Company) => {
        const updatedData = data.map((company) => {
          if (company.id === id) {
            return updatedCompany;
          }
          return company;
        });

        setData(updatedData);
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const activeCount = data.filter((company) => company.active === true).length;
  const closedCount = data.filter((company) => company.active === false).length;
  const allCount = data.length;

  return (
    <div className={styles.root}>
      <div className={styles.permanentSideBar}>
        <Fluent32Filled className={styles.sideIcon1}/>
        <Building32Filled className={styles.sideIcon2}/>
      </div>
      <InlineDrawer open={leftOpen} separator   style={{ width: "200px" }} className={styles.inlineDrawer}>
        <div className={styles.sideBar}>
          <DrawerBody>
            <div className={styles.drawerBody}>
            <p
  className={fluentActive ? `${styles.fluentText} ${styles.active}` : styles.fluentText}
  onClick={() => {
    setFluentActive(!fluentActive);
    setCompaniesActive(false); 

  }}
>
  Fluent 2 Web
</p>
<p
  className={companiesActive ? `${styles.companiesText} ${styles.active}` : styles.companiesText}
  onClick={() => {
    setCompaniesActive(!companiesActive);
    setFluentActive(false); 

  }}
>
  Companies
</p>

            </div>
          </DrawerBody>
        </div>
      </InlineDrawer>
      <div className={styles.content}>
        <div className={styles.buttons}>
          <Header leftOpen={leftOpen} setLeftOpen={setLeftOpen} />
        </div>
        <h1 className={styles.companyList}
        
        >Company List</h1>
        <div className={styles.components}>
          <CompanyList
            onButtonClick={handleButtonClick}
            activeCount={activeCount}
            closedCount={closedCount}
            allCount={allCount}
          />
          {/* <TableComponent
            data={data}
            filter={filter}
            onToggleStatus={handleToggleStatus}
          /> */}

          <SortTable 
            data={data}
            filter={filter}
            onToggleStatus={handleToggleStatus}/>
        </div>
      </div>
    </div>
  );
};
