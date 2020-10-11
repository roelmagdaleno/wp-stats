#!/usr/bin/env node

const cli = require('./utils/cli.js');
const welcome = require('cli-welcome');
const ora = require('ora');
const api = require('./utils/api.js');
const { isValidCommand, getCommand } = require('./utils/helpers.js');

(async () => {
    welcome({
        title: 'wp-stats',
        tagLine: 'by Roel Magdaleno',
        description: cli.pkg.description,
        bold: true,
        clear: true,
        version: cli.pkg.version
    });

    if (!isValidCommand(cli.input)) {
        console.log('You must specify a valid command. Type "wp-stats --help" to see examples.');
        return;
    }

    const command = getCommand(cli.input[0]);
    const spinner = ora(`Loading ${command} data...`);
    spinner.start();

    await api.run(api.params(command, cli.flags)).then((response) => {
        spinner.stop();
        api.renderTable(command, response, cli.flags);
    });
})();
