"use client";
import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  TableColumnDefinition,
  TableColumnId,
  useTableSort,
  createTableColumn,
} from "@fluentui/react-components";
import {
  MoreVertical24Regular,
  Search20Regular,
  Play20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";

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


type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 3 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 1 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "companyName",
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "companyType",
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "companyCode",
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: "contactEmail",
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
  createTableColumn<Item>({
    columnId: "phone",
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

export const SortTable : React.FC<TableComponentProps> = ({
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

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        defaultSortState: { sortColumn: "file", sortDirection: "ascending" },
      }),
    ]
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

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


    <Table sortable aria-label="Table with sort">
    <TableHeader className={styles.tableHeader}>
          <TableRow className={styles.tableRowHeader}>
          <TableHeaderCell {...headerSortProps("companyName")}
          className={styles.companyName}>Company Name</TableHeaderCell>
          <TableHeaderCell {...headerSortProps("companyType")}>
          Company Type
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("companyCode")}>
          Company Code
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("contactEmail")}>
          Contact Email
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("phone")}
          className={styles.phoneCell}>
          Phone
          </TableHeaderCell>
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
