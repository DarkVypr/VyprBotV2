import utils from '../utils'

module.exports = async (client, context) => {
	if (!await utils.checkPermitted(context) && !await utils.checkAdmin(context.user)) {
		return {
			success: false,
			reply: `You don't have permission to use that command! Ask the broadcaster to permit you with "${context.prefix}permit add ${context.user}" and try again. ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
		}
	}
	if (!/^\d+$/.test(context.args[0]) || context.args[0] > 80 || context.args[0] < 1 || !context.args[1]) {
		return {
			success: false,
			reply: `Invalid Syntax! The max spam is 80, and the correct syntax is: "${context.prefix}spam {amount} {message}"! ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
		}
	}
	const amount = +context.args[0]
	context.args.shift()
  return {
    success: true,
    reply: Array(amount).fill(`/me ${context.args.join(' ')}`)
  }
}