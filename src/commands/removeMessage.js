const { Message } = require("../models");

/**
 * removeMessage
 * @param {String} id Payload do comando, ou seja, o ID do recado
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const removeMessage = async (id, msg) => {
  if (!id) {
    return false;
  }

  if (msg.channel.type !== "dm") {
    msg.delete();
  }

  const user = msg.author.username;

  try {
    await Message.destroy({ where: { id } });
    msg.author.send(`👍 Recado removido!`);
  } catch (err) {
    console.log(err)
    msg.author.send(
      `😬 Não consegui remover o recado, ${user}. Espere um pouquinho e tente novamente.`
    );
  }
};

module.exports = removeMessage;
