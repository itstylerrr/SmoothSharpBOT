const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { default: Collection } = require('@discordjs/collection');
const db = require('quick.db')
const developers = ['756289468285190294', '376109069733199893', '806196848393191435', '257073333273624576', '768270409509634048']

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	console.log('Logged in succesfully as @SmoothSharp ✅');
});

client.on("guildCreate", guild => {
	console.log('SmoothSharp Setup!')
	const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
	channel.send(
		new Discord.MessageEmbed()
			.setTitle('Thanks for inviting SmoothSharp!')
			.setDescription(`The first thing that we need to do is run ${prefix}setup... That way we can create a channel nammed ***mod-logs*** so whenever you kick, ban, warn, and many other things, you will get messages in that server verifying that everything has been ran successfully.`)
			.addField('Command To Run:', `${prefix}setup`)
			.addField('What to do next', 'You want to put the bots roles above all the other roles, that way the bot is able to access all members.')
			.setFooter(`Moderation by SmoothSharp`)
			.setTimestamp()
			.setColor("RANDOM")
	)
});

function status() {

	let status = [
		`smoothbrains.xyz | ${client.guilds.cache.size} guilds`,
		`${prefix}help`,
		`${client.guilds.cache.size} guilds | ${prefix}help`
	];

	let statusR = Math.floor(Math.random() * status.length);

	client.user.setActivity(status[statusR], {
		type: "WATCHING",
		status: "Online",
		url: "https://smoothbrains.xyz"
	});
}
setInterval(status, 7000);

client.on('ready', () => {
	status();
});

client.on('guildDelete', guild => {
	status();
});

client.on('guildCreate', guild => {
	status();
});

client.on('message', message => {
	if (message.channel.type === 'dm') return;


	let psprefix = db.get(`prefix_${message.guild.id}`)
	if (psprefix === null) psprefix = prefix

	if (!message.content.startsWith(psprefix) || message.author.bot) return;

	const args = message.content.slice(psprefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('**SmoothSharp is not allowed to run this command inside of DM channels ❌**');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `**${message.author} you forgot to specify any arguments ❌**`;

		if (command.usage) {
			reply += `\nThe proper usage for this command would be: \`${psprefix}${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				new Discord.MessageEmbed()
					.setTitle('⏳ Your on cooldown!')
					.addField('Time Left:', timeLeft)
					.addField('Dont worry, your not in trouble!', 'We just have these cooldowns set to make sure our API\'s / database dosent get spammed!')
					.setColor('RED')
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    xp(message);
});

function xp(message) {
		const randomXP = Math.floor(Math.random() * 10) + 15
        let xp = db.add(`xp_${message.author.id}`, randomXP);
		console.log(`Added ${randomXP}XP to ${message.author.tag}'s account succesfully!`)
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = db.get(`level_${message.author.id}`) || db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${newLevel}!`);
        }
}

client.login(token);

// const { developers } = require('../../config.json')
// if (!message.author.id != developers) {
// 	return
// } else if (message.author.id === developers) {
// 	
// }
