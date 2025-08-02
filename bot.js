import mineflayer from 'mineflayer';
import { pathfinder, Movements, goals } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import TelegramBot from 'node-telegram-bot-api';

const botUsername = 'GOD_GAMERZ_XD';
const host = 'mcfleet.net';
const version = '1.21.4';
const telegramToken = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const mcPassword = 'GODGAMERZ9998';

let mcBot;
let reconnecting = false;

function createBot() {
  mcBot = mineflayer.createBot({
    host,
    username: botUsername,
    version,
    port: 25565,
    auth: 'offline'
  });

  mcBot.loadPlugin(pathfinder);

  mcBot.once('spawn', () => {
    console.log('✅ Minecraft bot spawned.');

    mcBot.chat(`/login ${mcPassword}`);
    setTimeout(() => mcBot.chat('/joinq survival-2'), 3000);
    setTimeout(() => mcBot.chat('/warp AfkZone'), 6000);

    // Auto jump loop
    setInterval(() => {
      if (mcBot.entity && mcBot.entity.onGround) {
        mcBot.setControlState('jump', true);
        setTimeout(() => mcBot.setControlState('jump', false), 300);
      }
    }, 5000);
  });

  mcBot.on('chat', (username, message) => {
    if (username === mcBot.username) return;
    if (message.toLowerCase().includes('hi')) {
      mcBot.chat('hlo');
    }
  });

  mcBot.on('end', () => {
    console.log('⚠️ Bot disconnected. Reconnecting in 5s...');
    if (!reconnecting) {
      reconnecting = true;
      setTimeout(() => {
        reconnecting = false;
        createBot();
      }, 5000);
    }
  });

  mcBot.on('error', err => {
    console.error('Bot Error:', err);
  });
}

// Start Minecraft bot
createBot();

// Telegram bot
const tgBot = new TelegramBot(telegramToken, { polling: true });

tgBot.onText(/\/status/, msg => {
  tgBot.sendMessage(msg.chat.id, '✅ Bot is running.');
});

tgBot.onText(/\/say (.+)/, (msg, match) => {
  const text = match[1];
  if (mcBot && mcBot.chat) {
    mcBot.chat(text);
    tgBot.sendMessage(msg.chat.id, `💬 Sent: ${text}`);
  }
});

tgBot.onText(/\/jump/, msg => {
  if (mcBot && mcBot.entity) {
    mcBot.setControlState('jump', true);
    setTimeout(() => mcBot.setControlState('jump', false), 300);
    tgBot.sendMessage(msg.chat.id, '🦘 Jumped.');
  }
});

tgBot.onText(/\/stop/, msg => {
  tgBot.sendMessage(msg.chat.id, '🛑 Stopping bot...');
  process.exit(0);
});
