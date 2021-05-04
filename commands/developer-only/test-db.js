const db = require("quick.db")
const { developers } = require('../../config.json')

module.exports = {
  name: "testdb",
  description: "Test the db",
  usage: 'testdb',
  aliases: ['tdb', 'testdatabase', 'quick.db'],
  cooldown: '10',
  category: 'Developer-Only',
  execute(client, message) {
    if (!message.author.id != developers) {
        return
    } else if (message.author.id === developers) {
        if (db.includes(null)) {
            return message.channel.send("Empty Array (Empty database)")
        } else {
            message.channel.send(db.all());
        }
    }
  }
}