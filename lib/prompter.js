const inquirer = require('inquirer');
const runTasks = require('./run-tasks');
const { parseCommand, replacePlaceholders } = require('./parse-command');
const schemaManager = require('./schema');
const { logger } = require('./utils');
const prompt = inquirer.createPromptModule();
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
    ]).then(answers => {
        const selectedSchema = answers.select_schema;
        runTasks(
            selectedSchema,
            task =>
                new Promise((resolve, reject) => {
                    const placeholders = parseCommand(task.command);
                    if (!placeholders.length) {
                        return resolve(task.command);
                    }
                    const questions = getUniqueQuestionsFromPlaceholders(
                        placeholders
                    );
                    prompt(questions)
                        .then(placeholderAnswers => {
                            const command = replacePlaceholders(
                                task.command,
                                placeholders,
                                placeholderAnswers
                            );
                            resolve(command);
                        })
                        .catch(err => reject(err));
                })
        );
    });
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
