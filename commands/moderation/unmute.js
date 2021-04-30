const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "unmute",
  description: "Unmute a muted user.",
  cooldown: '2',
  args: true,
  usage: 'unmute <user>',
  async execute(client, message, args) {
    const modchannel = message.mentions.channels.first()
    let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
    let modChannel = await client.channels.fetch(modChannelID)



    //Check the permissions.
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const noEnoughPermsMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Missing permissons for: ${message.member.displayName}`)        
            .setTitle("Error")
            .setDescription("Not enough permissions.");
 
        message.channel.send({embed: noEnoughPermsMessage});
        return;
    }

    //Store the member mention.
    const memberMention = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    //Check if there is a mention.
    if(!memberMention) {
        const invalidMemberMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denied: ${message.member.displayName}`)        
            .setTitle("Error")
            .setDescription("Mention a valid user.");
        
        message.channel.send({embed: invalidMemberMessage});
        return;
    }

    //Store the muted role in a variable.
    const mutedRole = message.guild.roles.cache.find((r) => r.name === "Muted");
    //Store the default role in a variable.
    const defaultRole = message.guild.roles.cache.find((r) => r.name === "Verified");
    
    //Check if the role exists or if the user has the muted role.
    if(!mutedRole || !memberMention.roles.cache.has(mutedRole.id)) {
        const notMutedMessage = new Discord.MessageEmbed()
            .setColor("#8b0000")
            .setTimestamp()
            .setFooter(`Denied: ${message.member.displayName}`)        
            .setTitle("Error")
            .setDescription("The user is not mentioned.");
        
        message.channel.send({embed: notMutedMessage});
        return;
    }

    //Remove the muted role.
    await memberMention.roles.remove(mutedRole.id);
    //Add the default role again.
    await memberMention.roles.add(defaultRole.id);

    //Create an embed to say that the user is no longer muted.
    const noLongerMutedMessage = new Discord.MessageEmbed()
        .setColor("#ff8c00")
        .setTimestamp()
        .setFooter(`Unmuted by ${message.member.displayName}`)  
        .setTitle("Unmute")
        .addField('Unmuted:', `Muted ${memberMention.user.tag} successfully.`)
        .addField('Tag:', `${memberMention.user.tag}`)
        .addField('ID:', `${memberMention.user.id}`)

    //Send to the log channel.
        if(!modChannel) {
          return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
        }

        modChannel.send(noLongerMutedMessage).catch(err => {
          return;
        })
    //Delete the command.
    message.delete();
    
  const target = message.mentions.members.first();
  if(target) {
    target.send(`You were unmuted in **${message.guild.name}**.`)
            .catch(() => message.reply("Unable to send message to user."))
            .catch(err => {
                console.error(err);
      });
    }
  }
}