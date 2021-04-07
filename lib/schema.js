// const { schemas: SampleSchema } = require('../example-schemas/schemas.json');
const { readFileSync } = require('fs');
const { logger } = require('./utils');
const schemas = {};

const loadSchemaConfig = path => {
    try {
        if (path.endsWith('.json')) {
            const jsonFile = JSON.parse(
                readFileSync(path, { encoding: 'utf-8' })
            );
            Object.assign(schemas, jsonFile.schemas);
        }
    } catch (e) {
        logger.error(e);
        process.exit(0);
    }
};

const addSchema = (key, schema) => {
    schemas[s] = schema;
};

const getSchemaByKey = key => schemas[key];

module.exports = {
    loadSchemaConfig: loadSchemaConfig,
    get schemas() {
        return schemas;
    },
    add: addSchema,
    getSchemaByKey: getSchemaByKey,
};
