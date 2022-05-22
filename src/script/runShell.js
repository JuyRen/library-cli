const exec = require("child_process").exec;
const ora = require("ora");
const chalk = require("chalk");

const spinner = ora();

const cmd = "yarn";

function runShell(dirPath) {
  spinner.color = "yellow";
  spinner.start(chalk.yellow(`正在yarn`));

  exec(
    cmd,
    {
      cwd: dirPath,
    },
    (err) => {
      if (err) {
        spinner.fail(chalk.red(err));
        process.exit(1);
      }

      spinner.succeed(chalk.green(`依赖安装完成！`));
    }
  );
}

module.exports = runShell;
