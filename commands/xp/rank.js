const Discord = require('discord.js')
const db = require('quick.db')
const Canvacord = require('canvacord')

module.exports = {
	name: 'rank',
	description: 'Gives you an embed that displayes information about your guild rank!',
    aliases: ['points', 'xp', 'level'],
	cooldown: 5,
	usage: 'rank <@user (not needed)>',
    category: 'XP',
	execute(client, message) {
        if(message.author.bot) return;
        var user = message.mentions.users.first() || message.author;
        var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
        var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
        var xpneeded = level * 500
    
        // const lvlEmbed = new Discord.MessageEmbed()
        // .setTitle(`${user.username}'s Level`)
        // .addField('XP', currentxp)
        // .addField('Level', level)
        // .addField('XP Till Next Level', xpneeded - currentxp)
        // .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        // .setColor(message.guild.me.displayHexColor)
        // message.channel.send(lvlEmbed)

        const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpneeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("#000000")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", "https://georgiawildlife.com/sites/default/files/parks/images/zoom/1920x1080-BlackRockMountain.jpg")
        rankcard.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "yourRank.png")
            message.channel.send(attachment)
        })

	},
};