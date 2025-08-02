import { createBot } from 'mineflayer';

const bot = createBot({
  host: 'mcfleet.net', // Change if needed
  port: 25565,
  username: 'GOD_GAMERZ_XD', // Use a valid Minecraft account
  version: '1.21.4',
  auth: 'microsoft' // or 'offline' for cracked servers
});

bot.on('spawn', () => {
  console.log('Bot spawned and staying AFK.');
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 10000);
});

bot.on('end', () => console.log('Bot disconnected.'));
bot.on('error', err => console.log('Error:', err));