const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "stats",
  description: "Shows you a bunch of useless stats",
  usage: 'stats',
  aliases: ['stat'],
  cooldown: 5,
  category: 'Info',
  async execute(client, message) {

    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;

    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("SmoothSharp's Live Status")
    .addField(" \u200B ", "**Channels** : ` " + `${client.channels.cache.size}` + " `")
    .addField(" \u200B ", "**Servers** : ` " + `${client.guilds.cache.size}` + " `")
    .addField(" \u200B ", "**Users** : ` " + `${client.guilds.cache.reduce((x, guild) => x + guild.memberCount, 0)}` + " `")
    .addField(" \u200B ", "**Command** : ` " + `${message.client.commands.size}\` commands`)
    .addField(" \u200B ", "**Uptime** : ` " + `${days} and ${hours}` + " `")
message.channel.send(exampleEmbed);
  }
}