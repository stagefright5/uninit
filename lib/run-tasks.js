const { execSync } = require('child_process');
const chalk = require('chalk');
const { logger } = require('./utils');

const runTasks = async (schema, cb) => {
    if (schema.tasks && schema.tasks[Symbol.iterator]) {
        try {
            let i = 0;
            for (const x of schema.tasks) {
                logger.log(
                    `(${++i}) Command to run:: ${chalk.cyan(x.command)}`
                );
                const callBackRes = await cb(x);
                if (callBackRes === false) {
                    logger.log(
                        `Skipping the command: ${chalk.cyan(x.command)}`
                    );
                    continue;
                }
                var cmd = callBackRes || x.command;
                logger.log(`Running command:: ${chalk.cyan(cmd)}`);
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
