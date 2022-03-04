const Discord = require("discord.js");
const util = require("../../util");
const { ping } = require("minecraft-protocol");

module.exports = {
  args: true,
  name: "checkip",
  aliases: ["checkserverip"],
  description: "Checks if an Aternos-IP is free to use.",
  
  async execute(message, args, client) {
    let ip = args[0].match(/^(\w+)(?:\.aternos\.me)?$/i);
    if (!ip) {
        await message.reply(`\`${args}\` is not a valid Aternos server IP or name.`);
        return;
    }
    ip = ip[1];

    const embed = new Discord.MessageEmbed()
    const test = await ping({ host: `${ip}.aternos.me` });
    if(removeColorsFromString(test.description.match(/(Server not found)/gi))){
        embed.setDescription(`${ip}.aternos.me is free to use!`)
        embed.setColor(util.color.green)
    } else {
        embed.setDescription(`It seems a server with the IP ${ip}.aternos.me already exists!`)
        embed.setColor(util.color.green)
    }

    await message.reply({ embeds: [embed] });
  },
};