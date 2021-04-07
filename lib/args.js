const chalk = require('chalk');
const { ArgumentParser } = require('argparse');
const { version, name } = require('../package.json');

module.exports = () => {
    const argparser = new ArgumentParser({
        description: 'Uninit',
    });

    argparser.add_argument('-v', '--version', {
        action: 'version',
        version: chalk`version: {green ${version}}`,
    });

    argparser.parse_known_args();
};
