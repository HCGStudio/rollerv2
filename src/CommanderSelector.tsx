import { Button, makeStyles, Text } from "@fluentui/react-components";
import React from "react";
import data from "./data.json";
import { Difficulty, randomNumber, randomSelect } from "./utils";

export interface ICommanderSelectorProps {
  selectCallback: (selected: number) => void;
  difficulty: Difficulty;
  single: boolean;
}

const useStyles = makeStyles({
  buttonWrapper: {
    display: "flex",
  },
});

export const CommanderSelector: React.FC<ICommanderSelectorProps> = (
  props: ICommanderSelectorProps
) => {
  const [pass, setPass] = React.useState(0);
  const styles = useStyles();
  const commanderRolled = React.useMemo(() => {
    if (props.single) return [randomSelect(1, 17, 6)];

    const rolledCommander = randomSelect(
      1,
      17,
      8,
      props.difficulty === Difficulty.impossiblePlus
        ? new Set([1, 2, 3])
        : undefined
    );

    const result: Array<Array<number>> = [];
    if (props.difficulty === Difficulty.impossiblePlus) {
      result.push([1, 2, 3]);
      setPass(pass + 1);
      props.selectCallback(randomNumber(1, 3));
    }
    while (rolledCommander.length > 0) {
      const chunk = rolledCommander.splice(0, 4);
      result.push(chunk);
    }
    return result;
  }, []);

  return (
    <>
      <Text size={400} as="p">
        请在下面{props.single ? "六" : "四"}个指挥官中选出你
        <strong>想要</strong>的
      </Text>
      <div className={styles.buttonWrapper}>
        {commanderRolled[pass].map((i) => (
          <Button
            key={i}
            onClick={() => {
              if (pass !== 1 || props.single) setPass(pass + 1);
              props.selectCallback(i);
            }}
          >
            {data.commanders[i]}
          </Button>
        ))}
      </div>
    </>
  );
};
