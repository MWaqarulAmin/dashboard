"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  MoreVertical24Regular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
} from "@fluentui/react-components";
import { companies } from "../../db.json";

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/companies")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    { columnKey: "companyName", label: "Company Name" },
    { columnKey: "companyType", label: "Company Type" },
    { columnKey: "companyCode", label: "Company Code" },
    { columnKey: "contactEmail", label: "Contact Email" },
    { columnKey: "phone", label: "Phone" },
  ];

  return (
    <Table aria-label="Default table">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.columnKey}>
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell>
              <TableCellLayout>{company.companyName}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                {company.companyType}
              </TableCellLayout>
            </TableCell>
            <TableCell>{company.companyCode}</TableCell>
            <TableCell>
              <TableCellLayout>{company.contactEmail}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                {company.Phone}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>
                <MoreVertical24Regular />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;

// -------------------------------------------------------------------------------
// import * as React from "react";
// import {
//   FolderRegular,
//   EditRegular,
//   OpenRegular,
//   DocumentRegular,
//   PeopleRegular,
//   DocumentPdfRegular,
//   VideoRegular,
// } from "@fluentui/react-icons";
// import {
//   TableBody,
//   TableCell,
//   TableRow,
//   Table,
//   TableHeader,
//   TableHeaderCell,
//   TableCellLayout,
//   PresenceBadgeStatus,
//   Avatar,
// } from "@fluentui/react-components";

// const items = [
//   {
//     file: { label: "Meeting notes", icon: <DocumentRegular /> },
//     author: { label: "Max Mustermann", status: "available" },
//     lastUpdated: { label: "7h ago", timestamp: 1 },
//     lastUpdate: {
//       label: "You edited this",
//       icon: <EditRegular />,
//     },
//   },
//   {
//     file: { label: "Thursday presentation", icon: <FolderRegular /> },
//     author: { label: "Erika Mustermann", status: "busy" },
//     lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
//     lastUpdate: {
//       label: "You recently opened this",
//       icon: <OpenRegular />,
//     },
//   },
//   {
//     file: { label: "Training recording", icon: <VideoRegular /> },
//     author: { label: "John Doe", status: "away" },
//     lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
//     lastUpdate: {
//       label: "You recently opened this",
//       icon: <OpenRegular />,
//     },
//   },
//   {
//     file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
//     author: { label: "Jane Doe", status: "offline" },
//     lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
//     lastUpdate: {
//       label: "You shared this in a Teams chat",
//       icon: <PeopleRegular />,
//     },
//   },
// ];

// const columns = [
//   { columnKey: "company name", label: "Company Name" },
//   { columnKey: "company type", label: "Company Type" },
//   { columnKey: "company code", label: "Company Code" },
//   { columnKey: "contact email", label: "Contact Email" },
//   { columnKey: "phone", label: "Phone" },
// ];

// export const TableComponent = () => {
//   return (
//     <Table arial-label="Default table">
//       <TableHeader>
//         <TableRow>
//           {columns.map((column) => (
//             <TableHeaderCell key={column.columnKey}>
//               {column.label}
//             </TableHeaderCell>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {items.map((item) => (
//           <TableRow key={item.file.label}>
//             <TableCell>
//               <TableCellLayout media={item.file.icon}>
//                 {item.file.label}
//               </TableCellLayout>
//             </TableCell>
//             <TableCell>
//               <TableCellLayout
//                 media={
//                   <Avatar
//                     aria-label={item.author.label}
//                     name={item.author.label}
//                     badge={{
//                       status: item.author.status as PresenceBadgeStatus,
//                     }}
//                   />
//                 }
//               >
//                 {item.author.label}
//               </TableCellLayout>
//             </TableCell>
//             <TableCell>{item.lastUpdated.label}</TableCell>
//             <TableCell>
//               <TableCellLayout media={item.lastUpdate.icon}>
//                 {item.lastUpdate.label}
//               </TableCellLayout>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };
