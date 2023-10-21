import { exec } from "child_process";
import ora from "ora";

const spinner = ora("Running");

function run(command) {
  return new Promise((resolve, reject) => {
    spinner.start();

    exec(command, (error, stdout, stderr) => {
      spinner.stop();

      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

export default run;
