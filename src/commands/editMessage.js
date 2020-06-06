const { Message } = require("../models");

/**
 * editMessage
 * @param {String} payload Payload do comando, ou seja, o ID e o recado atualizado
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const editMessage = async (payload, msg) => {
  if (!payload) {
    return false;
  }

  if (msg.channel.type !== "dm") {
    msg.delete();
  }

  const regexId = /(^\d+)/

  if (!regexId.test(payload)) {
    msg.author.send(`🤔 Não esqueça de passar o ID do recado!`);
  }

  const user = msg.author.username;

  const parsePayload = payload.match(regexId);

  const id = parseInt(parsePayload[1]);
  const value = payload.replace(`${id} `, "");

  try {
    await Message.update({ value }, { where: { id } });
    msg.author.send(`👍 Recado editado!`);
  } catch (err) {
    console.log(err)
    msg.author.send(
      `😬 Não consegui editar o recado, ${user}. Espere um pouquinho e tente novamente.`
    );
  }
};

module.exports = editMessage;
