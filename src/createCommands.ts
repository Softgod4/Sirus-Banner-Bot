import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { readyCommands } from './commands.js';

dotenv.config();

const bot_token = process.env.BOT_TOKEN;
const guild_id = process.env.GUILD_ID;
const client_id = process.env.CLIENT_ID;

const rest = new REST({ version: '10' });
if (bot_token) {
  rest.setToken(bot_token);
}

(async () => {
  try {
    console.log('[✔️ ] Registering slash commands');
    if (client_id)
      if (guild_id)
        await rest.put(Routes.applicationGuildCommands(client_id, guild_id), {
          body: readyCommands
        });

    console.log('[✔️ ] Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
