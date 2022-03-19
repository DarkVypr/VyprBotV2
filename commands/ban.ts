import utils from '../utils'

module.exports = async (client, context) => {
  if (context.mod || context.channel == context.user || await utils.checkAdmin(context.user)) {
    if ((await client.getMods(context.channel)).indexOf('vyprbot') == -1) {
      return {
        success: false,
        reply: `I am not a mod in this channel! Please mod me, and try again.`
      }
    }
    if (!context.args[0]) {
      return {
        success: false,
        reply: `Please provide one or more users to ban. They must be space-separated.`
      }
    }
    for (let i = 0; i < context.args.length; i++) {
      client.ban(context.channel, context.args[i].replace('@', ''), 'Automated by VyprBot.')
    }
    return {
      success: true,
      reply: `Successfully banned ${context.args.length} user(s)!`
    }
  }
  return {
    success: false,
    reply: `You must be a moderator or the owner of this channel to use this command!`
  }
}

