const discord = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "mute",
  description:"Mute someone for a specific duration of time.",
  cooldown: '3',
  args: true,
  usage: 'mute <user>',
  async execute(client, message, args) {
  
  const modchannel = message.mentions.channels.first()
  
  let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
  let modChannel = await client.channels.fetch(modChannelID)
  
  //Check the permissions.
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const notEnoughPermsMessage = new discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Missing permissons for: ${message.member.displayName}`)        
      .setTitle("Error")
      .setDescription("Not enough permissions.");
 
    message.channel.send({embed: notEnoughPermsMessage});
    return;
  }

  //Store the mention of the member.
  const memberMention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  //Check if there is a mention
  if (!memberMention) {
    const invalidMemberMessage = new discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Forgot Mention`)        
      .setTitle("Error")
      .setDescription("Oops seems like you may have forgotten to mention a user.");
        
    message.channel.send({embed: invalidMemberMessage});
    return;
  }
  
  //Check if the member has the permission to punish.
  if (memberMention.hasPermission("MANAGE_MESSAGES")) {
    const canNotPunishMessage = new discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denied: ${message.member.displayName}`)        
      .setTitle("Error")
      .setDescription("I cannot mute this user.");
        
    message.channel.send({embed: canNotPunishMessage});
    return;
  }
  
  //You can't punish your self.
  if (memberMention.id === message.author.id) {
    const canNotPunishYouMessage = new discord.MessageEmbed()
      .setColor("#8b0000")
      .setTimestamp()
      .setFooter(`Denied: ${message.member.displayName}`)        
      .setTitle("Error")
      .setDescription("You cant punish yourself silly goose!");
        
    message.channel.send({embed: canNotPunishYouMessage});
    return;
  }
  
  //Store the default server role, in this case is the "Jugador" role.
  const defaultRole = message.guild.roles.cache.find((x) => x.name === "Verified");
  //Store the role that we want to use to mute in a variable.
  let mutedRole = message.guild.roles.cache.find((role) => role.name === "Muted");
  //Check if the role exist.
  if (!mutedRole) {
    //If it doesn't exists, then create it.
    try {
      //Create it.
      mutedRole = await message.guild.roles.create({
        data: {
          name: "Muted",
          color: "#a57474",
          permissions: [] 
        }
      });

      //Overwrite permissions.
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.updateOverwrite(mutedRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });

    } catch(e) {
      console.log(e);
    }
  }

  const ms = require("ms");
  //The second argument will be the mute time.
  const muteTime = args[1];
  //Check if we have the time argument and return if we don't have it.
  if(!muteTime) {
    let embed = new discord.MessageEmbed()
    .setColor("#8b0000")
    .setTimestamp()
    .setFooter(`Denied: ${message.member.displayName}`)        
    .setTitle("Error")
    .setDescription(`Please specify a valid amount of time using the suffix for days (d),   hours (h), minutes (m) and seconds (s). This command has not been as tested and refined, so it is recommended not to specify such high values.`)
    .addField(`Here is an example of the correct usage: .mute @Elite_Haxy 1d Spam`);
        
    message.channel.send({embed});
    return;
  }

  //Create the reason variable and verify if it is empty.
  let reason = args.slice(2).join(" ");
  if(!reason) {
    reason = "Failure to follow rules and/or a  staff member.";
  }

  //Add the mute role to the member.
  await(memberMention.roles.add(mutedRole.id));
  //Remove the default role to the member, so it doesn't overwrite the permissions.
  await(memberMention.roles.remove(defaultRole.id));

  //Check if the bot can delete the command message.
  if (message.deletable) {
    message.delete();
  }
  
  const sucessMessage = new discord.MessageEmbed()
    .setColor("#ff8c00")
    .setTimestamp()
    .setFooter(`Muted by ${message.member.displayName}`)  
    .setTitle("Mute")
    .addField('Muted:', `${memberMention.user.tag} successfully.`)
    .addField('Tag:', `${memberMention.user.tag}`)
    .addField('ID:', `${memberMention.user.id}`)
    .addField('Reason:', `${reason}`)
    .addField('Duration:', `${muteTime}`);
  
    if(!modChannel) {
      return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
    }

  //Find the log channel in the configuration and send the embed.
    modChannel.send(successMessage).catch(err => {
      return;
    })
  //Set the timeout of the mute using the muteTime and create a function inside the setTimeout function to do some stuff.
  setTimeout(function() {
    //Remove the mute role.
    memberMention.roles.remove(mutedRole.id);
    //Add the default role again.
    memberMention.roles.add(defaultRole.id);

    

    //Create the embed to say that the member is no longer muted.
    const noLongerMutedMessage = new discord.MessageEmbed()
      .setColor("#ff8c00")
      .setFooter(`Mute lifted for ${message.member.displayName}`)  
      .setTitle("Mute lifted")
      .setTimestamp()
      .setDescription(`<@${memberMention.id}> is no longer muted.`);


    if(!modChannel) {
        return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
    }
    //Find the mute log channel and send this embed
    modChannel.send(noLongerMutedMessage).catch(err => {
      return;
    })

  }, ms(muteTime)); //Specify the timeout time.
  
  const target = message.mentions.members.first();
    if(target) {
      target.send(`You were muted in **${message.guild.name}** for **${muteTime}**. Reason: *${reason}*`)
              .catch(() => message.reply("Unable to send message to user."))
              .catch(err => {
                  console.error(err);
      });
    }
  }
}