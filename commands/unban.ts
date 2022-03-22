import utils from '../utils'

module.exports = async (client, context) => {
	if (context.mod || context.channel == context.user || await utils.checkAdmin(context.user)) {
		if ((await client.getMods(context.channel)).indexOf('vyprbot') == -1) {
			return {
				success: false,
				reply: `I am not a mod in this channel! Please mod me, and try again. ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
			}
		}
		if (!context.args[0]) {
			return {
				success: false,
				reply: `Please provide one or more users to unban. They must be space-separated. ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
			}
		}
		for (let i = 0; i < context.args.length; i++) {
			client.privmsg(context.channel, '/unban ' + context.args[i].replace('@', ''))
		}
		return {
			success: true,
			reply: `Successfully unbanned ${context.args.length} user(s)! ${await utils.bestEmote(context.channel, ['YAAAY', 'NekoProud', 'Swag', 'EZ', 'EZY', '😵', '⛔'])}`
		}
	}
	return {
		success: false,
		reply: `You must be a moderator or the owner of this channel to use this command! ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
	}
}