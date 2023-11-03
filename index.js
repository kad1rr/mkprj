import chalk from "chalk";
import prompts from "prompts";
import fs from "fs";
import { spawnSync } from "child_process";

const questions = [
  {
    type: "select",
    name: "runtimeManager",
    message: chalk.green(
      " Which runtime would you like to use to create this project?"
    ),
    choices: [
      { title: chalk.blue("Bun"), value: "bun" },
      { title: chalk.blue("Bun + React"), value: "react" },
      { title: chalk.blue("Node.js"), value: "node" },
    ],
  },
  {
    type: "text",
    name: "projectName",
    message: chalk.green(" What is the directory name of your project?"),
    initial: "my-project",
  },
];

console.clear();
console.log(
  chalk.green(`
███╗░░░███╗██╗░░██╗██████╗░██████╗░░░░░░██╗
████╗░████║██║░██╔╝██╔══██╗██╔══██╗░░░░░██║
██╔████╔██║█████═╝░██████╔╝██████╔╝░░░░░██║
██║╚██╔╝██║██╔═██╗░██╔═══╝░██╔══██╗██╗░░██║
██║░╚═╝░██║██║░╚██╗██║░░░░░██║░░██║╚█████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░
`)
);
const answers = await prompts(questions);
if (answers.runtimeManager === "bun") {
  if (process.isBun) {
    Bun.spawnSync({
      cmd: ["mkdir", answers.projectName],
    });
    Bun.spawnSync({
      cmd: ["bun", "init", "-y"],
      cwd: answers.projectName === "." ? process.cwd() : answers.projectName,
    });
    console.log(chalk.green("Done 👌"));
  } else {
    console.log(chalk.red("Creating Bun project using Node.js 🤨"));
  }
} else if (answers.runtimeManager === "node") {
  if (!process.isBun) {
    fs.mkdirSync(answers.projectName);
    spawnSync("npm", ["init", "-y"], {
      cwd: answers.projectName,
    });
    console.log(chalk.green("Done 👌"));
  } else {
    console.log(chalk.red("Creating Node.js project using Bun 🤨"));
  }
} else if (answers.runtimeManager === "react1") {
  if (process.isBun) {
    Bun.spawnSync({
      cmd: ["mkdir", answers.projectName],
    });
    Bun.spawnSync({
      cmd: [
        "bun",
        "create",
        "vite",
        `${answers.projectName}`,
        "--template=react",
      ],
    });
    console.log(chalk.green("Done 👌"));
  } else {
    console.log(chalk.red("Creating Bun + React project using Node.js 🤨"));
  }
}
