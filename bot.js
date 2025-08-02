import mineflayer from 'mineflayer';
import { pathfinder } from 'mineflayer-pathfinder';
import autoeat from 'mineflayer-auto-eat';
import repl from 'repl';

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcfleet.net',
    port: 25565,
    username: 'GOD_GAMERZ_XD',
    version: '1.20.1',
    auth: 'offline',
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(autoeat);

  bot.once('spawn', () => {
    console.log('Bot spawned in the server.');

    bot.chat('/login GODGAMERZ9998');

    setTimeout(() => {
      bot.chat('/joinq survival-2');
    }, 3000);

    setTimeout(() => {
      bot.chat('/warp AfkZone');
    }, 6000);

    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hi') {
      bot.chat('hlo');
    }
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err.message);
  });

  repl.start({ prompt: '> ', eval: (cmd, context, filename, callback) => {
    try {
      callback(null, eval(cmd));
    } catch (e) {
      callback(e);
    }
  }});
}

createBot();
