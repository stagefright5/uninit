#!/usr/bin/env node
const { startPrompting } = require('../lib/prompter');
const { initArgs } = require('../lib/args');

initArgs();
startPrompting();
