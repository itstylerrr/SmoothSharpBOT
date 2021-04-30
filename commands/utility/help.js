const { prefix } = require('../../config.json');
const Discord = require('discord.js')

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands', 'h'],
	usage: '[command name]',
	cooldown: 5,
	execute(client, message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(
				new Discord.MessageEmbed()
				.setTitle('SmoothSharp Help')
				.addField('Commands', commands.map(command => command.name).join(', '))
				.addField(`You can send \`${prefix}help <command name>\` to get extra info on a specific command!`, `This only works in server, you will be left on delivered if you do it here ;)`)
				.setFooter(`SmoothSharp Commands -- Command ran by ${message.author.tag}`)
				.setTimestamp()
				.setColor(message.guild.me.displayHexColor)
			)

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.react('📤');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);


		const embed = new Discord.MessageEmbed()
		.setTitle('Command Information')
		.addField('Command Name:', command.name)
		.addField('Command Aliases:', command.aliases)
		.addField('Command Description:', command.description)
		.addField('Command Usage:', command.usage)
		.setFooter(`SmoothSharp's ${prefix}${command.name} command information -- Command ran by ${message.author.tag}`)
		.setTimestamp()
		.setColor('RANDOM')
		message.channel.send(embed);
	},
};