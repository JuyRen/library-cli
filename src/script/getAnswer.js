// readline-promise https://www.npmjs.com/package/readline-promise

const readline = require("readline");

async function getAnswer(projectName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = {
    name: projectName,
    version: "1.0.0",
  };

  const rlPromise = (question) => {
    return new Promise((resolve, reject) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  const nameAns = await rlPromise(
    `你的项目名称叫什么? (默认值: ${answers.name}): `
  );
  if (nameAns) answers.name = nameAns;

  const versionAns = await rlPromise(
    `项目版本？(默认值: ${answers.version}): `
  );
  if (versionAns) answers.version = versionAns;

  // description, author, ...

  rl.close();
  return answers;
}

module.exports = getAnswer;
