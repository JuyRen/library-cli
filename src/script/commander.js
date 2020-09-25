const { program } = require('commander');
const { name, version } = require('../../package.json');

module.exports = function createCommander() {
    let projectName;

    program
        .name(name)
        .usage('<projectName> --template <type>')
        .version(version);

    program
        .arguments('<projectName>')
        .option(
            '-t, --template <type>',
            'develop the library with javascript or typescript'
        )
        .action(_projectName => {
            projectName = _projectName;
        })
        .parse(process.argv);

    return { projectName };
};
