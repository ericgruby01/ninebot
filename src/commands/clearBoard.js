const { Message } = require("../models");

/**
 * clearBoard
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const clearBoard = async (msg) => {
  if (msg.channel.type !== "dm") {
    msg.delete();
  }

  const channel = msg.channel.guild.name;
  const user = msg.author.username;

  try {
    await Message.destroy({ where: { channel } });
    msg.channel.send(`✨ O mural de "${channel}" foi limpo!`);
  } catch (err) {
    console.log(err)
    msg.channel.send(
      `😬 Não consegui limpar o mural de recados, ${user}. Espere um pouquinho e tente novamente.`
    );
  }
};

module.exports = clearBoard;
