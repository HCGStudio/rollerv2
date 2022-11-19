import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Caption1,
  Text,
} from "@fluentui/react-components";
import React from "react";
import { CommanderShow } from "./CommanderShow";
import data from "./data";
import { MutatorShow } from "./MutatorShow";
import { difficultyText, IMatch, IMatchHistory } from "./utils";

export interface IHistoryProps {
  history: IMatchHistory;
}

export interface IMatchHistoryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  match: IMatch;
  key: React.Key;
}

export interface IGroupedHistoryProps {
  matches: Array<IMatch>;
}

const MatchHistory: React.FC<IMatchHistoryProps> = (
  props: IMatchHistoryProps
) => {
  console.log(props);
  return (
    <AccordionItem value={props.match.recordTime}>
      <AccordionHeader>
        {data.maps[props.match.map]}，难度：
        {difficultyText[props.match.difficulty]}，
        {props.match.win ? "胜利" : "失败"}
      </AccordionHeader>
      <AccordionPanel>
        <div>
          <Caption1>
            开始时间：{new Date(props.match.startTime).toLocaleTimeString()}
            &nbsp; 记录时间：
            {new Date(props.match.recordTime).toLocaleTimeString()}
          </Caption1>
          <MutatorShow mutators={props.match.mutators} />
          <CommanderShow commanders={props.match.commanders} />
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};

export const GroupedHistory: React.FC<IGroupedHistoryProps> = (
  props: IGroupedHistoryProps
) => {
  return props.matches.length > 0 ? (
    <Accordion multiple>
      {Object.entries(
        props.matches.group((e) => new Date(e.startTime).toLocaleDateString())
      ).map(([date, arr]) => {
        return (
          <AccordionItem value={date}>
            <AccordionHeader size="large">{date}</AccordionHeader>
            <AccordionPanel>
              <Accordion multiple>
                {arr.map((p) => (
                  <MatchHistory match={p} key={p.recordTime} />
                ))}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  ) : (
    <Text size={400}>暂无记录</Text>
  );
};

export const History: React.FC<IHistoryProps> = (props: IHistoryProps) => {
  console.log(Array.prototype);

  console.log();
  return (
    <>
      <Accordion multiple>
        <AccordionItem value="multiple">
          <AccordionHeader size="extra-large">双打</AccordionHeader>
          <AccordionPanel>
            <GroupedHistory matches={props.history.multiple} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="single">
          <AccordionHeader size="extra-large">单打</AccordionHeader>
          <AccordionPanel>
            <GroupedHistory matches={props.history.single} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
