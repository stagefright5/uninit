const chalk = require('chalk');
const strSplice = (str = '', start, deleteCount, replace) =>
    str.slice(0, start) + replace + str.slice(start + deleteCount);
const log = str => console.log(`${chalk.dim('[UNINIT]')}`, str);
const error = str => console.error(`${chalk.red(chalk.dim('[UNINIT]'))}`, str);
module.exports = {
    strSplice: strSplice,
    logger: {
        log,
        error,
    },
};
