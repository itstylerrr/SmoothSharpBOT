const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'trivia-leaderboard',
    description: 'Gives you an embed that displayes the trivia-leaderboard for your server!',
    aliases: ['tlb', 'trivialeaders', 'mosttrivia', 'tleaders', 'tlboard', 'tleaderb'],
    cooldown: 5,
    usage: 'trivia-leaderboard',
    category: 'Fun',
    async execute(client, message, async) {
        let data = db.all().filter(i => i.ID.startsWith("trivia_")).sort((a, b) => b.data - a.data);
        if (data.length < 1) return message.channel.send("No leaderboard");
        let myrank = data.map(m => m.ID).indexOf(`trivia_${message.author.id}`) + 1 || "N/A";
        data.length = 20;
        let lb = [];
        for (let i in data) {
            let id = data[i].ID.split("_")[1];
            let user = await client.users.fetch(id);
            user = user ? user.tag : "Unknown User#0000";
            let rank = data.indexOf(data[i]) + 1;
            let correct = data[i].data;
            lb.push({
                user: { id, tag: user },
                rank,
                correct,
            });
        };

        const embed = new Discord.MessageEmbed()
            .setTitle(`👑 SmoothSharp's Global Trivia Leaderboard`)
            .setColor(message.guild.me.displayHexColor)
        lb.forEach(d => {
            embed.addField(`Rank ${d.rank}:`, `<@${d.user.id}> is Level - **${d.level}**\nXP - **${d.xp} / ${d.xpreq}**\n`);
        });
        embed.setFooter(`Your Position: ${myrank}`);
        return message.channel.send(embed);
    }
}