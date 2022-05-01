import utils from '../utils'

module.exports = async (client, context) => {
	try {
		const idCheck = context.args.join(' ').match(/(uid|lookup)(:|=)(true|false)/i)
		const id = idCheck ? Boolean(idCheck[2].toLowerCase()) : false;
		if (idCheck) {
			context.args.splice(context.args.indexOf(idCheck[0]), 1)
		}
		let user = context.args[0] 
    ? context.args[0].toLowerCase().replace('@', '')
    : context.user
		const userData = await utils.fetch(`https://api.ivr.fi/v2/twitch/user/${user}?id=${id}`)
		const adverb = userData.verifiedBot ? '' : 'not'
		const emoji = userData.verifiedBot ? ' ✅ ' : ' ❌ '
    const self = user == 'vyprbot'
    ? '(w manz https://i.darkvypr.com/bot-verification.png 😎)'
    : ''
		return {
			success: true,
			reply: `${userData.displayName} is ${adverb} a verified bot! ${emoji} ${self}`
		}
	} catch (e) {
		return {
			success: false,
			reply: e
		}
	}
}