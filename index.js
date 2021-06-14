if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const parseCommand = require('./src/utils/parseCommand')
const commands = require('./src/commands')

const cronjobs = require('./src/cron')

const Discord = require('discord.js')
const client = new Discord.Client()

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
    cronjobs(client).map(cron => cron.start())
});

client.on('message', async msg => {
	const { command, payload } = parseCommand(msg)

	if (!command) {
		return false
	}

	switch (command) {
		case "!addrecado":
		  return await commands.addMessage(payload, msg);
		case "!addrecados":
		  return await commands.addMessages(payload, msg);
		case "!editarrecado":
		  return await commands.editMessage(payload, msg);
		case "!removerrecado":
		  return await commands.removeMessage(payload, msg);
		case "!mural":
		  return await commands.showBoard(msg);
		case "!limparmural":
		  return await commands.clearBoard(msg);
		case "!atualizarnb":
		  return await commands.updateNB(payload, msg);
		case "!euro":
		  return await commands.currencyValue('EUR-BRL', 'EUR', msg);
		case "!dolar":
		  return await commands.currencyValue('USD-BRL', 'USD', msg);
		case "!bomdia":
		  return await commands.gif("bom dia", msg);
		case "!boatarde":
		  return await commands.gif("boa tarde", msg);
		case "!boanoite":
		  return await commands.gif("boa noite", msg);
		case "!help":
		  return commands.help(msg);
		case '!aniversarios':
			return commands.birthdays(msg, client)
		default:
			return false
	}
})
