const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const { templatesRef } = require('./constant');

module.exports = function (projectName, template) {
    const root = path.resolve(projectName);
    const templateRoot = path.resolve(
        __dirname,
        '../template/',
        templatesRef[template].alias
    );

    if (fs.pathExistsSync(root)) {
        console.log(chalk.red('error: 文件目录已存在!'));
        process.exit(1);
    }

    fs.copy(templateRoot, root)
        .then(() => {
            console.log(chalk.green('success: 拉取模板成功!'));
        })
        .catch(err => {
            console.log(err);
        });
};
