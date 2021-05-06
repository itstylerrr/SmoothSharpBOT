const { MessageAttachment } = require('discord.js')
const canvacord = require('canvacord')
const db = require('quick.db');

module.exports = {
    name: 'rank',
    description: 'Gives you an embed that displayes information about your guild rank!',
    aliases: ['points', 'xp', 'level'],
    cooldown: 5,
    usage: 'rank',
    category: 'XP',
    async execute(client, message, async) {
        const cardbgrnd = "https://wallpapercave.com/wp/wp5515025.jpg"
        let user = message.mentions.users.first() || message.author;

        let level = db.get(`level_${user.id}`) || 0;
        let exp = db.get(`xp_${user.id}`) || 0;
        let neededXP = Math.floor(Math.pow(level / 0.1, 2));

        let every = db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
        let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;

        const card = new canvacord.Rank()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setRank(rank)
            .setLevel(level)
            .setCurrentXP(exp)
            .setRequiredXP(neededXP)
            .setStatus(user.presence.status)
            .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }))
            .setBackground("IMAGE", cardbgrnd)

        const img = await card.build();

        return message.channel.send(new MessageAttachment(img, "rank.png"));
    }
};