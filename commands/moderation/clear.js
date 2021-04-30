const Discord = require('discord.js')

module.exports = {
	name: 'clear',
	description: 'Prune up to 99 messages.',
    guildOnly: true,
    aliases: ['c', 'delete', 'remove', 'rm', 'prune'],
	usage: 'clear <ammount>',
	permissions: 'ADMINISTRATOR',
	async execute(client, message, args) {

        if (message.member.hasPermission('ADMINSTRATOR')) {

		const amount = parseInt(args[0]) + 1;
        const embedAmount = args[0] - 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
		message.channel.bulkDelete(amount, true)
        .then(ammount => {
			const clearEmbed = new Discord.MessageEmbed()
			.setTitle('Clear Messages')
			.addField('Channel', message.channel.name)
			.addField('Amount Of Messages', embedAmount)
			.addField('Messages Acctually Deleted', ammount.size)
			.setFooter(`This message will delete in 5 seconds! Messages deleted by SmoothSharp, command ran by ${message.author.tag}`)
			.setColor(message.guild.me.displayHexColor)


            message.channel.send(clearEmbed)
        }).then(message => {
            message.delete({ timeout: 5000 })
          })
        .catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to prune messages in this channel!');
		});
    } else {
        message.channel.send(new Discord.MessageEmbed().setTitle('Missing correct permissions ❌').setColor('RED'))
    }

	let modChannelID = await db.fetch(`modchannel_${message.guild.id}`)
    let modChannel = await client.channels.fetch(modChannelID)
	const clearEmbed = new Discord.MessageEmbed()
			.setTitle('Clear Messages')
			.addField('Channel', message.channel.name)
			.addField('Amount Of Messages', embedAmount)
			.addField('Messages Acctually Deleted', ammount.size)
			.setFooter(`This message will delete in 5 seconds! Messages deleted by SmoothSharp, command ran by ${message.author.tag}`)
			.setColor(message.guild.me.displayHexColor);
	
        if(!modChannel) {
          return message.channel.send(`Oops! Seems like you didn't set a moderation channel where are logs go! Do ${prefix}mod-channel to set your log channel! If you need help do ${prefix}help`)
        }

        modChannel.send(clearEmbed).catch(err => {
          return;
        })
	}
};