const Discord = require('discord.js')
const { oneLine } = require('common-tags')

module.exports = {
    name: 'feedback',
    aliases: ['fb', 'botfeedback', 'feed-back'],
    description: 'Send feed back to SmoothSharps support server!',
    usage: 'feedback <WE LOVE SMOOTHSHARP YEY!>',
    category: 'Miscellaneous',
    args: true,
    cooldown: 600,
    execute(client, message, args) {
        const feedbackChannel = message.client.channels.cache.get('840056450746286090');
        let feedback = message.content.slice(message.content.indexOf(args[0]), message.content.length);

        const feedbackEmbed = new Discord.MessageEmbed()
        .setTitle('SmoothSharp Feedback')
        .setThumbnail(feedbackChannel.guild.iconURL({ dynamic: true }))
        .setDescription(feedback)
        .addField('User', message.member, true)
        .addField('Server', message.guild.name, true)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      feedbackChannel.send(feedbackEmbed);

      if (feedback.length > 1024) feedback = feedback.slice(0, 1021) + '...';
      const embed = new Discord.MessageEmbed()
        .setTitle('Thanks for your feedback!')
        .setThumbnail('https://raw.githubusercontent.com/TjWit/SmoothSharpBOT/main/images/SmoothSharp%20Logo.png')
        .setDescription(oneLine`
          Successfully sent feedback!
          Please join the [SmoothSharp Support Server](https://discord.gg/5cJZcGqbuM) to further discuss your feedback.
        `) 
        .addField('Member', message.member, true)
        .addField('Message', feedback)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);

    },
};