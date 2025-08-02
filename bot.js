import mineflayer from 'mineflayer';
import { pathfinder } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import TelegramBot from 'node-telegram-bot-api';

const botUsername = 'GOD_GAMERZ_XD';
const telegramToken = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const chatResponses = {
  hi: 'hlo',
};

let jumping = false;
let telegramBotRunning = true;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: botUsername,
    version: false,
  });

  bot.loadPlugin(pathfinder);

  bot.on('login', () => {
    console.log('✅ Bot logged in');
    bot.chat('/login GODGAMERZ9998');
    setTimeout(() => bot.chat('/joinq survival-2'), 5000);
    setTimeout(() => bot.chat('/warp AfkZone'), 10000);
  });

  bot.on('chat', (username, message) => {
    if (username === botUsername) return;
    const response = chatResponses[message.toLowerCase()];
    if (response) {
      bot.chat(response);
    }
  });

  function startJumping() {
    if (!jumping) {
      jumping = true;
      setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }, 3000);
    }
  }

  startJumping();

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  return bot;
}

let bot = createBot();

// Telegram Bot Setup
const tgBot = new TelegramBot(telegramToken, { polling: true });

tgBot.onText(/\/status/, (msg) => {
  tgBot.sendMessage(msg.chat.id, `Bot is running as ${botUsername}`);
});

tgBot.onText(/\/say (.+)/, (msg, match) => {
  const message = match[1];
  if (bot && bot.chat) {
    bot.chat(message);
    tgBot.sendMessage(msg.chat.id, `✅ Sent: ${message}`);
  }
});

tgBot.onText(/\/jump/, (msg) => {
  if (bot && bot.setControlState) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
    tgBot.sendMessage(msg.chat.id, '🔁 Jumped!');
  }
});

tgBot.onText(/\/stop/, (msg) => {
  tgBot.sendMessage(msg.chat.id, '🛑 Stopping bot...');
  process.exit(0);
});    bot.quit();
    bot = null;
    telegramBot.sendMessage(msg.chat.id, '🛑 Bot stopped.');
  } else {
    telegramBot.sendMessage(msg.chat.id, '❌ Bot is already stopped.');
  }
});

// === START BOT ===
createBot();
  telegram.onText(/\/stop/, (msg) => {
    telegram.sendMessage(msg.chat.id, '🛑 Stopping bot...');
    process.exit();
  });

  bot.on('chat', (username, message) => {
    if (username !== bot.username) {
      if (message.toLowerCase() === 'hi') {
        bot.chat('hlo');
      }
    }
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 5s...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot Error:', err.message);
  });
}

startBot();
