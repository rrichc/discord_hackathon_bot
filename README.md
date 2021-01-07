# discord_hackathon_bot

This is Discord Bot made for the BCS server to help organize hackathons

_____________________________________________________________________________________________________________

Hi everyone! 

There's been some chatter #projects-n-hacks channel regarding forming teams for various hackathons in the past weeks.
I made a little Discord Bot @BCS Hackathon Bot  to assist in forming teams for upcoming hackathons. Please note this bot is very experimental and bare bones at this point.
The bot should be used to add upcoming hackathons and teams, and to browse teams you may want to join.

The bot currently supports:
 • Adding/removing hackathons (removing hackathons can only be done by admins)
 • Adding teams to hackathons
 • Joining/leaving teams in hackathons (leaving a team as the only member will remove the team)
 • Viewing hackathons and teams in more detail

Using @BCS Hackathon Bot 
If you've never used a Discord bot before, bots are typically interacted with through text commands with a specific prefix and arguments for each command ( h! in this case). 

The @BCS Hackathon Bot will monitor commands used in the #bot-channel and in private DMs to the bot itself. In the case that you are DM'ing the bot, you do not need the command prefix h!. However, some commands such as h!leaveteam can only be used in the #bot-channel as the bot needs to check your server permissions.

To get started, you can call h!help in either the #bot-channel or in a private DM to the bot to get a list of commands.
If you want more detail on a specific command, use h!help <command name>. Commands can be called by multiple aliases.
I.e. h!displayhackathons, h!displayhacks, h!disphacks all work.

You can also use a command on it's own without initially supplying arguments, and follow the directed prompts.

An 'ExampleHackathon' and 'ExampleTeam' under it have been created for you to play around creating and joining teams.

Note: Arguments entered, i.e. Hackathon and Team names ARE case-sensitive for now
