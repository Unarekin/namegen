export interface Hash<T> {
  [x: string]: T
}

export interface Subset {
  originators: string[]
  [x: string]: string[]
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
