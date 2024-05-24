import { Client, GatewayIntentBits, Interaction } from 'discord.js';
import { bannerCommand } from './commands';
import dotenv from 'dotenv';
import { symbolRegex } from './regex';

dotenv.config();

const guild_id = process.env.GUILD_ID;
const client_id = process.env.CLIENT_ID;
const channel_id = process.env.CHANNEL_ID;

class Bot {
  client: Client<boolean>;

  constructor() {
    this.client = new Client<boolean>({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
    });

    console.clear();
    this.LoadCommands();
    this.client.login(process.env.BOT_TOKEN);

    this.client.on('ready', () => {
      console.log(`[✔️ ] bot start in ${this.client.user?.tag}\n\n`);
    });

    this.client.on('interactionCreate', (interaction: Interaction) => {
      this.interactionReply(interaction);
    });
  }

  private interactionReply = (interaction: Interaction): void => {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'get_banner') {
        const HeroNickname = interaction.options.get('nickname')?.value;
        if (HeroNickname)
          if (
            HeroNickname?.toString().length >= 2 &&
            HeroNickname?.toString().match(symbolRegex) === null
          ) {
            try {
              console.log(HeroNickname?.toString().match(symbolRegex));
              const link = `https://sirus.su/api/characters/x1/${HeroNickname}/bar.jpg`;
              interaction.reply({ content: link });
            } catch (e: any) {
              interaction.reply({
                content:
                  'Не найдено, имя должно содержать как минимум 3 символа, а также не должно содержать спец символов',
                ephemeral: true
              });
            }
          } else {
            interaction.reply({
              content:
                'Не найдено, имя должно содержать как минимум 3 символа, а также не должно содержать спец символов',
              ephemeral: true
            });
          }
      }
    }
  };

  private LoadCommands = (): void => {
    this.client.application?.commands.create(bannerCommand);
    if (client_id) if (guild_id) console.log('[✔️ ] Commands load');
  };
}

new Bot();
