export interface Hash<T> {
  [x: string]: T
}

/**
 * 
 */
export interface NameFile {
  name: string,
  subsets: {
    [x: string]: string[]
  }
}
