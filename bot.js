import mineflayer from 'mineflayer'
import { pathfinder } from 'mineflayer-pathfinder'
import TelegramBot from 'node-telegram-bot-api'
import readline from 'readline'

// Replace with your bot token
const TELEGRAM_TOKEN = '8015321777:AAFbGRO25iV4Vv_89BrLFfHlzUogn9-6kv0'
const CHAT_ID = 'your-telegram-chat-id' // Set this after first run from logs

let bot, telegramBot
let shouldReconnect = true
let jumpInterval

function startBot() {
  bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline',
  })

  bot.loadPlugin(pathfinder)

  bot.once('spawn', () => {
    console.log('Bot spawned')

    bot.chat('/login GODGAMERZ9998')
    setTimeout(() => bot.chat('/joinq survival-2'), 3000)
    setTimeout(() => bot.chat('/warp AfkZone'), 6000)

    // Auto-jump
    jumpInterval = setInterval(() => {
      if (bot.entity && bot.entity.onGround) {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 200)
      }
    }, 5000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo')
    }
  })

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5s...')
    clearInterval(jumpInterval)
    if (shouldReconnect) {
      setTimeout(startBot, 5000)
    }
  })

  bot.on('error', (err) => {
    console.error('Bot error:', err)
  })
}

// === Telegram Bot ===

telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

telegramBot.onText(/\/status/, (msg) => {
  telegramBot.sendMessage(msg.chat.id, `Bot online: ${!!bot?.player?.username}`)
})

telegramBot.onText(/\/say (.+)/, (msg, match) => {
  const chatMsg = match[1]
  if (bot) bot.chat(chatMsg)
})

telegramBot.onText(/\/jump/, (msg) => {
  if (bot?.entity?.onGround) {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }
})

telegramBot.onText(/\/stop/, (msg) => {
  shouldReconnect = false
  if (bot) bot.quit()
  telegramBot.sendMessage(msg.chat.id, 'Bot stopped.')
})

// Start
startBot()        setTimeout(() => mcBot.setControlState('jump', false), 300);
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
