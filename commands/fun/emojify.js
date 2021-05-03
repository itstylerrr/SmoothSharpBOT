const Discord = require('discord.js')

module.exports = {
	name: 'emojify',
	description: 'Swaps ever letter inside of your message, with an emoji!',
    aliases: ['sayemoji'],
	cooldown: 5,
	usage: 'emojify <message>',
    args: true,
	execute(client, message, args) {
        const numberMap = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
          };

          if (!args[0]) return this.sendErrorMessage(message, 0, 'Please provide a message to emojify');
          let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
          msg = msg.split('').map(c => {
            if (c === ' ') return c;
            else if (/[0-9]/.test(c)) return numberMap[c];
            else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
          }).join('');
      
          if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033)); 
            msg = msg.slice(0, msg.lastIndexOf(':')) + '**...**';
          }
      
          const embed = new Discord.MessageEmbed()
            .setTitle('😊 Emojify 😊')
            .setDescription(msg)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
          message.channel.send(embed);

	},
};