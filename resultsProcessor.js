//Allows for multiple test result reporters e.g. HTML and XML

module.exports = function() {
    require('./node_modules/jest-html-reporter').apply(this, arguments);
    return require('./node_modules/jest-junit-reporter').apply(this, arguments);
};
