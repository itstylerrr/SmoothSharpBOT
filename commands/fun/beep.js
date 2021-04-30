module.exports = {
	name: 'beep',
	description: 'Just a testing command!',
	usage: 'beep',
	execute(client, message) {
		message.channel.send('Boop.');
	},
};