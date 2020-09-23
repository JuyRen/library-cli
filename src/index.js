const chalk = require('chalk');
const { Command } = require('commander');
const { name, version } = require('../package.json');

const program = new Command(name);

program.version(version);

program
    .arguments('<projectName>')
    .option(
        '-t, --template <type>',
        'choose javascript or typescript for library'
    )
    .action((projectName, options) => {
        const template = options.template;
        if (!template) {
            console.log(chalk.red('error: 缺少 --template <type> 选项'));
            return false;
        }

        if (!['javascript', 'typescript'].includes(template)) {
            console.log(
                chalk.red('error: <type>参数必须为javascript, typescript之一')
            );
            return false;
        }
    });

program.parse(process.argv);
