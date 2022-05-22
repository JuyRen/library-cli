const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const downloadGitRepo = require("download-git-repo"); // https://www.npmjs.com/package/download-git-repo

const spinner = ora();

// 获取模板
function getTemplate(dirPath, template) {
  spinner.color = "yellow";
  spinner.start(chalk.yellow(`正在从远端拉去${template}模板,请稍等...`));

  return new Promise((res, rej) => {
    downloadGitRepo(
      `github:JuyRen/library-cli-repo#${template}`, // https://github.com/JuyRen/library-cli-repo
      dirPath,
      (err) => {
        if (err) {
          spinner.fail(chalk.red(err));
          rej();
          process.exit(1);
        }

        spinner.succeed(chalk.green(`模板代码拉取成功!`));
        res();
      }
    );
  });
}

// 模板占位符替换
function replaceAnswer(dirPath, answers) {
  spinner.color = "yellow";
  spinner.start(chalk.yellow(`正在替换模板占位符,请稍后...`));

  // 对需要替换模板的文件分别操作
  const pkg = path.resolve(dirPath, "./package.json");

  let pkgFile = fs.readFileSync(pkg, "utf-8");

  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
  Reflect.ownKeys(answers).forEach((key) => {
    const reg = new RegExp(`~~${key}~~`, "g");
    const answer = answers[key];
    pkgFile = pkgFile.replace(reg, answer);
  });

  fs.writeFileSync(pkg, pkgFile, "utf-8");

  spinner.succeed(chalk.green(`生成成功`));
}

async function mkdirByOptions(dirPath, options, answers) {
  await getTemplate(dirPath, options.template);

  replaceAnswer(dirPath, answers);
}

module.exports = mkdirByOptions;
