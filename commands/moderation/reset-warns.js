const db = require("quick.db")
const discord = require("discord.js");

module.exports = {
	name: 'reset-warns',
	description: 'Reset a users warnings',
  aliases: ['rw', 'reset-w', 'warn-reset'],
	cooldown: 5,
  usage: 'reset-warns <user>',
    async execute(client, message, args) {
        const memberMention = message.guild.member(message.mentions.users.first())
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("You cannot use this command!")
          }
          
          const user = message.mentions.members.first()
          
          if(!user) {
          return message.channel.send("Please mention the user whose warning(s) you want to reset.")
          }
          
          if(message.mentions.users.first().bot) {
            return message.channel.send("Bots are not allowed to have warnings silly goose!")
          }
      
          if(message.author.id === user.id) {
            return message.channel.send("You are not allowed to reset your own warnings!")
          }
          
          let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
          
          if(warnings === null) {
            return message.channel.send(`${message.mentions.users.first().username} does not have any warnings.`)
          }
          db.delete(`warnings_${message.guild.id}_${user.id}`)
          user.send(`All your warnings were reset by **${message.author.username}** from **${message.guild.name}**.`)
          await message.channel.send(`Reset all warnings of ${message.mentions.users.first().username}.`)
      
          const sucessMessage = new discord.MessageEmbed()
          .setColor("#ff8c00")
          .setTimestamp()
          .setFooter(`Reset warns by ${message.member.displayName}`)  
          .setTitle("Reset Warnings")
          .setDescription(`Reset all warnings' of ${memberMention.user.tag} successfully.`)
          .addField('Tag:', `<@${memberMention.user.id}>`)
          .addField('ID:', `${memberMention.user.id}`)
          //Send the message to the logs channel.
        let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
        let modChannel = await client.channels.fetch(modChannelID)

        if(!modChannel) {
          return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
        }

        modChannel.send(successMessage).catch(err => {
          return;
        })
    }
};