import { NameFile } from "./interfaces";
import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * 
 */
export class NameFileParser {
  constructor() { }

  /**  */
  public ParseJSON(json: NameFile): any {
    return {
      name: json.name,
      subsets: Object.fromEntries(
        Object.entries(json.subsets).map((entry) => this.parseSubset(...entry))
      )
    };
  }

  private parseSubset(name: string, values: string[]): any[] {
    let valueHash: { [x: string]: string[] } = { originators: [] };

    values.forEach((value: string) => {
      value = value.trim();
      valueHash.originators.push(value.substr(0, 2));
      for (let i = 0; i < value.length - 1; i++) {
        let pair: string = value.substr(i, 2);
        if (!valueHash[pair])
          valueHash[pair] = [];
        if (i < value.length - 2)
          valueHash[pair].push(value.substr(i + 2, 1));
        else
          valueHash[pair].push(null);
      }
    });
    return [
      name,
      valueHash
    ]
  }
}

if (require.main === module) {
  (async function () {
    try {
      console.log("Parsing ...");
      if (process.argv.length > 2) {
        let parser = new NameFileParser();
        let files: string[] = [process.argv[2]];
        let outputDir: string = (process.argv.length === 4 ? path.resolve(process.argv[3]) : path.resolve(process.argv[2]));

        let combined: any = {};

        let stat = await fs.lstat(process.argv[2]);
        if (stat.isDirectory())
          files = await (await fs.readdir(process.argv[2])).map((file: string) => path.join(process.argv[2], file));

        for (let i = 0; i < files.length; i++) {
          let content = require(path.resolve(files[i]));
          let parsed = parser.ParseJSON(content);
          await fs.writeFile(path.join(outputDir, path.basename(files[i], path.extname(files[i])) + ".json"), JSON.stringify(parsed));
          combined[parsed.name.toLowerCase()] = parsed;
          console.log(path.basename(files[i], path.extname(files[i])));
        }
        await fs.writeFile(path.join(outputDir, "_all.json"), JSON.stringify(combined));

      } else {
        throw new Error("Must provide input file/directory.");
      }
    } catch (err) {
      console.error(err);
    }
  })();
}