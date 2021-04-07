const chalk = require('chalk');
const { ArgumentParser, Action } = require('argparse');
const { version } = require('../package.json');
const { loadSchemaConfig } = require('./schema');

const init = () => {
    const argparser = new ArgumentParser({
        description: 'Uninit',
    });

    argparser.add_argument('-v', '--version', {
        action: 'version',
        version: chalk`version: {green ${version}}`,
    });

    argparser.add_argument('-s', '--schema', {
        action: SchemaLoadAction,
    });

    argparser.parse_known_args();
};

class SchemaLoadAction extends Action {
    call(parser, namespace, values, optionString) {
        loadSchemaConfig(values);
    }
}

module.exports = {
    initArgs: init,
};
