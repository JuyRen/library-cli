const keyReg = new RegExp(/^--/);

function getOptions() {
  // 特殊处理：两个破折号--的解析  --template ts
  const params = process.argv.slice(3);

  const keys = [];
  const values = [];

  for (let i = 0; i < params.length; i++) {
    const item = params[i];

    if (keyReg.test(item)) keys.push(item.replace(keyReg, ""));
    else values.push(item);
  }

  const options = {};
  keys.forEach((item, index) => {
    options[item] = values[index];
  });

  return options;
}

module.exports = getOptions;
