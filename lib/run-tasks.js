const { execSync } = require('child_process');
const chalk = require('chalk');
const { logger } = require('./utils');

const runTasks = async (schema, cb) => {
    if (schema.tasks && schema.tasks[Symbol.iterator]) {
        try {
            for (const x of schema.tasks) {
                logger.log(`Command to run:: ${chalk.cyan(x.command)}`);
                var cmd = (await cb(x)) || x.command;
                logger.log(`Running command:: ${chalk.yellow(cmd)}`);
                console.log(execSync(cmd).toString());
                logger.log(`Done.`);
            }
        } catch (e) {
            logger.error(
                chalk.red(
                    `Errors occured while executing ${chalk.cyan.bold(cmd)}`
                )
            );
            logger.error(chalk.red(e.message));
        }
    }
};

module.exports = runTasks;
