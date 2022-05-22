const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

function getDirPath(value) {
  // path.resolve() 方法将路径或路径片段的序列解析为绝对路径
  // process.cwd()返回的是当前Node.js进程执行时的工作目录
  const dirPath = path.resolve(process.cwd(), value);

  const exists = fs.existsSync(dirPath);

  if (exists) {
    console.log(chalk.red(`${value}目录已存在`));
    process.exit(1);
  }

  // 返回完整路径， 而不是直接创建文件夹
  // 创建工作需要等终端交互全部完成后
  return dirPath;
}

module.exports = getDirPath;
