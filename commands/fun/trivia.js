const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

let questions = [
    {
        title: "Best programming language?",
        options: ["JavaScript/TypeScript", "Python", "Ruby", "Rust"],
        correct: 1,
      },
      {
        title: "Best NPM package?",
        options: ["int.engine", "ms", "ws", "discord.js"],
        correct: 4,
      },
      {
        title: "Who is the most AMAZING SmoothBrains developer?",
        options: ["elite", "Optio", "tyler", "muchtek"],
        correct: 3,
      },
]

module.exports = {
	name: 'trivia',
	description: 'Test your knowledge!',
    aliases: ['question'],
	cooldown: 10,
	usage: 'trivia',
	category: 'Fun',
	async execute(client, message, args) {
        let q = questions[Math.floor(Math.random() * questions.length)];
        let i = 0;
        const Embed = new MessageEmbed()
          .setTitle(q.title)
          .setDescription(
            q.options.map((opt) => {
              i++;
              return `${i} - ${opt}\n`;
            })
          )
          .setColor(message.guild.me.displayHexColor)
          .setFooter(
            `Reply to this message with the correct question number! You have 15 seconds.`
          );
        message.channel.send(Embed);
        try {
          let msgs = await message.channel.awaitMessages(
            (u2) => u2.author.id === message.author.id,
            { time: 15000, max: 1, errors: ["time"] }
          );
          if (parseInt(msgs.first().content) == q.correct) {
              db.add(`trivia_${message.author.id}_correct_`, + 1)
            return message.channel.send(
                new MessageEmbed()
                .setTitle('✅ You got it correct!')
                .setColor('GREEN')
            );
          } else {
            return message.channel.send(
                new MessageEmbed()
                .setTitle('❌ You got it incorrect!')
                .addField('Correct Anwser:', q.correct)
                .setColor('RED')
            );
          }
        } catch (e) {
          return message.channel.send(`You did not answer!`);
        }
	},
};