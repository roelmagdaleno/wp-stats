const he = require('he');

const fields = {
    active_installs: 'Active Installs',
    author: 'Author',
    downloaded: 'Downloaded',
    last_updated: 'Last Updated',
    name: 'Name',
    num_ratings: '# Ratings',
    rating: 'Rating',
    slug: 'Slug',
    support_threads: 'Support Threads',
    support_threads_resolved: 'Support Threads Resolved',
    version: 'Version'
};

let defaultFields = [
    'name', 'slug', 'version',
    'downloaded', 'active_installs'
];

const numberFormat = (number) => new Intl.NumberFormat().format(number);
const formatField = (field, value) => {
    if (field === 'name') {
        return he.decode(value);
    }

    const numberFields = [
        'active_installs', 'downloaded', 'num_ratings',
        'rating', 'support_threads', 'support_threads_resolved'
    ];

    if (numberFields.includes(field)) {
        return numberFormat(value);
    }

    return value;
};
const withoutNoFields = (noFields) => {
    for ( let i = 0; i < noFields.length; i++ ) {
        let fieldPos = defaultFields.indexOf(noFields[i]);

        if (fieldPos === -1) {
            continue;
        }

        defaultFields.splice(fieldPos, 1);
    }

    return defaultFields;
};
const getTableFields = (flags) => {
    const flagFields = flags.fields;
    const noFields = flags.noFields;

    if (noFields) {
        defaultFields = withoutNoFields(noFields.split(','));
    }

    return flagFields ? defaultFields.concat(flagFields.split(',')) : defaultFields;
};

module.exports = {
    isValidCommand: (input) => {
        if (input.length === 0) {
            return false;
        }

        const validCommands = ['plugin', 'theme'];
        return validCommands.includes(input[0]);
    },
    getTableHead: (flags) => getTableFields(flags).map(field => fields[field]),
    tableData: (plugin, flags) => {
        const tableFields = getTableFields(flags);
        const totalFields = tableFields.length;
        const orderTable = [];

        for ( let i = 0; i < totalFields; i++ ) {
            let field = tableFields[i];

            if (!plugin[field]) {
                continue;
            }

            orderTable.push(formatField(field, plugin[field]));
        }

        return orderTable;
    },
    fields
}
