const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const antilink = require('./modules/antilink.js');

client.login(process.env.BOT_TOKEN)
    .then(() => console.log("Bot Connected Successfully"))
    .catch(err => console.error("Bot unable to Connect", err));

client.on("messageCreate", async (message) => {
    await antilink(client, message);
});
