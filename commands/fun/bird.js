const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'bird',
    description: 'Shows you an image of a birdy!',
    aliases: ['birdy', 'bird-pic', '🐦'],
    cooldown: 3,
    usage: 'bird',
    async execute(client, message) {
        const res = await fetch('http://shibe.online/api/birds');
        const img = (await res.json())[0];
        const embed = new Discord.MessageEmbed()
          .setTitle('🐦  Chirp!  🐦')
          .setImage(img)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    }
};