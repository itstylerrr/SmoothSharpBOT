const Discord = require('discord.js')
const { oneLine } = require('common-tags')

module.exports = {
    name: 'bug-report',
    aliases: ['br', 'bugreport', 'reportbug', 'report-bug'],
    description: 'Send feed back to SmoothSharps support server!',
    usage: 'bug-report <an error has been found!>',
    category: 'Miscellaneous',
    args: true,
    cooldown: 60,
    execute(client, message, args) {
        const reportChannel = message.client.channels.cache.get('840056450746286090');
        let report = message.content.slice(message.content.indexOf(args[0]), message.content.length);

        const reportEmbed = new Discord.MessageEmbed()
        .setTitle('SmoothSharp Bug Report')
        .setThumbnail(reportChannel.guild.iconURL({ dynamic: true }))
        .setDescription(report) 
        .addField('User', message.member, true)
        .addField('Server', message.guild.name, true)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      reportChannel.send(reportEmbed);
  
      if (report.length > 1024) report = report.slice(0, 1021) + '...';
      const embed = new Discord.MessageEmbed()
        .setTitle('Thanks for your help!')
        .setThumbnail('https://raw.githubusercontent.com/TjWit/SmoothSharpBOT/main/images/SmoothSharp%20Logo.png')
        .setDescription(oneLine`
          Successfully sent bug report!
          Please join the [SmoothSharp Support Server](https://discord.gg/5cJZcGqbuM) to further discuss your issue.
          Additionally, feel free to submit an issue on [GitHub](https://github.com/TjWit/SmoothSharpBOT/issues).
        `) 
        .addField('Member', message.member, true)
        .addField('Message', report)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);

    },
};