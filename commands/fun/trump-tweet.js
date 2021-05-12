const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'trump-tweet',
    aliases: ['tt', 'trumptweet', 'tweet'],
	description: 'Sends an image that looks like a trump tweet!',
	usage: 'trump-tweet <message>',
	category: 'Fun',
    args: true,
	async execute(client, message, args) {
        message.delete()
        let tweet = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        if (tweet.length > 68) tweet = tweet.slice(0, 65) + '...';
    
        try {
          const res = await fetch('https://nekobot.xyz/api/imagegen?type=trumptweet&text=' + tweet);
          const img = (await res.json()).message;
          const embed = new MessageEmbed()
            .setTitle(':flag_us:  Trump Tweet  :flag_us: ')
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
          message.channel.send(embed);
        } catch (err) {
            console.log('Tweet Error:', err)
        }
	},
};