module.exports = {
	name: 'user-info',
	description: 'Display info about yourself.',
	usage: 'user-info',
	execute(client, message) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};