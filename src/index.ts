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

    this.GenerateName = this.GenerateName.bind(this);
    this.GetTemplateName = this.GetTemplateName.bind(this);
    this.GetTemplates = this.GetTemplates.bind(this);
  }

  public GetTemplateName(template: string): string {
    if (!this._templateHash[template.toLowerCase()])
      throw new Error(`Unknown template: '${template}'`);
    return this._templateHash[template.toLowerCase()].name;
  }

  public GetTemplates(): { name: string, subsets: string[] }[] {
    return Object.values(this._templateHash).map((val) => {
      return {
        name: val.name,
        subsets: Object.keys(val.subsets)
      }
    }) as any;
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
        throw new Error(`Unknown template: '${firstArg}'.`);
      if (!this._templateHash[firstArg.toLowerCase()].subsets[secondArg.toLowerCase()])
        throw new Error(`Unknown subset: '${secondArg}'`);
      if (!(<any>this._templateHash[firstArg.toLowerCase()].subsets[secondArg.toLowerCase()]).originators)
        throw new Error(`Unknown subset: '${secondArg}'`);
      actualSubset = <any>this._templateHash[firstArg.toLowerCase()].subsets[secondArg.toLowerCase()];
    } else if (firstArg.originators) {
      actualSubset = firstArg;
    } else if (firstArg.subsets) {
      if (!firstArg.subsets[secondArg.toLowerCase()])
        throw new Error(`Unknown subset: '${secondArg}'`);
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



/**
 * If it's called from the command line.
 */
if (require.main === module) {
  (async function () {
    try {

      function time(duration: number): string {
        let output: string[] = [];

        let ms: number = duration;
        let s: number = 0;
        let m: number = 0;

        if (ms > 1000 * 60) {
          m = Math.floor(ms / (1000 * 60));
          ms -= (m * 1000 * 60);
          output.push(`${m}m`);
        }
        if (ms > 1000) {
          s = Math.floor(ms / 1000);
          ms -= s * 1000;
          output.push(`${s}s`);
        }

        output.push(`${ms}ms`);

        return output.join(" ");
      }

      let generator = new NameGenerator();
      if (process.argv[2] == "templates") {

        console.log(`Template:           Subsets`);
        console.log("=".repeat(50));

        generator.GetTemplates().forEach((template) => {
          console.log(`${template.name}: ${" ".repeat(20 - template.name.length)}${template.subsets.join("\t")}`);
        });

        return;
      }

      if (process.argv.length < 3)
        throw new Error(`Usage: ${path.basename(process.argv[1])} <template> <subset> [<qty>]`);

      let template: string = process.argv[2];
      let subset: string = process.argv[3];
      let qty: number = parseInt(process.argv[4] ?? "1");

      if (isNaN(qty))
        throw new Error(`'${process.argv[4]}' does not appear to be a number.`);

      let names: string[] = [];

      let templateName = generator.GetTemplateName(template);

      let header: string = `${qty} ${templateName} name${qty > 1 ? 's' : ''}:`;
      console.log(header);
      console.log("=".repeat(header.length));

      let start = Date.now();
      for (let i = 0; i < qty; i++)
        console.log(generator.GenerateName(template, subset))

      console.log(`Generated ${qty} names in ${time(Date.now() - start)}`);



    } catch (err) {
      console.error(err.message);
    }
  })();
}