const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    description: 'Shows a random meme from the memes, dankmemes, or me_irl subreddits.',
    cooldown: 5,
    usage: 'meme',
    category: 'Fun',
    async execute(client, message, async) {
        let res = await fetch('https://meme-api.herokuapp.com/gimme');
        res = await res.json();
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Subreddit: ${res.title}`)
            .setTitle(`🤣 Meme 🤣`)
            .setImage(res.url)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    },
};