export const randomSelect = (min: number, max: number, take: number) => {
  const nums = new Set<number>();
  while (nums.size !== take) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
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
}

export const difficultyText: Record<Difficulty, string> = {
  [Difficulty.easy]: "只因",
  [Difficulty.medium]: "有手就行",
  [Difficulty.normal]: "正常人类",
  [Difficulty.hard]: "有点困难",
  [Difficulty.hardPlus]: "非常困难",
  [Difficulty.impossible]: "你是神吧",
};
