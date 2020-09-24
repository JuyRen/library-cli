const chalk = require('chalk');
const { Command } = require('commander');
const { name, version } = require('../package.json');
const { templatesRef } = require('./util/constant');
const run = require('./util/run');

const program = new Command(name);
let projectName;

program.version(version);

program
    .arguments('<projectName>')
    .option(
        '-t, --template <type>',
        'choose javascript or typescript for library'
    )
    .action(name => {
        projectName = name;
    });

program.parse(process.argv);

const template = program.template;

if (!template) {
    console.log(chalk.red('error: 缺少 --template <type> 选项'));
    process.exit(1);
}

if (!Object.keys(templatesRef).includes(template)) {
    console.log(
        chalk.red(
            `error: <type>参数必须${Object.keys(templatesRef).join(',')}为之一`
        )
    );
    process.exit(1);
}

run(projectName, template);
