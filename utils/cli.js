const meow = require('meow');
const flags = {
    author: {
        type: 'string',
        alias: 'a'
    },
    slug: {
        type: 'string',
        alias: 's'
    },
    fields: {
        type: 'string',
        alias: 'f'
    },
    per_page: {
        type: 'number',
        default: 10,
        desc: ''
    }
};

const helpText = `
    Usage
        $ wp-stats <command> [options]
        
    Commands
        $ wp-stats plugin [options]
        $ wp-stats theme [options]
        
        The commands can be called in singular or plural.
    
    Options
        --author, -a   Get plugins or themes by author.
        --slug, -s     Get a plugin or theme by slug.
        --fields, -f   Show extra fields in the table separated by commas. Default: name,slug,version,downloaded,active_installs.
        --no-fields    Hide fields in the table separated by commas.
        --per_page     Show total items per page. Default: 10.
        
    Examples
        $ wp-stats plugin --per_page=25
        $ wp-stats plugins --fields=rating,support_threads
        $ wp-stats plugins --no-fields=downloaded,slug
        $ wp-stats plugin --author=rokumetal
        $ wp-stats plugin --slug=wp-countup-js
        
        $ wp-stats theme --per_page=25
        $ wp-stats themes --fields=rating,support_threads
        $ wp-stats themes --no-fields=downloaded,slug
        $ wp-stats theme --author=rokumetal
        $ wp-stats theme --slug=wp-countup-js
`;

module.exports = meow(helpText, { flags });
