const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'leaderboard',
    description: 'Gives you an embed that displayes the leaderboard for your server!',
    aliases: ['lb', 'leaders', 'mostxp', 'leaders', 'lboard', 'leaderb'],
    cooldown: 5,
    usage: 'leaderboard',
    category: 'XP',
    async execute(client, message, async) {
        let data = db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
        if (data.length < 1) return message.channel.send("No leaderboard");
        let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
        data.length = 20;
        let lb = [];
        for (let i in data) {
            let id = data[i].ID.split("_")[1];
            let user = await client.users.fetch(id);
            user = user ? user.tag : "Unknown User#0000";
            let rank = data.indexOf(data[i]) + 1;
            let level = db.get(`level_${id}`);
            let xp = data[i].data;
            let xpreq = Math.floor(Math.pow(level / 0.1, 2));
            lb.push({
                user: { id, tag: user },
                rank,
                level,
                xp,
                xpreq
            });
        };

        const embed = new Discord.MessageEmbed()
            .setTitle(`👑 SmoothSharp's Global Leaderboard`)
            .setColor(message.guild.me.displayHexColor)
        lb.forEach(d => {
            embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
        });
        embed.setFooter(`Your Position: ${myrank}`);
        return message.channel.send(embed);
    }
}