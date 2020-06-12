if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

module.exports = {
	Key: process.env.TENOR_API_KEY,
	Filter: 'high',
	Locale: 'pt_BR',
	MediaFilter: 'basic',
	DateFormat: 'DD/MM/YYYY HH:mm:ss'
}
