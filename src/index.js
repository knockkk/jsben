#!/usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import { argPath } from "./arg.js";
import gen from "./gen.js";
import run from "./run.js";

const program = new Command();
program
  .name("jsben")
  .description(
    "A simple command-line tool for javascript performance testing, inspired by Golang benchmarking"
  );
program.parse();

// log platform
console.log("os: ", process.platform);
console.log("node version: ", process.version);

// main process
const source = fs.readFileSync(argPath());
const code = gen(source);

const tempFile = `jsben_temp_${Date.now()}.js`;
fs.writeFileSync(tempFile, code);

run(`node ${tempFile}`)
  .then((stdout) => {
    console.log(stdout);

    fs.rmSync(tempFile);
  })
  .catch((err) => console.error(err));

process.on("SIGINT", () => fs.rmSync(tempFile));
