import utils from '../utils'

module.exports = async (client, context) => {
  if(context.user != 'darkvypr') { return { success: false, reply: `You don't have permission to use that command! Required: Developer/Owner` } }
  if(!context.args[0] || !context.args[1] || !/^add$|^check$|^delete$/.test(context.args[0])) { return { success: false, reply: `Invalid syntax! Usage: "${context.prefix}admin {add|check|delete} {user}"` } }
  [target, action, admins] = [context.args[1].toLowerCase().replace('@', ''), context.args[0].toLowerCase(), (await utils.getData('admins')).split(' ')]
  if(action == 'add') {
    if(admins.indexOf(target) != -1) { return { success: false, reply: `That user is already an admin!` } }
    admins.push(target)
    utils.setData('admins', admins.join(' ').trim())
    return { success: true, reply: `Successfully administered @${target}!` }
  }
  if(action == 'delete') {
    if(admins.indexOf(target) == -1) { return { success: false, reply: `That user is not an admin!` } }
    admins.splice(admins.indexOf(target), 1)
    utils.setData('admins', admins.join(' ').trim())
    return { success: true, reply: `Successfully unadministered @${target}!` }
  }
  if(action == 'check') {
    return { success: true, reply: admins.indexOf(target) == -1 ? `That user is not an admin!` : `That user is an admin!` }
  }
  else {
    return { success: false, reply: `Unknown error occured :P` }
  }
}