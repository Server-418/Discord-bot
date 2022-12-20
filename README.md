# Discord-bot

#### (under development)

our discord bot with currently only 1 command: <br>
a code executing command. that can execute Javascript code. (possible support for more languages later)

# upcoming 

we are planning on adding API's like github and Wikipedia. <br>
other commonly used command will appear later too. like: <br>
- bulk delete
- music commands
- kick/ban commands
- fact of the day feature

# code optimization 

we will optimize our code later in the form of event- and commandhandlers.

# suggestions
we appreciate any suggestions of features/commands or changes to current features. <br>
you can add your suggestions in the issue tab with the lable "suggestion"

# setup
clone the repository:<br>
```
git clone https://github.com/Server-418/Discord-bot.git
```

install all necessary packages:<br>
```
npm install
```

create a new file named `config.json`<br>
place this in the file and change `[token]` and `[gitkey]` to your own [discord token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token) and [github api key](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).<br>
```
{
	"token": "[token]",
	"prefix": "!",
    "gitkey":"[gitkey]"
}
```

then run this command to start your bot:
```
node index.js
```
