import { Button, makeStyles, Text } from "@fluentui/react-components";
import React from "react";
import data from "./data.json";
import { MutatorShow } from "./MutatorShow";
import { Difficulty, randomNumber, randomSelect } from "./utils";

export const rollOrder: Record<Difficulty, Array<number>> = {
  [Difficulty.easy]: [1, 1, 2],
  [Difficulty.medium]: [1, 2, 1, 1],
  [Difficulty.normal]: [1, 2, 2],
  [Difficulty.hard]: [1, 2, 1, 2, 1],
  [Difficulty.hardPlus]: [2, 1, 2, 1, 1],
  [Difficulty.impossible]: [3, 2, 1, 1],
};

export interface IMutatorSelectorProps {
  difficulty: Difficulty;
  selectDoneCallback: (mutators: Array<number>) => void;
  map: number;
}

const mapExclude: Record<number, Set<number>> = {
  //聚铁成兵 ： 风暴英雄
  [4]: new Set([45]),

  //黑暗杀星 ： 风暴英雄
  [10]: new Set([45]),

  //营救矿工： 丧尸大战，虚空重生者
  [12]: new Set([25, 43]),
};

const preRoll = (difficulty: Difficulty, map: number) => {
  const result: Array<Array<number>> = [];
  const order = rollOrder[difficulty];
  //For easy and medium, no pre set,
  if (difficulty === Difficulty.easy || difficulty === Difficulty.medium) {
    const all = randomSelect(1, 49, order.length * 3, mapExclude[map]);
    if (difficulty === Difficulty.medium) all.sort((a, b) => b - a);
    while (all.length > 0) {
      const chunk = all.splice(0, 3).sort((a, b) => b - a);
      result.push(chunk);
    }
    return result;
  }

  //For others, need pre set
  if (difficulty === Difficulty.normal || difficulty === Difficulty.hard) {
    const harder = randomSelect(41, 49, 3, mapExclude[map]);
    harder.sort((a, b) => b - a);
    result.push(harder);
    const remain = randomSelect(1, 40, (order.length - 1) * 3, mapExclude[map]);
    remain.sort((a, b) => b - a);
    while (remain.length > 0) {
      const chunk = remain.splice(0, 3).sort((a, b) => b - a);
      result.push(chunk);
    }
    return result;
  }

  const harder = randomSelect(34, 49, 6, mapExclude[map]);
  harder.sort((a, b) => b - a);
  while (harder.length > 0) {
    const chunk = harder.splice(0, 3).sort((a, b) => b - a);
    result.push(chunk);
  }

  const remain = randomSelect(1, 33, (order.length - 2) * 3, mapExclude[map]);
  remain.sort((a, b) => b - a);
  while (remain.length > 0) {
    const chunk = remain.splice(0, 3).sort((a, b) => b - a);
    result.push(chunk);
  }

  return result;
};

const useStyles = makeStyles({
  buttonWrapper: {
    display: "flex",
  },
});

export const MutatorSelector: React.FC<IMutatorSelectorProps> = (
  props: IMutatorSelectorProps
) => {
  const rollResult = React.useMemo(
    () => preRoll(props.difficulty, props.map),
    []
  );
  const [selected, setSelected] = React.useState<Array<number>>([]);
  const [currentSelectTurn, setSelectTurn] = React.useState(
    props.difficulty > Difficulty.medium && props.difficulty !== Difficulty.hard
      ? 1
      : 0
  );
  const order = rollOrder[props.difficulty];
  const styles = useStyles();

  React.useEffect(() => {
    console.log(props.difficulty, Difficulty.medium);
    if (
      props.difficulty > Difficulty.medium &&
      props.difficulty !== Difficulty.hard
    ) {
      const simple = randomNumber(0, 2);
      if (order[0] === 1) {
        setSelected((arr) => [...arr, rollResult[0][simple]]);
        return;
      } else if (order[0] === 2) {
        for (let i = 0; i < 3; i++)
          if (i != simple) selected.push(rollResult[0][i]);
      } else selected.push(...rollResult[0]);
      setSelected([...selected]);
    }
  }, []);

  const select = React.useCallback(
    (s: number) => {
      console.log(selected);

      if (order[currentSelectTurn] === 1) selected.push(s);
      else
        for (let i = 0; i < 3; i++)
          if (rollResult[currentSelectTurn][i] !== s)
            selected.push(rollResult[currentSelectTurn][i]);
      console.log(selected);

      setSelected([...selected]);
      if (currentSelectTurn === order.length - 1) {
        props.selectDoneCallback(selected);
        return;
      }
      setSelectTurn((i) => i + 1);
    },
    [selected, currentSelectTurn]
  );

  console.log(selected);
  return (
    <>
      {/* <div className={styles.mutatorWrapper}>
        {selected.map((n) => (
          <Image
            key={n}
            src={mutators[n]}
            height="64px"
            className={styles.mutator}
          />
        ))}
      </div>
      <Text size={400} as="p">
        已选因子：{selected.map((s) => data.mutators[s]).join(" ")}
      </Text> */}
      <MutatorShow mutators={selected} />
      <Text size={400} as="p">
        请在下面三个因子中选出你
        <strong>{order[currentSelectTurn] === 1 ? "想要" : "不想要"}</strong>的
      </Text>
      <div className={styles.buttonWrapper}>
        {rollResult[currentSelectTurn].map((i) => (
          <Button
            key={i}
            onClick={() => {
              select(i);
            }}
          >
            {data.mutators[i]}
          </Button>
        ))}
      </div>
    </>
  );
};
