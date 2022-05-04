require('dotenv').config();

const tmi = require('tmi.js');
const say = require('say');

//Speech.setLanguage('pt-BR');




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
	channels: [ 'hugoscode' ]
});

client.connect();


client.on("chat", function (channel, userstate, message, self){
    say.speak(userstate.username+ "says" + message);
   
})

client.on('message', (channel, context, message) => {
    const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();
  
    if ( !isNotBot ) return;
  
    const match = message.match(regexpCommand);

    if ( !match ) return;
  
   
  });

