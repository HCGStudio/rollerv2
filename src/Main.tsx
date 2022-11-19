import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  Switch,
  SwitchOnChangeData,
  Text
} from "@fluentui/react-components";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { History } from "./History";
import { Selector } from "./Selector";
import { Difficulty, difficultyButtonText, IMatchHistory } from "./utils";

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
  history: {
    marginTop: "5px",
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
  // const [win, setWin] = React.useState(0);
  // const [lost, setLost] = React.useState(0);
  const [lastMessage, setLastMessage] = React.useState("准备好🍣了吗？");
  const [difficulty, setDifficulty] = React.useState(Difficulty.easy);
  const [single, setSingle] = useLocalStorage("single", false);
  const [lastChallengeTime, setLastChallengeTime] = React.useState(0);
  const [history, setHistory] = useLocalStorage<IMatchHistory>("matchHistory", {
    single: [],
    multiple: [],
  });

  const win = React.useMemo(() => {
    return (single ? history.single : history.multiple).filter((m) => m.win)
      .length;
  }, [single, history]);
  const lost = React.useMemo(() => {
    return (single ? history.single : history.multiple).length - win;
  }, [single, history, win]);

  const styles = useStyles();

  const saveGame = React.useCallback(
    (
      map: number,
      mutators: Array<number>,
      commanders: Array<number>,
      win: boolean
    ) => {
      const saving = { ...history };
      const targetSave = single ? saving.single : saving.multiple;
      targetSave.push({
        map,
        mutators,
        commanders,
        win,
        difficulty,
        startTime: lastChallengeTime,
        recordTime: Date.now(),
      });
      setHistory(saving);
    },
    [single, history, win, lastChallengeTime, difficulty]
  );

  const lostGame = React.useCallback(
    (map: number, mutators: Array<number>, commanders: Array<number>) => {
      saveGame(map, mutators, commanders, false);
      setReady(false);
      setLastMessage("MGJ，不服，再来！");
    },
    [single, history, win, lastChallengeTime, difficulty]
  );

  const winGame = React.useCallback(
    (map: number, mutators: Array<number>, commanders: Array<number>) => {
      saveGame(map, mutators, commanders, true);
      setReady(false);
      setLastMessage("爽了，再来！");
    },
    [single, history, win, lastChallengeTime, difficulty]
  );

  const startGame = React.useCallback((targetDifficulty: Difficulty) => {
    setLastChallengeTime(Date.now());
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
      <div className={styles.history}>
        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="primary">历史记录</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>历史记录</DialogTitle>
              <DialogContent>
                <History history={history}/>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button
                    appearance="secondary"
                    onClick={() => {
                      localStorage.clear();
                      location.reload();
                    }}
                  >
                    清除历史记录
                  </Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary">好的</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
};
