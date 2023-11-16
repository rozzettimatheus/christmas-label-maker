export type Optional<T> = T extends string | number | boolean
  ? T | null
  : T extends object
    ? {
        [K in keyof T]?: T[K] | null
      }
    : Array<T | null>
