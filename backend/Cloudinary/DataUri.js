const DatauriParser = require('datauri/parser');
const path = require('path');

const parser = new DatauriParser();

const getDataUri = (fileBuffer, extName) => {
    return parser.format(extName, fileBuffer).content;
};

module.exports = getDataUri;
