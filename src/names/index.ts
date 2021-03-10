// let names = require("./_all.json");

// export default names;

import * as fs from 'fs';
import * as path from 'path';

let names = {};

let files: string[] = fs
  .readdirSync(path.join(__dirname, "."))
  .filter((file: string) => path.extname(file).toLowerCase() === ".json");

for (let i = 0; i < files.length; i++) {
  let template = JSON.parse(fs.readFileSync(path.join(__dirname, files[i])).toString());
  names[template.name.toLowerCase()] = template;
}

export default names;