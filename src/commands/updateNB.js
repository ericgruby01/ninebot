const API = require("../utils/api");
const { validateCPF, validateNB } = require("../utils/helper");

/**
 * updateNB
 * @param {String} nb Payload do comando, ou seja, o número de benefício
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const updateNB = async (nb, msg) => {
  if (process.env.CONSIG_SERVER !== msg.channel.guild.id) {
    return false;
  }

  if (validateCPF(nb)) {
    return msg.channel.send(
      `Parece que o número ${nb} trata-se, na verdade, de um CPF 🤔`
    );
  }

  if (!validateNB(nb)) {
    return msg.channel.send(
      `Parece que o número ${nb} não é um benefício válido 🤔`
    );
  }

  try {
    const { data } = await API.updateNB(nb.padStart(10, "0"));
    if (data.status === 0) {
      return msg.channel.send(`NB: ${nb} ❌ ${data.mensagem}`);
    }
    return msg.channel.send(`NB: ${nb} ✅ ${data.mensagem}`);
  } catch (err) {
    console.log(err);
    return msg.channel.send(
      `😬 Deu algum erro interno, ${user}. Espere um pouquinho e tente novamente.`
    );
  }
};

module.exports = updateNB;
