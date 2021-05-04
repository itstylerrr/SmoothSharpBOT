const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'dog',
    description: 'Shows you an image of a doggy!',
    aliases: ['dogy', 'dog-pic', '🐦'],
    cooldown: 3,
    usage: 'dog',
    category: 'Fun',
    async execute(client, message) {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;
        const embed = new Discord.MessageEmbed()
          .setTitle('🐶  Woof!  🐶')
          .setImage(img)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    }
};