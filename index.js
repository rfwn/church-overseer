// Ok so, Hello rick.
// I'm making this very minimal, but don't get it wrong, I will modulize and expand everything for a bigger project
// Maybe an actual discord bot. I'm very optimist about the future of this repo 
// For now, have this and I will start working on it eventually
console.log("Starting the overseer...")
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
client.once(Events.ClientReady, c => {
	console.log(`The overseer has woken up... You can start the operation by going in any channel and sending "~~start"`);
});
client.on(Events.MessageCreate, async msg => {
	if(msg.content === "~~start" && (msg.author.id == "578307980928483328" || msg.author.id == "702401397114667059")) {  // This is the command
		console.log("Received the message. Starting the operation.");
		await msg.guild.members.fetch();
		const role = msg.guild.roles.cache.get(process.env.ROLE_ID);
		if(!role) throw("Failed to get the role.");
		let i = 0;
		const startingTime = Date.now();
		for (const member of role.members.values()) {
			try {
				console.log(`Trying to send a message to ${member.user.username} (${member.id}).`);
				await member.send(`MESSAGE HERE`);
				console.log(`Successful.`);
				i++;
			}
			catch (err) {
				console.log(`Failed. ${err}`)
			}
		}
		console.log(`Finished sending the message to ${i} members. Operation took ${Date.now()-startingTime} miliseconds.`);
		process.exit();
	}
	
});
client.login(process.env.TOKEN);