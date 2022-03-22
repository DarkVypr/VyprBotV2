import utils from '../utils'

module.exports = async (client, context) => {
  if (!await utils.checkAdmin(context.user)) {
    return {
      success: false,
      reply: `You don't have permission to use that command! Required: Admin ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
    }
  }
  if (!context.args[0] || !/^set$|^delete$|^get$|^list$/.test(context.args[0])) {
    return {
      success: false,
      reply: `Invalid syntax! Usage: "${context.prefix}data {set|delete|get|list}} {data-name} {...}" ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
    }
  }
  const publicCheck = context.args.join(' ').match(/chat(:|=)(true|false)/i)
  var isPublic = publicCheck ? (Boolean(publicCheck[0].replace(/chat(:|=)/i, '').toLowerCase())) : false;
  if (publicCheck) {
    context.args.splice(context.args.indexOf(publicCheck[0]), 1)
  }
  if (context.args[0] == 'set') {
    if (!context.args[1] || !context.args[2]) {
      return {
        success: false,
        reply: `Please provide a key and value. Example: "${context.prefix}data set darkvyprCockSize 12inches" ({key} {value}) ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    let value = context.args[1]
    context.args.splice(0, 2)
    utils.setData(value, context.args.join(' '))
    return {
      success: true,
      reply: `Successfully set "${value}" to "${context.args.join(' ')}"!`
    }
  }
  if (context.args[0] == 'delete') {
    if (!context.args[1]) {
      return {
        success: false,
        reply: `Please provide a key to delete. Example: "${context.prefix}data delete darkvyprCockSize" ({key}) ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    let oldData = await utils.getData(context.args[1])
    if (!oldData) {
      return {
        success: false,
        reply: `There is no data with the name "${context.args[1]}". ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    utils.deleteData(context.args[1])
    return {
      success: true,
      reply: `Successfully deleted "${context.args[1]}" which held "${oldData}".`
    }
  }
  if (context.args[0] == 'get') {
    if (!context.args[1]) {
      return {
        success: false,
        reply: `Please provide a key to get the value of. Example: "${context.prefix}data delete darkvyprCockSize" ({key}) ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    let data = await utils.getData(context.args[1])
    if (data == null) {
      return {
        success: true,
        reply: `There is no data with the name "${context.args[1]}". ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    console.log('-----------');
    console.log();
    console.log(data);
    console.log();
    console.log('-----------')
    return {
      success: true,
      reply: isPublic ? `"${context.args[1]}" holds "${data}"` : `There is a key named "${context.args[1]}". See console, or append chat:true to send the value in chat.`
    }
  }
  if (context.args[0] == 'list') {
    if (!context.args[1]) {
      return {
        success: false,
        reply: `Please provide a prefix to search with! ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    let data = await utils.listData(context.args[1])
    if (data[0] == null) {
      return {
        success: true,
        reply: `There is no data with the prefix "${context.args[1]}". ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    console.log('-----------');
    console.log();
    console.log(data);
    console.log();
    console.log('-----------')
    return {
      success: true,
      reply: isPublic ? `Data starting with "${context.args[1]}": ${data.join(' - ')}` : `There are ${data.length} keys that start with "${context.args[1]}". See console, or append chat:true to list the keys in chat.`
    }
  } else {
    return {
      success: false,
      reply: `Unknown Error :P`
    }
  }
}