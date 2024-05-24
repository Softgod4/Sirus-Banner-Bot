"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.BOT_TOKEN;
if (token && clientId && guildId) {
    const rest = new discord_js_1.REST().setToken(token);
    // for guild-based commands
    rest
        .put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), { body: [] })
        .then(() => console.log('[✔️ ] Successfully deleted all guild commands.'))
        .catch(console.error);
    // for global commands
    rest
        .put(discord_js_1.Routes.applicationCommands(clientId), { body: [] })
        .then(() => console.log('[✔️ ] Successfully deleted all application commands.'))
        .catch(console.error);
}
