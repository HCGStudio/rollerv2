import { Image, makeStyles, Text } from "@fluentui/react-components";
import React from "react";
import { mutators } from "./assets/mutators";
import data from "./data.json";

export interface IMutatorShowProps {
  mutators: Array<number>;
}

const useStyles = makeStyles({
  mutatorWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  mutator: {
    marginRight: "5px",
    marginTop: "5px",
  },
});

export const MutatorShow: React.FC<IMutatorShowProps> = (
  props: IMutatorShowProps
) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.mutatorWrapper}>
        {props.mutators.map((n) => (
          <Image
            shape="rounded"
            key={n}
            src={mutators[n]}
            height="64px"
            className={styles.mutator}
          />
        ))}
      </div>
      <Text size={400} as="p">
        已选因子：{props.mutators.map((s) => data.mutators[s]).join(" ")}
      </Text>
    </>
  );
};
