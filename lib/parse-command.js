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

module.export = parseCommand;
