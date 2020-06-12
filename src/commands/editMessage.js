const { Message } = require('../models')
const { isDM } = require('../utils/helper')

/**
 * editMessage
 * @param {String} payload Payload do comando, ou seja, o ID e o recado atualizado
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const editMessage = async (payload, msg) => {
	if (!payload) {
		return false
	}

	if (isDM(msg)) {
		msg.delete()
	}

	const regexId = /(^\d+)/

	if (!regexId.test(payload)) {
		msg.author.send(`:thinking: Não esqueça de passar o ID do recado!`)
	}

	const user = msg.author.username

	const parsePayload = payload.match(regexId)

	if (isNaN(Number(parsePayload[1]))) {
		msg.author.send(`:thinking: O ID do recado é sempre numérico!`)
	}

	const id = parseInt(parsePayload[1])
	const value = payload.replace(`${id} `, '')

	try {
		await Message.update({ value }, { where: { id } })
		msg.author.send(`:thumbsup: Recado editado!`)
	} catch (err) {
		console.log(err)
		msg.author.send(
			`:grimacing: Não consegui editar o recado, ${user}. Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = editMessage
