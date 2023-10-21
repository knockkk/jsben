import fs from "fs";
import { resolve } from "path";

export function argPath() {
  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error(
      "Please provide the benchmark file path as a parameter, for example: jsben test.js."
    );
  }

  const absolutePath = resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`The file ${filePath} does not exist`);
  }

  return absolutePath;
}
