const Discord = require('discord.js')
const { deleteMessage } = require('../utils/helper')
const birthdays = require('../utils/birthdays.json')
const day = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
require('dayjs/locale/pt-br')

day.locale('pt-br')
day.extend(customParseFormat)

/**
 * birthdays
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const birthdays = msg => {
	deleteMessage(msg)

	const currentDate = day().format('DD/MM')
	const dates = Object.values(birthdays)
	const names = Object.keys(birthdays)
	const months = Object.values(birthdays)
		.reduce((arr, date) => {
			arr.push(day(date, 'DD/MM').format('MMMM'))
			return arr
		}, [])
		.filter((v, i, a) => a.indexOf(v) === i)
		.sort((a, b) => new Date(day(a, 'MMMM')) - new Date(day(b, 'MMMM')))
		.reduce((obj, month) => {
			obj[month] = dates
				.filter(date => day(date, 'DD/MM').format('MMMM') === month)
				.sort((a, b) => new Date(day(a, 'DD/MM')) - new Date(day(b, 'DD/MM')))
				.reduce((innerObj, date) => {
					innerObj[date] = names[dates.findIndex(d => d === date)]
					return innerObj
				}, {})
			return obj
		}, {})

	const response = new Discord.MessageEmbed()
		.setColor('#43bead')
		.setTitle('Mural de Aniversários')
		.setDescription('Descubra se hoje é dia de dar parabéns ao coleguinha.')
		.setThumbnail('https://i.imgur.com/VNnpQkQ.png')

	Object.keys(months).map(month => {
		const monthDates = months[month]
		const innerDates = Object.keys(monthDates)
		const innerNames = Object.values(monthDates)
		const content = innerDates.reduce((string, date, i) => {
			if (date === currentDate) {
				string += `**${date} - FELIZ ANIVERSÁRIO, ${innerNames[i].toUpperCase()}!!! :birthday::confetti_ball::tada:**${i === innerDates.length ? '' : '\n'}`
			} else {
				string += `${date} - ${innerNames[i]}${i === innerDates.length ? '' : '\n'}`
			}
			return string
		}, '')
		response.addField(`**${month}**`, content)
	})

	msg.channel.send(response)
}

module.exports = birthdays
