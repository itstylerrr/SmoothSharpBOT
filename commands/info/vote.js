const Discord = require('discord.js')

module.exports = {
  name: "vote",
  description: "Gives you all the vote links for SmoothSharp!",
  usage: 'vote',
  aliases: ['vote'],
  cooldown: 5,
  category: 'Info',
  execute(client, message) {
      const voteEmbed = new Discord.MessageEmbed()
      .setTitle('SmoothSharp\'s Voting Websites!')
      .setColor(message.guild.me.displayHexColor)
      message.channel.send(voteEmbed)
  }
}