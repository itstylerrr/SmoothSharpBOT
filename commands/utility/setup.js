module.exports = {
	name: 'setup',
	description: 'Sets up a mod channel for the bot to send logs to. (paired with the mod-channel command)',
	usage: 'setup',
	permissions: 'ADMINISTRATOR',
	execute(client, message) {
		message.channel.send('🚧UNDER CONSTRUCTION🚧');
	},
};