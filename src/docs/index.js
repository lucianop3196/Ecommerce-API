const generalInfo = require('./generalInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const products = require('./products');

module.exports = {
	...generalInfo,
	...servers,
	...tags,
	...components,
	...products
};
