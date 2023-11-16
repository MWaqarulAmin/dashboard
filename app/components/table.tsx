"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@fluentui/react-components";
import { MoreVertical24Regular, Search20Regular, Play20Regular , Delete20Regular} from "@fluentui/react-icons";
import * as React from "react";
import { useState } from "react";
import styles from "./table.module.scss";


interface TableComponentProps {
  data: Company[];
  filter: string;
  onToggleStatus: (id: number, newStatus: boolean) => void;
}

interface Company {
  id: number;
  companyName: string;
  companyType: string;
  companyCode: string;
  contactEmail: string;
  Phone: string;
  active: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  filter,
  onToggleStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCompanyId, setHoveredCompanyId] = useState<number | null>(null);

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    onToggleStatus(id, !currentStatus);
  };

  const filteredData = data.filter((item) => {
    if (filter === "all") {
      return true; // Show all items
    } else {
      return String(item.active) === filter;
    }
  });

  const searchedData = searchQuery
    ? filteredData.filter((item) =>
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredData;

  return (
    <div className={styles.table}>
      {filter === "true" && <p className={styles.tableHeading}>Active Companies</p>}
      {filter === "false" && <p className={styles.tableHeading}>Closed Companies</p>}
      {filter === "all" && <p className={styles.tableHeading}>All Companies</p>}

      <div className={styles.searchContainer}>
        <Search20Regular className={styles.searchIcon} />
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table aria-label="Default table">
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            <th className={styles.companyName}>Company Name</th>
            <th>Company Type</th>
            <th>Company Code</th>
            <th>Contact Email</th>
            <th>Phone</th>
          </TableRow>
        </TableHeader>

        <TableBody>
          {searchedData.map((company) => (
            <TableRow
              className={styles.tableRow}
              key={company.id}
              onMouseEnter={() => setHoveredCompanyId(company.id)}
              onMouseLeave={() => setHoveredCompanyId(null)}
            >
              <TableCell className={styles.companyName}>
                {company.companyName}
              </TableCell>
              <TableCell>{company.companyType}</TableCell>
              <TableCell>{company.companyCode}</TableCell>
              <TableCell>{company.contactEmail}</TableCell>
              <TableCell>{company.Phone}</TableCell>
              <TableCell className={styles.markCell}>
                {/* <PopoverComponent 
                  /> */}
                {/* {hoveredCompanyId === company.id ? (
                  <div
                    onClick={() =>
                      handleToggleStatus(company.id, company.active)
                    }
                    className={styles.mark}
                  >
                    {company.active ? "Mark as Closed" : "Mark as Active"}
                  </div>
                ) : company.active ? (
                  <MoreVertical24Regular className={styles.options} />
                ) : (
                  <MoreVertical24Regular className={styles.options} />
                )} */}

                {hoveredCompanyId === company.id ? (
                  <div
                    onClick={() =>
                      handleToggleStatus(company.id, company.active)
                    }
                    className={styles.mark}
                  >
                    {/* {company.active ? "   Mark as Closed" : "Mark as Active"} */}

                    {company.active ? <div className={styles.markDiv}>
                      <Delete20Regular/>
                      <p className={styles.markText}>Mark as Closed</p>
                    
                    </div> : 
                    <div className={styles.markDiv}>
                      <Play20Regular/>
                      <p className={styles.markText}>Mark as Active</p>
                    
                    </div>

                  
                    
                    }


                  </div>
                ) : company.active ? (
                  <MoreVertical24Regular className={styles.options} />
                ) : (
                  <MoreVertical24Regular className={styles.options} />
                
                )}
                  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
