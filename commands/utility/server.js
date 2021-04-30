module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	usage: 'server',
	execute(client, message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};