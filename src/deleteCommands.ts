import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.BOT_TOKEN;

if (token && clientId && guildId) {
  const rest = new REST().setToken(token);

  // for guild-based commands
  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log('[✔️ ] Successfully deleted all guild commands.'))
    .catch(console.error);

  // for global commands
  rest
    .put(Routes.applicationCommands(clientId), { body: [] })
    .then(() =>
      console.log('[✔️ ] Successfully deleted all application commands.')
    )
    .catch(console.error);
}
