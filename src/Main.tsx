import { Button, makeStyles, Text } from "@fluentui/react-components";
import React from "react";
import { Selector } from "./Selector";
import { Difficulty } from "./utils";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "15px",
  },
  difficultyContainer: { display: "flex", flexWrap: "wrap" },
  difficultyButton: {
    marginRight: "5px !important",
    marginBottom: "5px !important",
  },
});

export const Main: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const [win, setWin] = React.useState(0);
  const [lost, setLost] = React.useState(0);
  const [lastMessage, setLastMessage] = React.useState("准备好🍣了吗？");
  const [difficulty, setDifficulty] = React.useState(Difficulty.easy);
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

  return ready ? (
    <div className={styles.container}>
      <Selector
        winCallback={winGame}
        lostCallback={lostGame}
        difficulty={difficulty}
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
      <div className={styles.difficultyContainer}>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.easy);
          }}
        >
          只因难度
        </Button>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.medium);
          }}
        >
          有手就行
        </Button>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.normal);
          }}
        >
          正常人类
        </Button>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.hard);
          }}
        >
          有点困难
        </Button>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.hardPlus);
          }}
        >
          非常困难
        </Button>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.impossible);
          }}
        >
          差强人意
        </Button>
        <Button
          className={styles.difficultyButton}
          appearance="primary"
          onClick={() => {
            startGame(Difficulty.impossiblePlus);
          }}
        >
          你是神吧
        </Button>
      </div>
    </div>
  );
};
