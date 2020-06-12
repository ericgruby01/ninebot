const { Message } = require('../models')
const { isDM } = require('../utils/helper')

/**
 * clearBoard
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const clearBoard = async msg => {
	const user = msg.author.username

	if (isDM(msg)) {
		msg.author.send(
			`:grimacing: Não é possível limpar um mural por DM, ${user}. Vá até um canal e digite o comando novamente.`
		)
	}

	const channel = msg.channel.guild.name

	try {
		await Message.destroy({ where: { channel } })
		msg.channel.send(`✨ O mural de "${channel}" foi limpo!`)
	} catch (err) {
		console.log(err)
		msg.channel.send(
			`:grimacing: Não consegui limpar o mural de recados, ${user}. Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = clearBoard
