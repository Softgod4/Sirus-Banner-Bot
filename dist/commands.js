"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readyCommands = exports.bannerCommand = void 0;
const discord_js_1 = require("discord.js");
exports.bannerCommand = new discord_js_1.SlashCommandBuilder()
    .setName('get_banner')
    .setDescription('sends a character banner from wow sirus x1')
    .addStringOption((option) => option
    .setName('nickname')
    .setDescription('write your nickname here')
    .setRequired(true));
// to JSON for createCommands
exports.readyCommands = [exports.bannerCommand].map((command) => ({
    name: command.name,
    description: command.description,
    options: command.toJSON().options
}));
