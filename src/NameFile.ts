/**
 * 
 */
export interface NameFile {
  name: string,
  subsets: {
    [x: string]: string[]
  }
}