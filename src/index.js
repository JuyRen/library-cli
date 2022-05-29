const path = require("path");
const fs = require("fs");
const { program } = require("commander");
const inquirer = require("inquirer");
const ncp = require("ncp").ncp;

const pkg = require("../package.json");

async function run() {
  let dirName = "";

  // <>必填， []选填
  // 若不填，commander会报错
  program
    .name(pkg.name) // 命令名称
    .usage("<projectName> --template <ts|js>") // 使用方式说明
    .version(pkg.version, "-v, --version", "version描述")
    .argument("<projectName>", "要创建的文件夹名")
    .option("-temp, --template <type>", "选择拉取的代码模板类型ts|js", "ts")
    .action((projectName, d) => {
      dirName = projectName;
    })
    .parse();

  const options = program.opts();
  const template = options.template;
  console.log("dirName: ", dirName);
  console.log("template: ", template);

  const dirPath = path.resolve(process.cwd(), dirName);

  if (fs.existsSync(dirPath)) {
    process.exit(1);
  }
  console.log("dirPath: ", dirPath);

  const answers = await inquirer.prompt([
    {
      message: "What is your project name?",
      name: "projectName",
      default: dirName,
    },
    {
      message: "what is the version of your project?",
      name: "version",
      default: "1.0.0",
    },
    {
      message: "How do you describe your project?",
      name: "description",
    },
    {
      message: "What is the author of your project?",
      name: "author",
    },
    {
      message: "What keywords do you want to set for your project?",
      name: "keywords",
    },
    {
      message: "What is the git repository of your project",
      name: "git",
    },
  ]);

  console.log("answers: ", answers);

  ncp(
    `./template/${template}`,
    dirPath,
    {
      rename: (filename) => filename.replace(/\.example$/, ""),
    },
    (err) => {
      if (err) {
        console.log("ncp出错了", err);
        process.exit(1);
      }
    }
  );
}

run();
