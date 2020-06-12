const Discord = require('discord.js')
const { fetchCurrencyValue } = require('../utils/api')
const { cry } = require('../utils/helper')

const img = {
	EUR: 'https://i.imgur.com/VlUDHKs.png',
	USD: 'https://i.imgur.com/jiZoxa9.png'
}

/**
 * currencyValue
 * @param {String} coins 'USD-BRL' - 'EUR-BRL'
 * @param {String} key 'USD' - 'EUR'
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const currencyValue = async (coins, key, msg) => {
	try {
		const { data } = await fetchCurrencyValue(coins)

		const embed = new Discord.MessageEmbed()
			.setColor('#34d400')
			.setTitle(`**${cry[Math.floor(Math.random() * cry.length)]}**`)
			.setThumbnail(img[key])
			.addField(
				`Valores`,
				`*Compra:* R$ ${data[key].bid}
    *Venda:* R$ ${data[key].ask}
    *Variação:* ${data[key].varBid}
    *% da Variação:* ${data[key].varBid}%
    *Máximo:* R$ ${data[key].high}
    *Mínimo:* R$ ${data[key].low}`
			)

		msg.channel.send(embed)
	} catch (err) {
		console.log(err)
		msg.channel.send(
			`:grimacing: Não consegui pegar os dados, ${user}... Espere um pouquinho e tente novamente.`
		)
	}
}

module.exports = currencyValue
