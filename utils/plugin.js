const Table = require('cli-table3');
const he = require('he');
const { numberFormat } = require('./helpers.js');

module.exports = {
    params: (flags) => {
        const params = {
            action: 'query_plugins',
            request: {
                per_page: 10
            }
        };

        if (flags.author) {
            params.request.author = flags.author;
        }

        return {
            url: 'https://api.wordpress.org/plugins/info/1.2/',
            type: 'plugins',
            params
        };
    },
    renderTable: (response) => {
        const head = [
            'Name', 'Slug', 'Version',
            'Downloaded', 'Active Installs'
        ];

        const table = new Table({
            head,
            style: { head: [], border: [] },
        });

        response.data.plugins.map(plugin => {
            table.push([
                he.decode(plugin.name),
                plugin.slug,
                plugin.version,
                numberFormat(plugin.downloaded),
                numberFormat(plugin.active_installs)
            ]);
        });

        console.log(table.toString());
    }
};
