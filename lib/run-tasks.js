const { execSync } = require('child_process');
const chalk = require('chalk');
const { logger } = require('./utils');

const runTasks = async (schema, cb) => {
    if (schema.tasks && schema.tasks[Symbol.iterator]) {
        try {
            let i = 0;
            for (const task of schema.tasks) {
                const callBackRes = await cb(task, i);
                if (callBackRes === false) {
                    continue;
                }
                var cmd = callBackRes || commandString;
                logger.log(`(${++i})Running command:: ${chalk.cyan(cmd)}`);
                console.log(execSync(cmd).toString());
                logger.log(`Done.`);
            }
        } catch (e) {
            logger.error(
                chalk.red(`Errors occured while executing ${chalk.cyan(cmd)}`)
            );
            logger.error(chalk.red(e.message));
        }
    }
};

module.exports = runTasks;
