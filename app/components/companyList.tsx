import * as React from "react";
import styles from "./companyList.module.scss";

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
      <div className={styles.companyBox}>
        <h1 className={styles.count}>
          {activeCount !== undefined ? `${activeCount}` : ""}
        </h1>
        <p className={styles.companies} onClick={() => onButtonClick("true")}>
          Active Companies
        </p>
      </div>

      <div className={styles.companyBox}>
        <h1 className={styles.count}>
          {closedCount !== undefined ? `${closedCount}` : ""}
        </h1>
        <p className={styles.companies} onClick={() => onButtonClick("false")}>
          Closed Companies
        </p>
      </div>

      <div className={styles.companyBox}>
        <h1 className={styles.count}>
          {allCount !== undefined ? `${allCount}` : ""}
        </h1>
        <p className={styles.companies} onClick={() => onButtonClick("all")}>
          All Companies
        </p>
      </div>
    </div>
  );
};

export default CompanyList;
