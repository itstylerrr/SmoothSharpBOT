const Discord = require('discord.js');
const db = require("quick.db")

module.exports = {
  name: 'mod-channel',
  aliases: ['mod', 'setmodchannel', 'smc', 'setmc'],
  description: 'Sets a channel for moderation embeds to go to.',
  cooldown: '5',
  args: true,
  usage: 'mod-channel <channel>',
  execute(client, message, args) {
    const modchannel = message.mentions.channels.first()
      if (!modchannel) {
      return message.channel.send("Oops seems that you may have forgotten to send a valid channel!");
    
    }
    let modchanneldb = db.set(`modchannel_${message.guild.id}`, `${modchannel.id}`)
    
    const successMessage = new Discord.MessageEmbed()
    .setColor("#ff8c00")
    .setTimestamp()
    .setFooter(`Moderation Log channel changed by ${message.member.displayName}`)  
    .setTitle("Moderation Log Channel Change")
    .addField("**Moderation Channel**", `**Changed to ${modchannel}**`);

    if(modchannel){
      message.channel.send(`Set the moderation channel to ${modchannel} successfully.`)
      modchannel.send({embed: successMessage});
    }
  }
}