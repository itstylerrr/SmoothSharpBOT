const Discord = require('discord.js')


module.exports = {
	name: '8ball',
	description: '8ball command, gives you an anwser for your most difficult questions!',
    aliases: ['question', 'anwser', '🎱'],
	cooldown: 5,
	usage: '8ball <question>',
    args: true,
    category: 'Fun',
	execute(client, message, args) {
    const anwsers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
];
        const question = args.join(' ');
        if (!question) return this.sendErrorMessage(message, 0, 'Please provide a question to ask');
        const embed = new Discord.MessageEmbed()
          .setTitle('🎱  The Super Pooper Magic 8-Ball  🎱')
          .addField('Your Question', question)
          .addField('Your Answer', `${anwsers[Math.floor(Math.random() * anwsers.length)]}`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
	},
};