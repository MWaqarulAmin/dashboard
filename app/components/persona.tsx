import * as React from "react";
import { Persona } from "@fluentui/react-components";
import type { PersonaProps } from "@fluentui/react-components";
import styles from "./persona.module.css";

export const PersonaComponent = (props: Partial<PersonaProps>) => {
  return (
    <Persona
    className={styles.persona}
    textAlignment="center"
    name="Kevin Sturgis"
  


    quaternaryText="Microsoft"
      avatar={{
        image: {
          
          src: "https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png",
        },
     
      }}
      {...props}
    />
  );
};