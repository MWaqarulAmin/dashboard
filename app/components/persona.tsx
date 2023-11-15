import * as React from "react";
import { Persona } from "@fluentui/react-components";
import type { PersonaProps } from "@fluentui/react-components";
import styles from "./persona.module.scss";
import Image from "next/image";
import { ChevronDown16Regular } from "@fluentui/react-icons";
import { DropDown } from "./dropdown";

export const PersonaComponent = () => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  const handleChevronClick = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className={styles.main}>
      <div className={styles.persona}>
        <Image
          src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
          alt={"profile pic"}
        />

        {showDropDown && <DropDown />}

        <div className={styles.nameDiv}>
          <p className={styles.name}>Mona Kane</p>
          <p className={styles.post}>Office Admin</p>
        </div>
        <div className={styles.dropdown}>
          <ChevronDown16Regular onClick={handleChevronClick} />

          {/* <div className={styles.menu}>   {showDropDown && <DropDown />}</div> */}
        </div>
      </div>
    </div>
  );
};
