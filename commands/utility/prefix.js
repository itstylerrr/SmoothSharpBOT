const Discord = require('discord.js')
const { prefix } = require('../../config.json')
const db = require('quick.db')
module.exports = {
  name: "prefix",
  description: "Shows you the global and server prefix",
  usage: 'prefix',
  aliases: ['pre'],
  cooldown: '5',
  execute(client, message) {

	let psprefix = db.get(`prefix_${message.guild.id}`)
	if(psprefix === null) psprefix = prefix

      const preEmbed = new Discord.MessageEmbed()
      .setTitle('SmoothSharp\'s Prefix')
      .addField('Your Server\'s Prefix', psprefix)
      .setColor(message.guild.me.displayHexColor)
      message.channel.send(preEmbed)
  }
}