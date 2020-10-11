const axios = require('axios');
const qs = require('qs');
const plugin = require('./plugin.js');
const theme = require('./theme.js');

module.exports = {
    plugin,
    theme,
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
