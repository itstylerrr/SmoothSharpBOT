const Discord= require('discord.js');
const db = require('quick.db')
const { prefix } = require('../../config.json')


module.exports = {
	name: 'setprefix',
    aliases: ['sp', 'setp', 'set-prefix'],
	description: 'Sets up a custom prefix for your server.',
	usage: 'setprefix <PREFIX>',
    cooldown:'60',
	async execute(client, message, args) {
        const psprefix = db.get(`prefix_${message.guild.id}`)
		if(!message.member.hasPermission('ADMINISTRATOR')) {
            const permEmbed = new Discord.MessageEmbed()
            .setTitle('🚫 Missing Permissions')
            .setDescription('You are missing the ADMINISTRATOR permission in this server, having the ADMINISTRATOR permission in this server grants you to be able to change this servers prefix.')
            .setColor(message.guild.me.displayHexColor)
        message.channel.send(permEmbed)
        }

        if(!args[0]) {
            const argsEmbed = new Discord.MessageEmbed()
            .setTitle('🚫 Missing Arguments')
            .setDescription(`You are missing the correct arguments for this command... **PROPER USAGE:** \`${psprefix}setprefix <PREFIX>\``)
            .setColor(message.guild.me.displayHexColor)
        message.channel.send(argsEmbed)
        }

        if(args.length > 3) {
            const lengthEmbed = new Discord.MessageEmbed()
            .setTitle('🚫 Incorrect Length')
            .setDescription('You are not allowed to have a prefix that has a length longer than **THREE(3)** characters.')
            .setColor(message.guild.me.displayHexColor)
        message.channel.send(lengthEmbed)
        }

        if(args.join('') === prefix) {
            db.delete(`prefix_${message.guild.id}`)
            return await message.channel.send(
                new Discord.MessageEmbed()
                .setTitle('PREFIX RESET')
                .setColor('GREEN')
            )
        }
        db.set(`prefix_${message.guild.id}`, args [0])
        await message.channel.send(
            new Discord.MessageEmbed()
            .setTitle('✅ Prefix Changed')
            .addField('New Prefix:', args[0])
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp()
        )
	},
};