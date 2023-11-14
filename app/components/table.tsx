"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@fluentui/react-components";
import { MoreVertical24Regular } from "@fluentui/react-icons";
import * as React from "react";
import { useState } from "react";
import styles from "./table.module.css";

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
    <div>
      <input
        type="text"
        placeholder="Search by company name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table aria-label="Default table">
        <TableHeader>
          <TableRow>
            <th>ID</th>
            <th>Company Name</th>
            <th>Company Type</th>
            <th>Company Code</th>
            <th>Contact Email</th>
            <th>Phone</th>
            <th>Active</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchedData.map((company) => (
            <TableRow
              key={company.id}
              onMouseEnter={() => setHoveredCompanyId(company.id)}
              onMouseLeave={() => setHoveredCompanyId(null)}
            >
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.companyName}</TableCell>
              <TableCell>{company.companyType}</TableCell>
              <TableCell>{company.companyCode}</TableCell>
              <TableCell>{company.contactEmail}</TableCell>
              <TableCell>{company.Phone}</TableCell>
              <TableCell>
                {/* {hoveredCompanyId === company.id ? (
                  <button
                    onClick={() =>
                      handleToggleStatus(company.id, company.active)
                    }
                  >
                    {company.active ? "❌" : "✅"}
                  </button>
                ) : company.active ? (
                  "✅"
                ) : (
                  "❌"
                )} */}
                
                
                {hoveredCompanyId === company.id ? (
                  <button
                    onClick={() =>
                      handleToggleStatus(company.id, company.active)
                    }
                  >
                    {company.active ? "Mark as Closed" : "Mark as Active"}
                  </button>
                ) : company.active ? (
                  <MoreVertical24Regular 
                className={styles.options}/>
                ) : (
                  <MoreVertical24Regular 
                  className={styles.options}/>
                )}

                {/* <MoreVertical24Regular 
                className={styles.options}/> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
