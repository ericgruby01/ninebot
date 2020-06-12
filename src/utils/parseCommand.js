/**
 * parseCommand
 * @param {Message} msg Objeto da mensagem captada pelo robô
 * @return {Object} { command, payload }
 */
module.exports = msg => {
	const isCommand = /^!\w+/gi.test(msg.content)

	if (!isCommand) {
		return false
	}

	const command = msg.content.match(/^!\w+/)[0].toLowerCase()
	const payload = msg.content.split(/^!\w+\s/)[1]

	return { command, payload }
}
