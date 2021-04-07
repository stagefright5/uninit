const { parseCommand, replacePlaceholders } = require('../lib/parse-command');
const cmd =
    'git commit -m ${commit_message} ${commit_message} ${commit_message2}';
const ms = parseCommand(cmd);
console.log(ms);

const replacedCommand = replacePlaceholders(cmd, ms, {
    commit_message: 'abc',
    commit_message2: 'cdef',
});

console.log(replacedCommand);
