const Discord = require('discord.js')

const db = require("quick.db")

const { tyler, elite, muchtek } = require('../../config.json')

const developers = { tyler, elite, muchtek}

module.exports = {
    name: "eval",
    usage: 'eval <code>',
    description: "Test the db",
    aliases: ['ev', 'evaluate', 'console.log'],
    cooldown: '30',
    args: true,
    category: 'Developer-Only',
    execute(client, message, args) {
        if (!message.author.id != developers) {
            return message.channel.send('You cannot use this command due to its token grabbing problems!')
        } else if (message.author.id === developers) {
            const input = args.join(' ');
            if (!input) return this.sendErrorMessage(message, 0, 'Please provide code to eval');
            if (!input.toLowerCase().includes('token')) {

                const embed = new Discord.MessageEmbed()

                try {
                    let output = eval(input);
                    if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });

                    embed
                        .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
                        .addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
                        .setColor('#66FF00');

                } catch (err) {
                    embed
                        .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
                        .addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
                        .setColor('#FF0000');
                }

                message.channel.send(embed);

            } else {
                message.channel.send('(╯°□°)╯︵ ┻━┻ MY token. **MINE**.');
            }
        }
    }
}