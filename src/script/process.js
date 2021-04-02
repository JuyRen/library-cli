const fs = require('fs-extra');
const chalk = require('chalk');
const { program } = require('commander');
const downloadGitRepo = require('download-git-repo');
const inquirer = require('inquirer');

const { spinner, resolve, chalkError, getQuestions } = require('./util');
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
    spinner.color = 'yellow';
    spinner.start(chalk.yellow('检测目录中...'));

    if (await fs.pathExists(destination)) {
        spinner.fail(chalk.red(`${projectName}目录已存在`));
        process.exit(1);
    }

    spinner.stop();
    return destination;
}

async function quiz(projectName) {
    const answers = await inquirer.prompt(getQuestions(projectName));

    return answers;
}

function downloadRepo(templateConfig, destination) {
    const { alias, fullName } = templateConfig;
    spinner.color = 'yellow';
    spinner.start(
        chalk.yellow(`Wait for the remote ${fullName} template to download ...`)
    );

    return new Promise((res, rej) => {
        downloadGitRepo(
            `github:JuyRen/library-cli-repo#${alias}`,
            destination,
            err => {
                if (err) {
                    spinner.fail(chalk.red(err));
                    rej();
                    process.exit(1);
                }

                spinner.succeed(chalk.green(`Download successfully!`));
                res();
            }
        );
    });
}

function replacePlaceholder(answers, destination) {
    spinner.color = 'yellow';
    spinner.start(chalk.yellow(`Wait for initial template ...`));

    const pkg = resolve(destination, './package.json');
    const rollupConfig = resolve(destination, './rollup.config.js');

    let pkgFile = fs.readFileSync(pkg, 'utf-8');
    let rollupConfigFile = fs.readFileSync(rollupConfig, 'utf-8');

    Reflect.ownKeys(answers).forEach(key => {
        const reg = new RegExp(`~~${key}~~`, 'g');
        const answer = answers[key];
        pkgFile = pkgFile.replace(reg, answer);
        rollupConfigFile = rollupConfigFile.replace(reg, answer);
    });

    fs.writeFileSync(pkg, pkgFile, 'utf-8');
    fs.writeFileSync(rollupConfig, rollupConfigFile, 'utf-8');

    spinner.succeed(chalk.green(`Init template successfully`));
}

module.exports = {
    getDestination,
    getTemplate,
    downloadRepo,
    quiz,
    replacePlaceholder
};
