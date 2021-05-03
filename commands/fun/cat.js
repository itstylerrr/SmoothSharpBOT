const Discord = require('discord.js')
const fetch = require('node-fetch')
const { catApi } = require('../../config.json')

module.exports = {
    name: 'cat',
    description: 'Shows you an image of a little kitty cat!',
    aliases: ['cat', 'cat-pic', '🐱'],
    cooldown: 3,
    usage: 'cat',
    async execute(client, message) {
        const apiKey = catApi;
        const res = await fetch('https://api.thecatapi.com/v1/images/search', { headers: { 'x-api-key': apiKey }});
        const img = (await res.json())[0].url;

        const embed = new Discord.MessageEmbed()
        .setTitle('🐱  Meow!  🐱')
        .setImage(img)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
};