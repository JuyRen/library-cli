const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora();

function resolve(...urls) {
    return path.resolve(...urls);
}

function chalkError() {
    return chalk.bgRedBright.whiteBright('ERROR:');
}

function chalkSuccess() {
    return chalk.bgGreenBright('SUCCESS:');
}

function titleCase(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

function getQuestions(projectName) {
    return [
        {
            message: 'What is your project name?',
            name: 'projectName',
            default: projectName
        },
        {
            message: 'What is your module name? (Window.moduleName)',
            name: 'moduleName',
            default: projectName.split('-').map(titleCase).join('')
        },
        {
            message: 'what is the version of your project?',
            name: 'version',
            default: '1.0.0'
        },
        {
            message: 'How do you describe your project?',
            name: 'description'
        },
        {
            message: 'What is the author of your project?',
            name: 'author'
        },
        {
            message: 'What keywords do you want to set for your project?',
            name: 'keywords'
        },
        {
            message: 'What is the git repository of your project',
            name: 'git'
        }
    ];
}

module.exports = {
    spinner,

    resolve,
    chalkError,
    chalkSuccess,
    getQuestions
};
