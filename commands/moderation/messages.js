module.exports = {
	name: 'messages',
	description: 'Just a testing command!',
	usage: 'messages',
	category: 'Moderation',
	execute(client, message) {
		message.channel.send('1')
        message.channel.send('2')
        message.channel.send('3')
        message.channel.send('4')
        message.channel.send('5')
        message.channel.send('6')
        message.channel.send('7')
        message.channel.send('8')
        message.channel.send('9')
        message.channel.send('10')
	},
};