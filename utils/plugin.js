const Table = require('cli-table3');
const {
    getTableHead,
    tableData
} = require('./helpers.js');

module.exports = {
    params: (flags) => {
        const params = {
            action: 'query_plugins',
            request: {
                per_page: flags.perPage,
                fields: {
                    name: true,
                    slug: true,
                    version: true,
                    active_installs: true,
                    downloaded: true
                }
            }
        };

        if (flags.author) {
            params.request.author = flags.author;
        }

        if (flags.slug) {
            params.action = 'plugin_information';
            params.request.slug = flags.slug;
        }

        return {
            url: 'https://api.wordpress.org/plugins/info/1.2/',
            params
        };
    },
    renderTable: (response, flags) => {
        const head = getTableHead(flags);
        const table = new Table({
            head,
            style: { head: [], border: [] },
        });

        let plugins = response.data.plugins ? response.data.plugins : [response.data];
        plugins.map(plugin => table.push(tableData(plugin, flags)));

        console.log(table.toString());
    }
};
