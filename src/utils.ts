export const randomSelect = (
  min: number,
  max: number,
  take: number,
  exclude?: Set<number>
) => {
  const nums = new Set<number>();
  while (nums.size !== take) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!exclude || !exclude.has(rand)) nums.add(rand);
  }
  return [...nums];
};

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export enum Difficulty {
  easy,
  medium,
  normal,
  hard,
  hardPlus,
  impossible,
  impossiblePlus,
}

export const difficultyText: Record<Difficulty, string> = {
  [Difficulty.easy]: "只因",
  [Difficulty.medium]: "有手就行",
  [Difficulty.normal]: "正常人类",
  [Difficulty.hard]: "有点困难",
  [Difficulty.hardPlus]: "非常困难",
  [Difficulty.impossible]: "差强人意",
  [Difficulty.impossiblePlus]: "你是神吧",
};

export const difficultyButtonText: Record<Difficulty, string> = {
  ...difficultyText,
  [Difficulty.easy]: "只因难度",
};

export interface IMatch {
  map: number;
  mutators: Array<number>;
  commanders: Array<number>;
  difficulty: Difficulty;
  win: boolean;
  startTime: number;
  recordTime: number;
}

export interface IMatchHistory {
  single: Array<IMatch>;
  multiple: Array<IMatch>;
}
