const createCommander = require('./script/commander');
const { chalkError } = require('./script/util');

const {
    getDestination,
    getTemplate,
    downloadRepo
} = require('./script/process');

async function run() {
    const { projectName } = createCommander();
    const templateConfig = getTemplate();
    const destination = await getDestination(projectName);

    downloadRepo(templateConfig, destination);
}

run().catch(err => {
    console.log(chalkError(), err);
    process.exit(1);
});
