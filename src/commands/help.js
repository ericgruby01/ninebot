const Discord = require("discord.js");

/**
 * help
 * @param {Message} msg Objeto da mensagem captada pelo robô
 */
const help = (msg) => {
  if (msg.channel.type !== "dm") {
    msg.delete();
  }

  const response = new Discord.MessageEmbed()
    .setColor("#f49632")
    .setTitle("Precisa de ajuda?")
    .setDescription("Descubra o que eu posso fazer por você.")
    .setThumbnail("https://i.imgur.com/vCzjtTD.png");

  if (process.env.CONSIG_SERVER === msg.channel.guild.id) {
    response.addField(
      "**Insere um NB na lista de atualização**",
      "🔺 » **!atualizaNB nb**"
    );
  }

  response.addField("**Mostro a cotação do euro**", ":euro: » **!euro**");
  response.addField("**Mostro a cotação do dólar**", ":dollar: » **!dolar**");
  response.addField(
    "**Adiciono seu recado no mural**",
    "**☑ » !addRecado recado aqui**"
  );
  response.addField(
    "**Adiciono vários recados ao mesmo tempo**",
    "**!addRecados\nrecado 1\nrecado 2\nrecado 3**"
  );
  response.addField(
    "**Edito um recado do mural**",
    "**:pencil: » !editRecado id_aqui edição aqui**"
  );
  response.addField(
    "**Removo um recado do mural**",
    "**❌ » !removerRecado id_aqui**"
  );
  response.addField("**Mostro o mural**", "**:clipboard: » !mural**");
  response.addField(
    "**Removo todos os recados do mural**",
    "**:sparkles: » !limparMural**"
  );
  response.addField(
    "**Procuro e mando um gif simpático no canal**",
    "**🎞️  » !bomdia » !boatarde » !boanoite**"
  );
  response.setTimestamp();

  msg.author.send(response);
};

module.exports = help;
