const { fetchGif } = require('../utils/api')

/**
 * addMessage
 * @param {String} keyword Payload do comando, ou seja, o recado
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const gif = async (keyword, msg) => {
	try {
		const response = await fetchGif(keyword)
		msg.channel.send(response[0].url)
	} catch (err) {
		console.log(err)
		msg.channel.send(
			`:grimacing: Não consegui achar um gif bom... Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = gif
