"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHeaderCell,
} from "@fluentui/react-components";
import {
  useTableSort, 
} from "@fluentui/react-components";
import {
  MoreVertical24Regular,
  Search20Regular,
  Play20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import * as React from "react";
import { useEffect, useState } from "react";
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
  const [markVisible, setMarkVisible] = useState<number | null>(null);

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    onToggleStatus(id, !currentStatus);
  };

  const filteredData = data.filter((item) => {
    if (filter === "all") {
      return true;
    } else {
      return String(item.active) === filter;
    }
  });

  const searchedData = searchQuery
    ? filteredData.filter((item) =>
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredData;

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(`.${styles.mark}`)) {
        setMarkVisible(null);
      }
    };

    if (markVisible !== null) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [markVisible]);

  return (
    <div className={styles.table}>
      {filter === "true" && (
        <p className={styles.tableHeading}>Active Companies</p>
      )}
      {filter === "false" && (
        <p className={styles.tableHeading}>Closed Companies</p>
      )}
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

      <Table sortable aria-label="Default table">
        <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRowHeader}>
            <th className={styles.companyName}>Company Name</th>

            <th>Company Type</th>
            <th>Company Code</th>
            <th>Contact Email</th>
            <th className={styles.phoneCell}>Phone</th>
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
              <TableCell className={styles.phoneCell}>
                {company.Phone}
              </TableCell>

              <TableCell className={styles.markCell}>
                {company.active ? (
                  <MoreVertical24Regular
                    className={styles.options}
                    onClick={() => setMarkVisible(company.id)}
                  />
                ) : (
                  <MoreVertical24Regular
                    className={styles.options}
                    onClick={() => setMarkVisible(company.id)}
                  />
                )}
                {markVisible === company.id && (
                  <div
                    className={styles.mark}
                    onClick={() =>
                      handleToggleStatus(company.id, company.active)
                    }
                  >
                    {company.active ? (
                      <div className={styles.markDiv}>
                        <Delete20Regular />
                        <p className={styles.markText}>Mark as Closed</p>
                      </div>
                    ) : (
                      <div className={styles.markDiv}>
                        <Play20Regular />
                        <p className={styles.markText}>Mark as Active</p>
                      </div>
                    )}
                  </div>
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
