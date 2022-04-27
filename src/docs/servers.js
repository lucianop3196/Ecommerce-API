module.exports = {
	servers: [
		{
			url: process.env.NODE_ENV === 'production' ? `https://ecommerce-pennacchioni.herokuapp.com` : `http://localhost:${process.env.PORT}` ,
			description: 'Local server'
		}
	]
};
