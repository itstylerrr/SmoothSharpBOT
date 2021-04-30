const db = require("quick.db")
const discord = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warn a user that doesn't listen or breaks any rule.",
  cooldown: 5,
  args: true,
  usage: 'warn <user> <reason>',
  async execute(client, message, args) {
  const memberMention = message.guild.member(message.mentions.users.first())
   if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("You cannot use this command!")
    }
    
    const user = message.guild.member(message.mentions.users.first())
    
    if(!user) {
      return message.channel.send("Please mention the person to who you want to warn. Example: `.warn <@mention> <reason>`")
    }

    if(message.mentions.users.first().bot) {
      return message.channel.send("You can not warn bots silly goose! They are my famiy and I won't let ya c:")
    }

    if(message.author.id === user.id) {
      return message.channel.send("You can not warn yourself silly goose!")
    }

    if(user.id === '756289468285190294') {
      return message.channel.send("You cannot warn the owner.")
    }
    if(user.id === '557582369897316352') {
      return message.channel.send("You cannot warn the owner.")
    }

    const reason = args.slice(1).join(" ")

    if(!reason) {
      return message.channel.send("Please provide reason to warn - `warn @mention <reason>`")
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`) // fetch the warnings guild user data

    let reasonsdb = db.set(`reasons_${message.guild.id}_${user.id}`, `${reason}`)
    
      if (!warnings || warnings === null) {
        warnings = db.set(`warnings_${message.guild.id}_${user.id}`, []) // you create the array if it does not exists
      }

    const content = warnings.join('\n')
    const counter = warnings.length
    
    db.push(`warnings_${message.guild.id}_${user.id}`, `${content}`) 

    if(warnings === 5) {
      return message.channel.send(`${message.mentions.users.first().username} Mentioned user has already reached their limit of 5 warnings`)
    }

    if(warnings === null) {
      user.send(`You have been warned in **${message.guild.name}** for ${reason}.`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    }

    else if(warnings !== null) {
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    }
    
    
    const sucessMessage = new discord.MessageEmbed()
    .setColor("#ff8c00")
    .setTimestamp()
    .setFooter(`Warned by ${message.member.displayName}`)  
    .setTitle("Warn")
    .addField('Warned:', `${memberMention.user.tag} successfully.`)
    .addField('Tag:', `<@${memberMention.user.id}>`)
    .addField('ID:', `${memberMention.user.id}`)
    .addField('Reason:', `${reason}`)
    //Send the message to the logs channel.

    let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
    let modChannel = await client.channels.fetch(modChannelID);

        if(!modChannel) {
          return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
        }

        modChannel.send(successMessage).catch(err => {
          return;
        })
  }
}

