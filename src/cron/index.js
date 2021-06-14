const Discord = require('discord.js')
const cron = require('node-cron');
const cronTime = require('cron-time-generator');
const day = require('dayjs')

const verificaAniversario = require('../utils/verificaAniversarios')

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const defaultCronConfig = {
    scheduled: false,
    timezone: "America/Sao_Paulo"
}

module.exports = client => {
    // Servidor: 9worphi dev | Categoria: Dev | Canal: geral
    const DEV_CHANNEL = client.channels.cache.get(process.env.DEV_CHANNEL)

    // Servidor: 𝙣𝙞𝙣𝙚𝙬𝙤𝙧𝙥𝙝𝙞 | Categoria: Canais de Texto | Canal: geral
    const NINEWORPHI_CHANNEL = client.channels.cache.get(process.env.NINEWORPHI_CHANNEL)

    /**
     * CRON de Relatórios Diários
     * Todos os dias da semana às 16h45
     */
    const CRON_RELATORIO = cron.schedule(cronTime.everyWeekDayAt(16, 45), () => {
        const responseCronRelatorio = new Discord.MessageEmbed()
            .setColor('#dd2e44')
            .setTitle(`:alarm_clock: Lembrete do Relatório Diário`)
            .setDescription('Chegou a hora de se espreguiçar na cadeira e começar a lembrar do que fez no dia. Bora, meu povo! :wink:')
            
        DEV_CHANNEL.send(responseCronRelatorio)
    }, defaultCronConfig);

    /**
     * CRON de Aniversários
     * Todos os dias às 08h00
     */
    const CRON_ANIVERSARIOS = cron.schedule(cronTime.everyDayAt(8, 0), () => {

        const temAniversario = verificaAniversario(day().format('DD/MM'))

        if (!temAniversario) {
            return false
        }

        const responseCronAniversario = new Discord.MessageEmbed()
            .setColor('#ffac33')
            .setTitle(`:birthday: ${day().format("DD/MM")} - Hoje tem Bolo`)
            .setDescription(temAniversario)

        NINEWORPHI_CHANNEL.send(responseCronAniversario)
    }, defaultCronConfig);

    return [CRON_RELATORIO, CRON_ANIVERSARIOS]
}