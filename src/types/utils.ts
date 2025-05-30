/**
 * Makes all properties in T optional, including nested objects
 */
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/**
 * Makes all properties in T required, including nested objects
 */
export type DeepRequired<T> = T extends object ? {
  [P in keyof T]-?: DeepRequired<T[P]>;
} : T;

/**
 * Makes all properties in T readonly, including nested objects
 */
export type DeepReadonly<T> = T extends object ? {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;

/**
 * Makes all properties in T mutable, including nested objects
 */
export type DeepMutable<T> = T extends object ? {
  -readonly [P in keyof T]: DeepMutable<T[P]>;
} : T;

/**
 * Extracts the type of a nested property path
 * Example: PathValue<{ a: { b: { c: number } } }, ['a', 'b', 'c']> -> number
 */
export type PathValue<T, P extends string[]> =
  P extends [infer K, ...infer R]
    ? K extends keyof T
      ? R extends string[]
        ? PathValue<T[K], R>
        : T[K]
      : never
    : T;

/**
 * Creates a union of all possible paths in an object type
 * Example: AllPaths<{ a: { b: number; c: string } }> -> 'a' | 'a.b' | 'a.c'
 */
export type AllPaths<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? T[K] extends object
          ? `${P}${K}` | AllPaths<T[K], `${P}${K}.`>
          : `${P}${K}`
        : never;
    }[keyof T]
  : never;

/**
 * Creates a union of all possible leaf paths in an object type
 * Example: LeafPaths<{ a: { b: number; c: { d: string } } }> -> 'a.b' | 'a.c.d'
 */
export type LeafPaths<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? T[K] extends object
          ? LeafPaths<T[K], `${P}${K}.`>
          : `${P}${K}`
        : never;
    }[keyof T]
  : never;

/**
 * Extracts the type of a property at a given path
 * Example: GetType<{ a: { b: number } }, 'a.b'> -> number
 */
export type GetType<T, P extends string> = 
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? GetType<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

/**
 * Creates a type that represents a theme color path
 * Example: ThemeColorPath<Theme> -> 'colors.primary' | 'colors.secondary' | ...
 */
export type ThemeColorPath<T> = T extends { colors: infer C }
  ? C extends Record<string, unknown>
    ? `colors.${Extract<keyof C, string>}`
    : never
  : never;

/**
 * Creates a type that represents a theme spacing path
 * Example: ThemeSpacePath<Theme> -> 'space.sm' | 'space.md' | ...
 */
export type ThemeSpacePath<T> = T extends { space: infer S }
  ? S extends Record<string, unknown>
    ? `space.${Extract<keyof S, string>}`
    : never
  : never;

/**
 * Creates a type that represents a theme typography path
 * Example: ThemeTypographyPath<Theme> -> 'typography.fontFamily.sans' | ...
 */
export type ThemeTypographyPath<T> = T extends { typography: infer Typo }
  ? Typo extends Record<string, unknown>
    ? `typography.${Extract<keyof Typo, string>}`
    : never
  : never;

/**
 * Creates a type that represents all theme paths
 * Example: ThemePath<Theme> -> 'colors.primary' | 'space.sm' | 'typography.fontFamily.sans' | ...
 */
export type ThemePath<T> = 
  | ThemeColorPath<T>
  | ThemeSpacePath<T>
  | ThemeTypographyPath<T>;

/**
 * Extracts the value type from a theme path
 * Example: ThemeValue<Theme, 'colors.primary'> -> string
 */
export type ThemeValue<T, P extends ThemePath<T>> = 
  P extends `colors.${infer C}`
    ? T extends { colors: infer C }
      ? C extends Record<string, unknown>
        ? C[Extract<C, string>]
        : never
      : never
    : P extends `space.${infer S}`
      ? T extends { space: infer S }
        ? S extends Record<string, unknown>
          ? S[Extract<S, string>]
          : never
        : never
      : P extends `typography.${infer TY}`
        ? T extends { typography: infer Typo }
          ? Typo extends Record<string, unknown>
            ? Typo[Extract<TY, string>]
            : never
          : never
        : never;
