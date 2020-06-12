const { Message } = require('../models')
const { deleteMessage } = require('../utils/helper')

/**
 * removeMessage
 * @param {String} id Payload do comando, ou seja, o ID do recado
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const removeMessage = async (id, msg) => {
	if (!id) {
		return false
	}

	deleteMessage(msg)

	const user = msg.author.username

	try {
		await Message.destroy({ where: { id } })
		msg.author.send(`:thumbsup: Recado removido!`)
	} catch (err) {
		console.log(err)
		msg.author.send(
			`:grimacing: Não consegui remover o recado, ${user}. Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = removeMessage
