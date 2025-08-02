import mineflayer from 'mineflayer';
import { pathfinder } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import TelegramBot from 'node-telegram-bot-api';

const botUsername = 'GOD_GAMERZ_XD';
const serverHost = 'mcfleet.net';
const telegramToken = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0';
const telegramBot = new TelegramBot(telegramToken, { polling: true });

let bot;
let shouldReconnect = true;

function startBot() {
  bot = mineflayer.createBot({
    host: serverHost,
    username: botUsername,
    version: '1.21.4',
    auth: 'offline',
  });

  bot.loadPlugin(pathfinder);

  bot.on('login', () => {
    console.log('✅ Logged in to Minecraft');
    setTimeout(() => bot.chat('/login GODGAMERZ9998'), 3000);
    setTimeout(() => bot.chat('/joinq survival-2'), 7000);
    setTimeout(() => bot.chat('/warp AfkZone'), 10000);
  });

  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 5000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected. Reconnecting in 5s...');
    if (shouldReconnect) {
      setTimeout(startBot, 5000);
    }
  });

  bot.on('error', err => {
    console.error('⚠️ Error:', err.message);
  });
}

// Telegram commands
telegramBot.onText(/\/status/, msg => {
  telegramBot.sendMessage(msg.chat.id, bot ? `✅ Bot online as ${bot.username}` : '❌ Bot is offline.');
});

telegramBot.onText(/\/say (.+)/, (msg, match) => {
  const text = match[1];
  if (bot) bot.chat(text);
  telegramBot.sendMessage(msg.chat.id, `💬 Sent message in chat: ${text}`);
});

telegramBot.onText(/\/jump/, msg => {
  if (bot) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
    telegramBot.sendMessage(msg.chat.id, '🦘 Jumped!');
  }
});

telegramBot.onText(/\/stop/, msg => {
  telegramBot.sendMessage(msg.chat.id, '🛑 Bot stopping...');
  shouldReconnect = false;
  bot.quit();
});

startBot();    }
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
