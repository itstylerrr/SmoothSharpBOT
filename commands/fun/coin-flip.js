const Discord = require('discord.js')

module.exports = {
	name: 'coin-flip',
	description: 'Flips a coin!',
    aliases: ['cf', 'flip', '50/50', 'coinflip'],
	cooldown: 3,
	usage: 'coin-flip',
	execute(client, message) {
        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'heads';
        else result = 'tails';
        const embed = new Discord.MessageEmbed()
          .setTitle('½  Coinflip  ½')
          .setDescription(`I flipped a coin for you, ${message.member}. It was **${result}**!`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
	},
};