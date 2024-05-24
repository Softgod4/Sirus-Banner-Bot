import { SlashCommandBuilder } from 'discord.js';

export const bannerCommand = new SlashCommandBuilder()
  .setName('get_banner')
  .setDescription('sends a character banner from wow sirus x1')
  .addStringOption((option: any) =>
    option
      .setName('nickname')
      .setDescription('write your nickname here')
      .setRequired(true)
  );

// to JSON for createCommands
export const readyCommands = [bannerCommand].map((command) => ({
  name: command.name,
  description: command.description,
  options: command.toJSON().options
}));
