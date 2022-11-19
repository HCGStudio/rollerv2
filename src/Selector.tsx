import { Button, Image, makeStyles, Text } from "@fluentui/react-components";
import React from "react";
import { maps } from "./assets/maps";
import { CommanderSelector } from "./CommanderSelector";
import { CommanderShow } from "./CommanderShow";
import data from "./data.json";
import { MapSelector } from "./MapSelector";
import { MutatorSelector } from "./MutatorSelector";
import { MutatorShow } from "./MutatorShow";
import { Difficulty, difficultyText } from "./utils";

export interface ISelectorProps {
  winCallback: VoidFunction;
  lostCallback: VoidFunction;
  difficulty: Difficulty;
  single: boolean;
}

const useStyles = makeStyles({
  buttonWrapper: {
    display: "flex",
  },
  buttonLeft: {
    marginRight: "10px",
  },
  image: {
    "@media (min-width: 650px)": { width: "600px" },
    "@media (min-width: 1px)": { width: "auto" },
  },
});

export const Selector: React.FC<ISelectorProps> = (props: ISelectorProps) => {
  const [stage, setStage] = React.useState(0);
  const [map, setMap] = React.useState(0);
  const [mutator, setMutator] = React.useState<Array<number>>([]);
  const [commander, setCommander] = React.useState<Array<number>>([]);
  const styles = useStyles();
  const nextStage = React.useCallback(() => {
    setStage((s) => s + 1);
  }, []);

  return (
    <>
      <Text as="h1" size={900}>
        你选择的难度是：{difficultyText[props.difficulty]}
      </Text>
      {stage === 0 ? (
        <MapSelector
          selectCallback={(m) => {
            setMap(m);
            nextStage();
          }}
        />
      ) : null}
      {stage >= 1 ? (
        <>
          <Text as="h2" size={800}>
            当前游戏：{data.maps[map]}
          </Text>
          <Image
            src={maps[map]}
            className={styles.image}
            shape="rounded"
          ></Image>
        </>
      ) : null}
      {stage === 1 ? (
        <MutatorSelector
          difficulty={props.difficulty}
          map={map}
          selectDoneCallback={(m) => {
            setMutator(m);
            nextStage();
          }}
        />
      ) : null}
      {stage >= 2 ? (
        <>
          <MutatorShow mutators={mutator} />
          <CommanderShow commanders={commander} />
        </>
      ) : null}
      {stage === 2 ? (
        <CommanderSelector
          single={props.single}
          difficulty={props.difficulty}
          selectCallback={(c) => {
            if (commander.length === 1 || props.single) nextStage();
            setCommander([...commander, c]);
          }}
        />
      ) : null}
      {stage === 3 ? (
        <>
          <Text as="h3" size={700}>
            GL,HF! 干死埃蒙！
          </Text>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.buttonLeft}
              appearance="primary"
              onClick={props.winCallback}
            >
              赢了
            </Button>
            <Button onClick={props.lostCallback}>输了</Button>
          </div>
        </>
      ) : null}
    </>
  );
};
