const createCommander = require('./script/commander');
const { chalkError } = require('./script/util');

const {
    getDestination,
    getTemplate,
    quiz,
    downloadRepo,
    replacePlaceholder
} = require('./script/process');

async function run() {
    const { projectName } = createCommander();
    const templateConfig = getTemplate();
    const destination = await getDestination(projectName);
    const answers = await quiz(projectName);

    await downloadRepo(templateConfig, destination);

    replacePlaceholder(answers, destination);
}

run().catch(err => {
    console.log(chalkError(), err);
    process.exit(1);
});
