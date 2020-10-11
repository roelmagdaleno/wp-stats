const axios = require('axios');
const qs = require('qs');
const Table = require('cli-table3');
const {
    getTableHead,
    tableData
} = require('./helpers.js');

module.exports = {
    params: (type, flags) => {
        const params = {
            action: `query_${type}`,
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
            params.action = `${type.slice(0, -1)}_information`;
            params.request.slug = flags.slug;
        }

        return {
            url: `https://api.wordpress.org/${type}/info/1.2/`,
            params
        };
    },
    renderTable: (command, response, flags) => {
        const head = getTableHead(flags);
        const table = new Table({
            head,
            style: { head: [], border: [] },
        });

        let items = response.data[command] ? response.data[command] : [response.data];
        items.map(item => table.push(tableData(item, flags)));

        console.log(table.toString());
    },
    /**
     * WordPress API requests need to pass a query string called
     * "request" as an array, for example: "request[author]", etc.
     *
     * So we need to serialize the params to achieve that otherwise
     * the request won't work.
     *
     * @since  1.0.0
     * @link   https://github.com/axios/axios/issues/1093#issuecomment-331229528
     *
     * @param  {object}   api   The current API data.
     * @return {Promise<AxiosResponse<any>>}
     */
    run: async (api) => await axios.get(api.url, {
        params: api.params,
        paramsSerializer: (params) => qs.stringify(params, { encode: false })
    })
};
