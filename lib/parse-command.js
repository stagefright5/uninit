const placeholder = /\$\{([^\}]*)\}/g;

/**
 * @param {string} command
 */
const parseCommand = command => {
    const matchedPositions = [];
    let match;
    while ((match = placeholder.exec(command))) {
        matchedPositions.push({ position: match.index, text: match[1] });
    }
    return matchedPositions;
};

const replacePlaceholders = (cmd = '', placeholders, answers) => {
    const reverse = placeholders.sort((p1, p2) => p2.position - p1.position);
    const replacedCmd = reverse.reduce(
        (res, p) =>
            strSplice(res, p.position, p.text.length + 3, answers[p.text]),
        cmd
    );
    return replacedCmd;
};

const strSplice = (str = '', start, deleteCount, replace) =>
    str.slice(0, start) + replace + str.slice(start + deleteCount);

module.exports = {
    parseCommand: parseCommand,
    replacePlaceholders: replacePlaceholders,
};
