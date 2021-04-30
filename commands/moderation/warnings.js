const db = require("quick.db")

module.exports = {
  name: "warnings",
  alises: ['warns'],
  description: "Get the warnings of a mentioned user.",
  cooldown: '5',
  args: true,
  usage: 'warnings <user>',
  async execute(client, message, args) {
    const user = message.mentions.members.first() || message.author

    let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`)
    let reasons = await db.get(`reasons_${message.guild.id}_${user.id}`)

    let content = `${reasons}`
    
    if(!warnings) { 
    return message.channel.send(`${user} has **0** warning(s)`)
    }
    else {
      let counter = warnings.length
      message.channel.send(`${user} has **${counter}** warning(s)`)
      message.channel.send(`${user}'s most recent warn reason is for: **${content}**`)
    } 
  }
}