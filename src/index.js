const { program } = require("commander");

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
}

run();
