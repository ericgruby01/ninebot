const axios = require('axios')
const Tenor = require('tenorjs').client(require('../config/tenor'))

/**
 * fetchCurrencyValue
 * @param {String} coins 'EUR-BRL' - 'USD-BRL'
 */
const fetchCurrencyValue = (coins = 'EUR-BRL') =>
	axios.get(`https://economia.awesomeapi.com.br/json/all/${coins}`)

/**
 * fetchGif
 * @param {String} keyword Palavra-chave para buscar o gif
 */
const fetchGif = keyword => Tenor.Search.Random(keyword, '1')

/**
 * updateNB
 * @param {String} nb Número de benefício
 */
const updateNB = nb =>
	axios.post(process.env.CONSIG_API, {
		nb,
		key: process.env.CONSIG_KEY,
		consulta_interna: process.env.CONSIG_INTERNAL,
		original_json: 'true'
	})

module.exports = {
	fetchCurrencyValue,
	fetchGif,
	updateNB
}
