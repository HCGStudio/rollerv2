import { Image, makeStyles, Text } from "@fluentui/react-components";
import React from "react";
import { commanders } from "./assets/commanders";
import data from "./data";

export interface ICommanderShowProps {
  commanders: Array<number>;
}

const useStyles = makeStyles({
  commanderWrapper: {
    display: "flex",
  },
  commander: {
    marginRight: "5px",
    marginTop: "5px",
  },
});

export const CommanderShow: React.FC<ICommanderShowProps> = (
  props: ICommanderShowProps
) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.commanderWrapper}>
        {props.commanders.map((n) => (
          <Image
            shape="rounded"
            key={n}
            src={commanders[n]}
            height="80px"
            className={styles.commander}
          />
        ))}
      </div>
      <Text size={400} as="p">
        已选指挥官：{props.commanders.map((s) => data.commanders[s]).join(" ")}
      </Text>
    </>
  );
};
