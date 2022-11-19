declare module "*.jpg";
declare module "*.webp";

interface Array<T> {
  group<TKey extends string | number | symbol>(
    callbackFn: (element: T, index: number, array: ArrayLike<T>) => TKey,
    thisArg?: any
  ): Record<TKey, Array<T>>;
}
