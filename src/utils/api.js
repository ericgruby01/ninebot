const axios = require('axios')
const Tenor = require('tenorjs').client(require('../config/tenor'))
const FormData = require('form-data')

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
const updateNB = nb => {
	const data = new FormData()
	data.append('nb', nb)
	data.append('key', process.env.CONSIG_KEY)
	data.append('consulta_interna', process.env.CONSIG_INTERNAL)
	data.append('original_json', 'true')
	return axios.post(process.env.CONSIG_API, data, {
		headers: data.getHeaders()
	})
}

module.exports = {
	fetchCurrencyValue,
	fetchGif,
	updateNB
}
