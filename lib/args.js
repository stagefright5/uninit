const chalk = require('chalk');
const { ArgumentParser, Action, OPTIONAL } = require('argparse');
const { version } = require('../package.json');
const { loadSchemaConfig } = require('./schema');

let args = {};

const init = () => {
    const argparser = new ArgumentParser({
        description: 'Uninit',
    });

    argparser.add_argument('-v', '--version', {
        action: 'version',
        version: chalk`version: {green ${version}}`,
    });

    argparser.add_argument('-s', '--skip-confirm', {
        type: Boolean,
    });

    argparser.add_argument('-l', '--load-schema', {
        action: SchemaLoadAction,
    });

    args = argparser.parse_known_args();
};

class SchemaLoadAction extends Action {
    call(parser, namespace, values, optionString) {
        loadSchemaConfig(values);
    }
}

module.exports = {
    initArgs: init,
    get args() {
        return args;
    },
};
