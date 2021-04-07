const inquirer = require('inquirer');
const runTasks = require('./run-tasks');
const { parseCommand, replacePlaceholders } = require('./parse-command');
const schemaManager = require('./schema');
const { logger } = require('./utils');
const args = require('./args');
const prompt = inquirer.createPromptModule();
const chalk = require('chalk');

const start = () => {
    let schemaKeys = [];
    if (
        !schemaManager.schemas ||
        !(schemaKeys = Object.keys(schemaManager.schemas)).length
    ) {
        logger.error('No schemas found. Exiting the app');
        return;
    }
    prompt([
        {
            name: 'select_schema',
            message: 'Select a schema',
            type: 'list',
            choices: () =>
                schemaKeys.map(s => ({
                    name: `${s} (${schemaManager.schemas[s].description})`,
                    value: { ...schemaManager.schemas[s], key: s },
                })),
        },
    ])
        .then(answers => {
            const selectedSchema = answers.select_schema;
            const allUserReplacedValues = {};
            runTasks(
                selectedSchema,
                (task, i) =>
                    new Promise((resolve, reject) => {
                        const commandString =
                            typeof task.command === 'function'
                                ? task.command(allUserReplacedValues)
                                : task.command;
                        logger.log(
                            `(${++i}) Command to run:: ${chalk.cyan(
                                commandString
                            )}`
                        );
                        const placeholders = parseCommand(commandString);
                        if (!placeholders.length) {
                            // If no placeholders are present run the command as it is.
                            return handleCmdExecConfirmation(
                                commandString,
                                resolve,
                                reject
                            );
                        }

                        const questions = getUniqueQuestionsFromPlaceholders(
                            placeholders
                        );
                        prompt(questions).then(placeholderAnswers => {
                            Object.assign(
                                allUserReplacedValues,
                                placeholderAnswers
                            );
                            const command = replacePlaceholders(
                                commandString,
                                placeholders,
                                placeholderAnswers
                            );
                            handleCmdExecConfirmation(command, resolve, reject);
                        });
                    })
            );
        })
        .catch(err => reject(err));
};

const handleCmdExecConfirmation = (command, resolve, reject) => {
    if (args.args && args.args[0] && args.args[0].skip_confirm) {
        return resolve(command);
    }
    prompt([
        {
            name: 'confirm',
            message: `Do you want to run this command: ${chalk.cyan(command)}`,
            type: 'confirm',
        },
    ])
        .then(answers => {
            if (answers.confirm) {
                return resolve(command);
            }
            logger.log(`Skipping the command: ${chalk.cyan(command)}`);
            return resolve(false);
        })
        .catch(err => reject(err));
};

const getUniqueQuestionsFromPlaceholders = placeholders => {
    const visitedKeys = {};
    return placeholders
        .filter(pos =>
            !visitedKeys[pos.text] ? (visitedKeys[pos.text] = true) : false
        )
        .map((pos, i) => ({
            name: pos.text,
            message: `Value for placeholder_${i}:: "${pos.text}": `,
            type: 'input',
            when: i === 0 || !!placeholders[i - 1],
        }));
};

module.exports = {
    startPrompting: start,
};
