const Discord = require('discord.js');
const db = require("quick.db")

module.exports = {
  name: 'clear-mod-channel',
  aliases: ['clear-mod', 'clearmodchannel', 'cmc', 'clearmc'],
  //oh. then we need to fix code. cause rn it relies on dmod logs  WHAT did u readidk im not reading anything rn
  //we will need to say if the user as set no mod channel, then do etc. so we can module.export a variable from this file.
  //so module.exports the clear varibale.#65db7b
  //in set mc code: if mod channel, send to mc
  //else return embed in current channeland delete atfer x amount of time.
  //like it?
  //you can do it, just made it alot more complecated . okay whats ur plan
  description: 'Clears moderation the moderation channel.',
  cooldown: '5',
  usage: 'clear-mod-channel',
  category: 'Moderation',
  permissions: 'ADMINSISTRATOR',
  async execute(client, message, args) {

  }
}