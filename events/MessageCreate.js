const { Events} = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
    once: false,
	execute(Message) {
        
        const {prefix} = require('../config.json');
        
        if(Message.author.bot) {return;}
        if(!Message.content.startsWith(prefix)){return;}
        const cmd = Message.content.slice(1).split(" ")[0].toLowerCase(); //to remove the prefix and arguments
        const args = Message.content.slice(cmd.length+prefix.length).trim()
        
        switch (cmd) {
          case "ping": Message.channel.send("pong"); console.log("pong!"); break;
          case "exec": compileCode(args, Message); break;//doest work now 
          default: Message.channel.send("[418] I'm a Teapot!"); break;
        }
      
 },
};