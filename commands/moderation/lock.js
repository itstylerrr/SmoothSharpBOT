const Discord = require('discord.js');
const db = require("quick.db")

module.exports = {
  name: 'lock',
  description: 'Locks specific channels.',
  cooldown: '10',
  usage: 'lock <channel/role>',
  args: true,
  category: 'Moderation',
  async execute(client, message, args) {
  
  const mentionedRole = message.mentions.roles.first() || message.mentions.roles.first();
  const channelmention = args.slice(0).join(" ")
  const lockRole = args.slice(1).join(" ")
  const channel = message.mentions.channels.first()
  const modchannel = message.mentions.channels.first()

  if (!client.lockit) client.lockit = [];
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You cannot use this command!');
    if(!args[1]) return message.channel.send('You did not mention a valid channel and or a valid role');


  let role = mentionedRole 
  
  if (!role) {
    return message.channel.send('Role is not able to be found.');
  }

  channel.updateOverwrite(role, {
      SEND_MESSAGES: false
  }).then(g => {
    message.channel.send(`Locked ${channel.name}.`);
    console.log(`Locked ${g.name} (${g.id})`)
  })
  .catch(err => console.log(err))
  
    let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
    let modChannel = await client.channels.fetch(modChannelID)

    const locksuccessMessage = new Discord.MessageEmbed()
    .setColor("#D60000")
    .setFooter(`Lockdown by ${message.member.displayName}`)  
    .setTitle("Lock")
    .addField('Locked', `${channel} successfully.`)
    .addField('Lock Role', `${lockRole}`);

    if(!modChannel) {
      return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
    }

    modChannel.send(locksuccessMessage).catch(err => {
      return;
    })
  }
}