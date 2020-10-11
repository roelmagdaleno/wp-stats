module.exports = {
    isValidCommand: (input) => {
        if (input.length === 0) {
            return false;
        }

        const validCommands = ['plugin', 'theme'];
        return validCommands.includes(input[0]);
    },
    numberFormat: (number) => new Intl.NumberFormat().format(number)
}
