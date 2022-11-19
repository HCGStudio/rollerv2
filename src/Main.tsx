import {
  Button,
  makeStyles,
  Switch,
  SwitchOnChangeData,
  Text,
} from "@fluentui/react-components";
import React from "react";
import { Selector } from "./Selector";
import { Difficulty, difficultyButtonText } from "./utils";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15px",
  },
  difficultyContainer: { display: "flex", flexWrap: "wrap", marginTop: "5px" },
  difficultyButton: {
    marginRight: "5px !important",
    marginBottom: "5px !important",
  },
});

const difficultiesToShow: Record<1 | 2, Array<Difficulty>> = {
  1: [
    Difficulty.easy,
    Difficulty.medium,
    Difficulty.normal,
    Difficulty.hard,
    Difficulty.hardPlus,
    Difficulty.impossible,
    Difficulty.impossiblePlus,
  ],
  2: [Difficulty.easy],
};

export const Main: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const [win, setWin] = React.useState(0);
  const [lost, setLost] = React.useState(0);
  const [lastMessage, setLastMessage] = React.useState("准备好🍣了吗？");
  const [difficulty, setDifficulty] = React.useState(Difficulty.easy);
  const [single, setSingle] = React.useState(false);
  const styles = useStyles();

  const lostGame = React.useCallback(() => {
    setLost((l) => l + 1);
    setReady(false);
    setLastMessage("MGJ，不服，再来！");
  }, []);

  const winGame = React.useCallback(() => {
    setWin((w) => w + 1);
    setReady(false);
    setLastMessage("爽了，再来！");
  }, []);

  const startGame = React.useCallback((targetDifficulty: Difficulty) => {
    setDifficulty(targetDifficulty);
    setReady(true);
  }, []);

  const onSingleChange = React.useCallback(
    (_ev: React.ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
      setSingle(data.checked);
    },
    []
  );

  return ready ? (
    <div className={styles.container}>
      <Selector
        winCallback={winGame}
        lostCallback={lostGame}
        difficulty={difficulty}
        single={single}
      />
    </div>
  ) : (
    <div className={styles.container}>
      <Text as="h1" size={900}>
        小游戏：谁是非酋
      </Text>
      <Text as="h3" size={500}>
        这里是UNN带来的现场报道，目前指挥官 {win}:{lost}{" "}
        埃蒙。他们能赢吗？照我看，悬。
      </Text>
      <Text as="p" size={400}>
        {lastMessage} 选择你的<del>死法</del>难度：
      </Text>
      <Switch
        checked={single}
        onChange={onSingleChange}
        label={single ? "单打" : "双打"}
      />
      <div className={styles.difficultyContainer}>
        {difficultiesToShow[single ? 2 : 1].map((d) => (
          <Button
            className={styles.difficultyButton}
            appearance="primary"
            key={d}
            onClick={() => {
              startGame(d);
            }}
          >
            {difficultyButtonText[d]}
          </Button>
        ))}
      </div>
    </div>
  );
};
