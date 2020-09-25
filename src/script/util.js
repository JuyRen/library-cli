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

module.exports = {
    resolve,
    chalkError,
    chalkSuccess,
    spinner
};
