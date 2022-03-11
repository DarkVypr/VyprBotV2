import utils from '../utils'

module.exports = async (client, context) => {
  if(!context.args[0]) { return { success: false, reply: `Provide a target.` } }
  const target = context.args[0].replace('@', '')
  context.args.shift()
  const message = context.args[0] ? context.args.join(' ') : 'catKISS 💘'
  return { success: true, reply: `${context.display} tucks ${target} goodnight and kisses their forehead: ${message} 💤` }
}