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
  Building24Regular,
} from "@fluentui/react-icons";
import styles from "./drawer.module.scss";
import TableComponent from "./table";
import Header from "./header";
import CompanyList from "./companyList";
import { useEffect, useState } from "react";

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
      <InlineDrawer open={leftOpen} separator>
        <div className={styles.sideBar}>
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
            <div className={styles.drawerBody}>
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
          <Header leftOpen={leftOpen} setLeftOpen={setLeftOpen} />
        </div>
        <h1 className={styles.companyList}>Company List</h1>
        <div className={styles.components}>
          <CompanyList
            onButtonClick={handleButtonClick}
            activeCount={activeCount}
            closedCount={closedCount}
            allCount={allCount}
          />
          <TableComponent
            data={data}
            filter={filter}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </div>
  );
};
