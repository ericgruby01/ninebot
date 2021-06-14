const API = require('../utils/api')
const { validateCPF, validateNB, isConsigServer } = require('../utils/helper')
const day = require('dayjs')

/**
 * updateNB
 * @param {String} nb Payload do comando, ou seja, o número de benefício
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const updateNB = async (nb, msg) => {
	if (!isConsigServer(msg)) {
		return false
	}

	if (validateCPF(nb)) {
		return msg.channel.send(
			`:thinking: Parece que o número ${nb} trata-se, na verdade, de um CPF.`
		)
	}

	if (!validateNB(nb)) {
		return msg.channel.send(
			`:thinking: Parece que o número ${nb} não é um benefício válido.`
		)
	}

	try {
		const { data } = await API.updateNB(nb.padStart(10, '0'))
		if (data.status === 0) {
			return msg.channel.send(`NB: ${nb} ❌ ${data.mensagem}`)
		}
		if (data.mensagem.data_atualizacao) {
			return msg.channel.send(
				`NB: ${nb} ✅ Atualizado em ${day(
					data.mensagem.data_atualizacao,
					'YYYY-MM-DD'
				).format('DD/MM/YYYY')}`
			)
		}
		return msg.channel.send(`NB: ${nb} ✅ Atualizado!`)
	} catch (err) {
		console.log(err)
		return msg.channel.send(
			`:grimacing: Deu algum erro interno, ${user}. Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = updateNB
