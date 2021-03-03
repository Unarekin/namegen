/**
 * Name generator module
 * @module namegen
 */

import { promises as fs } from 'fs';
import * as path from 'path';

import {
  NameFile,
  Hash,
  Subset
} from './interfaces';
import { NameFileParser } from './parser';
import { default as NameFiles } from './names';


/**
 * A simple class to handle name generation from a set of example files.
 */
export class NameGenerator {
  private _templateHash: Hash<NameFile> = {};
  private _parser: NameFileParser = new NameFileParser();

  constructor() {

    // Load known templates
    this._templateHash = NameFiles;
  }

  public GenerateName(template: string, subset: string): string
  public GenerateName(template: NameFile, subset: string): string
  public GenerateName(subset: Subset): string
  public GenerateName(subset: string[]): string
  public GenerateName(firstArg: any, secondArg?: any): string {

    let actualSubset: Subset = null;

    // Error checking
    if (typeof (firstArg) === "string" && typeof (secondArg) === "string") {
      if (!this._templateHash[firstArg.toLowerCase()])
        throw new Error(`Unknown template: ${firstArg}.`);
      if (!this._templateHash[firstArg.toLowerCase()].subsets[secondArg.toLowerCase()])
        throw new Error(`Unknown subset: ${secondArg}`);
      if (!(<any>this._templateHash[firstArg.toLowerCase()].subsets[secondArg.toLowerCase()]).originators)
        throw new Error(`Unknown subset: ${secondArg}`);
      actualSubset = <any>this._templateHash[firstArg.toLowerCase()].subsets[secondArg.toLowerCase()];
    } else if (firstArg.originators) {
      actualSubset = firstArg;
    } else if (firstArg.subsets) {
      if (!firstArg.subsets[secondArg.toLowerCase()])
        throw new Error(`Unknown subset: ${secondArg}`);
      actualSubset = firstArg.subsets[secondArg.toLowerCase()];
    } else if (Array.isArray(firstArg) && typeof (firstArg[0]) === "string") {
      actualSubset = this._parser.ParseJSON({ name: "temp", subsets: { "temp": firstArg } }).subsets.temp;
    }

    if (!actualSubset)
      throw new Error("Unable to determine subset.");

    let name: string = actualSubset.originators[Math.floor(Math.random() * actualSubset.originators.length)];

    while (true) {
      let pair: string = name.substr(-2);
      if (!actualSubset[pair])
        break;
      let next: string = actualSubset[pair][Math.floor(Math.random() * actualSubset[pair].length)];
      if (!next)
        break;
      name += next;
    }
    return name;
  }


}

/** Alias export, for backwards compatability. */
/** Even if it's super unlikely anyone's actually using this. */
export { NameGenerator as namegen };