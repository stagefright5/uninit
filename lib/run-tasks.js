const { execSync } = require('child_process');
const runTasks = async (schema, cb) => {
    if (schema.tasks && schema.tasks[Symbol.iterator]) {
        try {
            for (const x of schema.tasks) {
                const cmd = (await cb(x)) || x.command;
                if (cmd) {
                    execSync(x.command);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
};

module.exports = runTasks;
