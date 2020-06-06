const Discord = require("discord.js");
const { Message } = require("../models");

/**
 * showBoard
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const showBoard = async (msg) => {
  try {
    const allMessages = await Message.findAll({
      where: {
        channel: msg.channel.guild.name,
      },
      raw: true,
      order: [["createdAt", "DESC"]],
    });

    const response = new Discord.MessageEmbed()
      .setColor("#f49632")
      .setTitle("Mural de Recados")
      .setDescription("Confira os recadinhos da equipe")
      .setThumbnail("https://i.imgur.com/8nI0p9A.png");

    if (allMessages.length === 0) {
      response.addField("Tudo limpo", ":sparkles: Nenhum recado no mural.");
    } else {
      allMessages.forEach(({ id, value, user }) =>
        response.addFields({ name: `**${id} » ${user} disse:**`, value })
      );
    }

    response.setTimestamp().setFooter("Obrigado pela atenção!");
    return msg.channel.send(response);
  } catch (err) {
    console.log(err);
    msg.author.send(
      `😬 Não consegui trazer o mural, ${user}. Espere um pouquinho e tente novamente.`
    );
  }
};

module.exports = showBoard;
