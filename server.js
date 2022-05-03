require('dotenv').config();

const tmi = require('tmi.js');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    website: {
      response: 'https://hugosmr.com'
    },
    upvote: {
      response: (user) => `User  ${user} was just upvoted!`
    }
  }

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_BOT_OAUTH_TOKEN
	},
	channels: [ 'asterweb3' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {

    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

    if (!isNotBot) return;

    const [raw, command, argument] = message.match(regexpCommand);

    const { response } = commands[command] || {};

    if ( typeof response === 'function' ) {
        client.say(channel, response(argument));
      } else if ( typeof response === 'string' ) {
        client.say(channel, response);
      }

   // if ( command ) {
   //   client.say(channel, `Command "${command}" found with argument "${argument}"`);
   // }

    
        
    
	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);
});