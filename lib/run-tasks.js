const { execSync } = require('child_process');
const runTasks = schema => {
    const cwd = process.cwd();
    if (schema.tasks && schema.tasks[Symbol.iterator]) {
        for (const x of schema.tasks) {
            execSync(x.command);
        }
    }
};
