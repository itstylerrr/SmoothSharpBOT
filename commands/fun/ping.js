module.exports = {
	name: 'ping',
	description: 'Ping!',
    aliases: ['p'],
	cooldown: 5,
	usage: 'ping',
	execute(client, message) {
		message.channel.send(`🏓Ping is ${Math.round(client.ws.ping)}ms`);
	},
};