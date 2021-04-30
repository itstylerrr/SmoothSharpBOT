const db = require('quick.db')
const Discord = require('discord.js')
const { developers } = require('../../config.json')
module.exports = {
    name: "balance",
    description: "Fetches the balance of the targeted member.",
    usage: 'balance <user>',
    aliases: ['bal', 'b'],
    cooldown: '5',
    args: true,
    execute(client, message, args) {
        if (message.author === developers) {
            let user = message.mentions.members.first() || message.author;
            const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

            let bal = db.fetch(`money_${user.id}`)

            if (bal === null) bal = 0;

            const balEmbed = new Discord.MessageEmbed()
                .setTitle('💵 Balance')
                .addField(`${member.user.tag}\'s Balance`, `$${bal}`)
                .setFooter(`Economy by SmoothSharp, requested by ${message.author.tag}`)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
            message.channel.send(balEmbed)
        }
    }
}