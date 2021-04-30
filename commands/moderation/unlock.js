const Discord = require('discord.js');
const db = require("quick.db")

module.exports = {
  name: 'unlock',
  description: 'Unlocks previously locked channels.',
  cooldown: '3',
  args: true,
  usage: 'unlock <channel/role>',
  async execute(client, message, args) {
  
  const mentionedRole = message.mentions.roles.first() || message.mentions.roles.first();
  const channelmention = args.slice(0).join(" ")
  const unlockRole = args.slice(1).join(" ")
  const channel = message.mentions.channels.first()
  const modchannel = message.mentions.channels.first()

  if (!client.lockit) client.lockit = [];
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You cannot use this command!');
    if(!args[0] || !args[1]) return message.channel.send('You did not mention a valid channel and or a valid role');


  let role = mentionedRole 
  
  if (!role) {
    return message.channel.send('Role is not able to be found.');
  }

  channel.updateOverwrite(role, {
      SEND_MESSAGES: true
  }).then(g => {
    message.channel.send(`Unlocked ${channel.name}.`);
    console.log(`Unlocked ${g.name} (${g.id})`)
  })
  .catch(err => console.log(err))
  
    let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
    let modChannel = await client.channels.fetch(modChannelID)

    const unlocksuccessMessage = new Discord.MessageEmbed()
    .setColor("#D60000")
    .setFooter(`Lockdown Lifted by ${message.member.displayName}`)  
    .setTitle("Unlock")
    .addField('Unlocked', `${channel} successfully.`)
    .addField('Locked Role', `${unlockRole}`);

        if(!modChannel) {
          return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
        }

        modChannel.send(unlocksuccessMessage).catch(err => {
          return;
        })
  }
}