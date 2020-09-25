const fs = require('fs-extra');
const chalk = require('chalk');
const { program } = require('commander');
const downloadGitRepo = require('download-git-repo');

const { resolve, chalkError, spinner } = require('./util');
const templateConfigs = require('../conf');

function getTemplate() {
    const templateOption = program.template;

    if (!templateOption) {
        console.log(chalkError(), chalk.red('缺少--template <type> 选项'));
        process.exit(1);
    }

    if (!Object.keys(templateConfigs).includes(templateOption)) {
        console.log(
            chalkError(),
            chalk.red(
                `<type>参数必须${Object.keys(templateConfigs).join(',')}为之一`
            )
        );
        process.exit(1);
    }

    return templateConfigs[templateOption];
}

async function getDestination(projectName) {
    const destination = resolve(process.cwd(), projectName);
    spinner.start('检测目录中...');

    if (await fs.pathExists(destination)) {
        spinner.fail(chalk.red(`${projectName}目录已存在`));
        process.exit(1);
    }

    return destination;
}

async function downloadRepo(templateConfig, destination) {
    const { alias, fullName } = templateConfig;
    spinner.color = 'yellow';
    spinner.start(chalk.yellow(`拉取远端${fullName}模板代码中...`));

    downloadGitRepo(
        `github:JuyRen/library-cli-repo#${alias}`,
        destination,
        err => {
            if (err) {
                spinner.fail(err);
                process.exit(1);
            }

            spinner.succeed(chalk.green(`项目创建成功!`));
        }
    );
}

module.exports = {
    getDestination,
    getTemplate,
    downloadRepo
};
