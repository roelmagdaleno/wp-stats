const meow = require('meow');
const help = ``;
const options = {
    flags: {
        author: {
            type: 'string',
            alias: 'a'
        },
        slug: {
            type: 'string',
            alias: 's'
        },
        per_page: {
            type: 'number',
            default: 10
        },
        fields: {
            type: 'string',
            alias: 'f'
        }
    }
};

module.exports = meow(help, options);
