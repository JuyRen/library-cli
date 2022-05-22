const chalk = require("chalk");

const getDirname = require("./script/getDirname");
const getOptions = require("./script/getOptions");

function run() {
  // 第一步： 接受node参数： process.argv
  const dirname = getDirname();
  if (!dirname) {
    console.log(chalk.red("请输入项目名称!"));
    process.exit(1);
  }
  const { template } = getOptions();
  if (!template) {
    console.log(chalk.red("请输入代码模板"));
    process.exit(1);
  } else {
    if (!["ts", "js"].includes(template)) {
      console.log(chalk.red("请输入正确的代码模板 （ts js）"));
      process.exit(1);
    }
  }
}

run();
