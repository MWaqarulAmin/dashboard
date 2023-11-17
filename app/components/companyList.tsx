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
  const [activeFilter, setActiveFilter] = React.useState<string>("true");

  const handleButtonClick = (filter: string) => {
    onButtonClick(filter);
    setActiveFilter(filter);
  };

  return (
    <div className={styles.buttonsBar}>
      <div
        className={`${styles.companyBox} ${
          activeFilter === "true" && styles.activeCompany
        }`}
      >
        <h1 className={styles.count}>
          {activeCount !== undefined ? `${activeCount}` : ""}
        </h1>
        <p
          className={styles.companies}
          onClick={() => handleButtonClick("true")}
        >
          Active Companies
        </p>
      </div>

      <div
        className={`${styles.companyBox} ${
          activeFilter === "false" && styles.activeCompany
        }`}
      >
        <h1 className={styles.count}>
          {closedCount !== undefined ? `${closedCount}` : ""}
        </h1>
        <p
          className={styles.companies}
          onClick={() => handleButtonClick("false")}
        >
          Closed Companies
        </p>
      </div>

      <div
        className={`${styles.companyBox} ${
          activeFilter === "all" && styles.activeCompany
        }`}
      >
        <h1 className={styles.count}>
          {allCount !== undefined ? `${allCount}` : ""}
        </h1>
        <p
          className={styles.companies}
          onClick={() => handleButtonClick("all")}
        >
          All Companies
        </p>
      </div>
    </div>
  );
};

export default CompanyList;