module.exports = {
	name: 'beep',
	description: 'Just a testing command!',
	usage: 'beep',
	category: 'Fun',
	execute(client, message) {
		message.channel.send('Boop.');
	},
};