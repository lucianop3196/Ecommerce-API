const products = require('./products/schema')

module.exports = {
	components: {
		schemas: {
			...products
		}
	}
};
