const chalk = require("chalk");

const getDirname = require("./script/getDirname");
const getOptions = require("./script/getOptions");
const getDirPath = require("./script/getDirPath");
const getAnswer = require("./script/getAnswer");

async function run() {
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

  // 第二步: 处理参数dirname, 得到完成的路径
  const dirPath = getDirPath(dirname);
  console.log("dirPath: ", dirPath);

  // 第三步: 终端提问并回答
  const answer = await getAnswer(dirname);
  console.log("answer: ", answer);
}

run();
