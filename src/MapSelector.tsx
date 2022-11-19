import {
  Body1,
  Button,
  Caption1,
  Image,
  makeStyles,
  mergeClasses,
  Text,
} from "@fluentui/react-components";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components/unstable";
import React from "react";
import artanis from "./assets/avatars/Artanis.webp";
import jim from "./assets/avatars/Jim.webp";
import sarah from "./assets/avatars/Sarah.webp";
import { maps } from "./assets/maps";
import data from "./data";
import { randomSelect } from "./utils";

export interface IMapSelectorProps {
  selectCallback: (map: number) => void;
}

const useStyles = makeStyles({
  card: {
    marginRight: "5px",
    marginLeft: "5px",
    marginBottom: "10px",
  },
  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    minWidth: "30%",
    maxWidth: "100%",
  },
  cardOutside: {
    width: "100%",
    flexGrow: "0",
    flexShrink: "0",
    "@media (min-width: 40em)": { flexBasis: "100%" },
    "@media (min-width: 60em)": { flexBasis: "50%" },
    "@media (min-width: 99em)": { flexBasis: "33%" },
  },
});

export const MapSelector: React.FC<IMapSelectorProps> = (
  props: IMapSelectorProps
) => {
  const mapRolled = randomSelect(0, 14, 3);
  const styles = useStyles();
  return (
    <>
      <Text as="p" size={400}>
        埃蒙为你准备了几张地图,选一张喜欢的吧!
      </Text>
      <div className={styles.cardWrapper}>
        <div className={mergeClasses(styles.cardOutside)}>
          <Card className={styles.card}>
            <CardHeader
              image={<Image src={artanis} height="60px" shape="rounded" />}
              header={
                <Body1>
                  达拉姆大主教<b>阿塔尼斯</b>向你推荐了{data.maps[mapRolled[0]]}
                </Body1>
              }
              description={
                <Caption1>{data.mapDescription[mapRolled[0]]}</Caption1>
              }
            />
            <CardPreview>
              <img src={maps[mapRolled[0]]} />
            </CardPreview>
            <CardFooter>
              <Button
                onClick={() => {
                  props.selectCallback(mapRolled[0]);
                }}
              >
                选他！
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className={mergeClasses(styles.cardOutside)}>
          <Card className={styles.card}>
            <CardHeader
              image={<Image src={jim} height="60px" shape="rounded" />}
              header={
                <Body1>
                  指挥官<b>吉姆·雷诺</b>向你推荐了{data.maps[mapRolled[1]]}
                </Body1>
              }
              description={
                <Caption1>{data.mapDescription[mapRolled[1]]}</Caption1>
              }
            />
            <CardPreview>
              <img src={maps[mapRolled[1]]} />
            </CardPreview>
            <CardFooter>
              <Button
                onClick={() => {
                  props.selectCallback(mapRolled[1]);
                }}
              >
                选他！
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className={mergeClasses(styles.cardOutside)}>
          <Card className={styles.card}>
            <CardHeader
              image={<Image src={sarah} height="60px" shape="rounded" />}
              header={
                <Body1>
                  萨尔那加<b>萨拉·凯瑞甘</b>向你推荐了{data.maps[mapRolled[2]]}
                </Body1>
              }
              description={
                <Caption1>{data.mapDescription[mapRolled[2]]}</Caption1>
              }
            />
            <CardPreview>
              <img src={maps[mapRolled[2]]} />
            </CardPreview>
            <CardFooter>
              <Button
                onClick={() => {
                  props.selectCallback(mapRolled[2]);
                }}
              >
                选他！
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
