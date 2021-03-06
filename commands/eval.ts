import * as _utils from '../utils'
const utils = _utils
import * as _notify from '../tools/notifier'
const notify = _notify
import * as _humanizeDuration from 'humanize-duration'
const humanizeDuration = _humanizeDuration

module.exports = async (client, context) => {
  if(!await utils.checkAdmin(context.user)) { return { success: false, reply: `You don't have permission to use that command! Required: Admin ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}` } }
  if(!context.args[0]) { return { success: false, reply: `Provide an expression to evaluate! ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}` } }
  const input = context.args.join(' ')
  if(/process.env/i.test(input) && context.user != 'darkvypr') { return { success: false, reply: `Only DarkVypr can use process.env.` } }
  try {
    return { success: true, reply: await eval(input) }
  }catch(e) {
    return { sucess: false, reply: e }
  }
}