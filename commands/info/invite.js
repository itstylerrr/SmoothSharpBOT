const Discord = require('discord.js')
const { prefix } = require('../../config.json')
const db = require('quick.db')
module.exports = {
  name: "invite",
  description: "Sends you the invite link for SmoothSharp",
  usage: 'invite',
  aliases: ['inv'],
  category: 'Info',
  execute(client, message) {
    const user = message.author
    message.channel.send('Here is the link to invite me! \n \n https://discord.com/api/oauth2/authorize?client_id=836362818047049778&permissions=2088234358&scope=bot')
    user.send('Here is the link to invite me! \n \n https://discord.com/api/oauth2/authorize?client_id=836362818047049778&permissions=2088234358&scope=bot')
  }
}