import * as React from "react";
import styles from "./companyList.module.css";

interface CompanyListProps {
  onButtonClick: (filter: string) => void;
  activeCount?: number;
  closedCount?: number;
  allCount?: number;
}

const CompanyList: React.FC<CompanyListProps> = ({
  onButtonClick,
  activeCount,
  closedCount,
  allCount,
}) => {
  return (
    <div className={styles.buttonsBar}>
      <h1> {activeCount !== undefined ? `${activeCount}` : ""} </h1>

      <p   onClick={() => onButtonClick("true")}>
        Active Companies
      </p>

      <h1>{closedCount !== undefined ? `${closedCount}` : ""}</h1>
      <p onClick={() => onButtonClick("false")}>
        Closed Companies
      </p>

      <h1>{allCount !== undefined ? `${allCount}` : ""} </h1>
      <p onClick={() => onButtonClick("all")}>All Companies</p>
    </div>
  );
};
export default CompanyList;
