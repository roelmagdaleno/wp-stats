const meow = require('meow');
const help = ``;
const options = {
    flags: {
        author: {
            type: 'string',
            alias: 'a'
        }
    }
};

module.exports = meow(help, options);
