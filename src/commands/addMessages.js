const { Message } = require('../models')
const { deleteMessage } = require('../utils/helper')

/**
 * addMessages
 * @param {String} payload Payload do comando, ou seja, os recados
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const addMessages = async (payload, msg) => {
	if (!payload) {
		return false
	}

	deleteMessage(msg)

	const channel = msg.channel.guild.name
	const user = msg.author.username

	const create = payload.split(/\n/).reduce((arr, value) => {
		arr.push({ user, channel, value })
		return arr
	}, [])

	try {
		await Message.bulkCreate(create)
		msg.author.send(`:thumbsup: Recados inseridos!`)
	} catch (err) {
		console.log(err)
		msg.author.send(
			`:grimacing: Não consegui inserir os recados, ${user}. Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = addMessages
