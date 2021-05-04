// const db = require('quick.db')
// const Discord = require('discord.js')
// const topics = require('../../trivia')

// const { prefix } = require('../../config.json')

// module.exports = {
//     name: 'topics',
//     description: 'Shows the list of all avalible trivia topics!',
//     aliases: ['triviatopics', 'categories', 'ts'],
//     cooldown: 5,
//     usage: 'topics',
//     category: 'Fun',
//     execute(client, message) {
//         let psprefix = db.get(`prefix_${message.guild.id}`)
//         if (psprefix === null) psprefix = prefix

//         const topics = [];
//         topics.forEach(topic => {
//             topics.push(`\`${topic}\``);
//         });
//         const embed = new MessageEmbed()
//             .setTitle('Trivia Topics')
//             .setDescription(`${topics.join(' ')}\n\nType \`${prefix}trivia [topic]\` to choose one.`)
//             .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
//             .setTimestamp()
//             .setColor(message.guild.me.displayHexColor);
//         message.channel.send(embed);

//     },
// };