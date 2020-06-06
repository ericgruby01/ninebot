const { Message } = require("../models");

/**
 * addMessage
 * @param {String} value Payload do comando, ou seja, o recado
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const addMessage = async (value, msg) => {
  if (!value) {
    return false;
  }

  if (msg.channel.type !== "dm") {
    msg.delete();
  }

  const channel = msg.channel.guild.name;
  const user = msg.author.username;

  try {
    await Message.create({ user, channel, value });
    msg.author.send(`👍 Recado inserido!`);
  } catch (err) {
    console.log(err);
    msg.author.send(
      `😬 Não consegui inserir o recado, ${user}. Espere um pouquinho e tente novamente.`
    );
  }
};

module.exports = addMessage;
