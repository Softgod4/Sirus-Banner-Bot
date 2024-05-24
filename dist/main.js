"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commands_1 = require("./commands");
const dotenv_1 = __importDefault(require("dotenv"));
const regex_1 = require("./regex");
dotenv_1.default.config();
const guild_id = process.env.GUILD_ID;
const client_id = process.env.CLIENT_ID;
const channel_id = process.env.CHANNEL_ID;
class Bot {
    client;
    constructor() {
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages]
        });
        console.clear();
        this.LoadCommands();
        this.client.login(process.env.BOT_TOKEN);
        this.client.on('ready', () => {
            console.log(`[✔️ ] bot start in ${this.client.user?.tag}\n\n`);
        });
        this.client.on('interactionCreate', (interaction) => {
            this.interactionReply(interaction);
        });
    }
    interactionReply = (interaction) => {
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName === 'get_banner') {
                const HeroNickname = interaction.options.get('nickname')?.value;
                if (HeroNickname)
                    if (HeroNickname?.toString().length >= 2 &&
                        HeroNickname?.toString().match(regex_1.symbolRegex) === null) {
                        try {
                            console.log(HeroNickname?.toString().match(regex_1.symbolRegex));
                            const link = `https://sirus.su/api/characters/x1/${HeroNickname}/bar.jpg`;
                            interaction.reply({ content: link });
                        }
                        catch (e) {
                            interaction.reply({
                                content: 'Не найдено, имя должно содержать как минимум 3 символа, а также не должно содержать спец символов',
                                ephemeral: true
                            });
                        }
                    }
                    else {
                        interaction.reply({
                            content: 'Не найдено, имя должно содержать как минимум 3 символа, а также не должно содержать спец символов',
                            ephemeral: true
                        });
                    }
            }
        }
    };
    LoadCommands = () => {
        this.client.application?.commands.create(commands_1.bannerCommand);
        if (client_id)
            if (guild_id)
                console.log('[✔️ ] Commands load');
    };
}
new Bot();
