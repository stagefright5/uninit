const placeholder = /\${([^}]+)}/g;

Object.defineProperty(String.prototype, 'last', {
    get: function () {
        return this[this.length - 1];
    },
});

/**
 * @param {string} command
 */
const parseCommand = command =>
    getMatchPositions(command, command.match(placeholder));

const getMatchPositions = regexMatches => {
    const matchedPositions = [];
    if (Array.isArray(regexMatches)) {
        for (let i = 1; i < matchedPositions.length; i++) {
            // get matching char index by cumulatively adding the matched group length
            const position =
                regexMatches[i].length +
                (i === 1 ? 0 : 1) +
                (matchedPositions.last || 0);
            matchedPositions.push({ position, text: matchedPositions[i] });
        }
    }
    return matchedPositions;
};

module.export = parseCommand;
