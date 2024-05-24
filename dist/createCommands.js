"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const commands_js_1 = require("./commands.js");
dotenv_1.default.config();
const bot_token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;
const client_id = process.env.CLIENT_ID;
const rest = new discord_js_1.REST({ version: '10' });
if (bot_token) {
    rest.setToken(bot_token);
}
(async () => {
    try {
        console.log('[✔️ ] Registering slash commands');
        if (client_id)
            if (guild_id)
                await rest.put(discord_js_1.Routes.applicationGuildCommands(client_id, guild_id), {
                    body: commands_js_1.readyCommands
                });
        console.log('[✔️ ] Slash commands were registered successfully!');
    }
    catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
