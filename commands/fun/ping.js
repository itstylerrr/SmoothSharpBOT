module.exports = {
	name: 'ping',
	description: 'Ping!',
    aliases: ['p'],
	cooldown: 5,
	usage: 'ping',
	category: 'Fun',
	execute(client, message) {
		message.channel.send(`🏓Ping is ${Math.round(client.ws.ping)}ms`);
	},
};