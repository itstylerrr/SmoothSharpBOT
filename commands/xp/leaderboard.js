const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
	name: 'leaderboard',
	description: 'Gives you an embed that displayes the leaderboard for your server!',
    aliases: ['lb', 'leaders', 'mostxp', 'leaders', 'lboard', 'leaderb'],
	cooldown: 5,
	usage: 'leaderboard',
	execute(client, message) {
        let xp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`, { sort: '.data'}) || 0;

        let content = "";

        for (let i = 0; i < xp.length; i++){
            let user = client.users.cache.get(xp[i].ID.split('_')[2]).username

            content += `${i+1}. ${user} - ${xp[i].data} \n`;

            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s Leaderboard`)
            .setDescription(`${content}`)
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp()
            .setFooter('XP By SmoothSharp')

            message.channel.send(embed);
        }
	},
};