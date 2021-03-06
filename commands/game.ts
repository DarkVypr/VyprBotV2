import utils from '../utils'

module.exports = async (client, context) => {
  try {
    let channel = context.args[0] ? context.args[0].toLowerCase().replace('@', '') : context.channel
    const channelData = await utils.fetch(`https://api.ivr.fi/v2/twitch/user/${channel}`)
    let streamData = await utils.streamDetails(channel)
    if (!streamData.data[0]) {
      return {
        success: false,
        reply: `I can only lookup games for channels that are live! ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    streamData = streamData.data[0]
    if (!streamData.game_name) {
      return {
        success: false,
        reply: `${channel} has not yet set their game!`
      }
    }
    const blacklistedGames = ['Music', 'Just Chatting', 'Art', 'Pools, Hot Tubs, and Beaches', 'Talk Shows & Podcasts', 'ASMR', 'Retro', 'Sports', 'Games + Demos', 'Slots', 'Makers & Crafting', 'Food & Drink', 'Software and Game Development', 'Politics', 'Travel & Outdoors', 'Fitness & Health', 'Animals, Aquariums, and Zoos']
    if (blacklistedGames.indexOf(streamData.game_name) != -1) {
      return {
        success: false,
        reply: `"${streamData.game_name}" is blacklisted because It's a category, not a game. ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    const nonSteamGames = ['Fortnite', 'Call of Duty: Warzone', 'League of Legends', 'Super Smash Bros. Ultimate', 'Teamfight Tactics']
    if (nonSteamGames.indexOf(streamData.game_name) != -1) {
      return {
        success: false,
        reply: `${streamData.user_name} is playing ${streamData.game_name}. This is a known non-steam game. If you come across a game like this in the future, use: "${context.prefix}suggest {game_name} is a known non-steam game!"`
      }
    }
    let game = streamData.game_name
    let user_login = streamData.user_name
    let query = await utils.searchSteam(game)
    if (!query) {
      return {
        success: true,
        reply: `${user_login} is playing ${game}. No Steam link available.`
      }
    }
    let id = String(query.appid).replace(/^413180$|^362003$/, '271590')
    let gameDetails = await utils.fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    id = +id
    if (!gameDetails[id].success) {
      return {
        success: false,
        reply: `No Steam data could be found with that game name. Try re-formatting or re-phrasing. ${await utils.bestEmote(context.channel, ['BRUHFAINT', 'BruhFaint', 'PANIC', 'FeelsDankMan', 'FeelsBadMan', '😵', '⛔'])}`
      }
    }
    gameDetails = gameDetails[id].data
    game = gameDetails.name
    const price = gameDetails.price_overview
      ? gameDetails.is_free
        ? 'is free-to-play'
        : `costs ${gameDetails.price_overview.final_formatted}`
      : ''
    const age = gameDetails.required_age > 0
      ? 'Rated ' + gameDetails.required_age + '+.'
      : 'Rated E for everyone.'
    const releaseDate = gameDetails.release_date.date
      ? gameDetails.release_date.coming_soon
        ? gameDetails.release_date.date == 'TBA'
          ? 'To Be Announced'
          : gameDetails.release_date.date
        : gameDetails.release_date.date
      : '(No Release Date Provided)'
    return {
      success: true,
      reply: `${user_login}'s game: ${game} ${price} on Steam. ${age} Released/Releasing: ${releaseDate}. Game link: https://store.steampowered.com/app/${id}`
    }
  } catch (e) {
    return {
      success: false,
      reply: `${e} | Use "${context.prefix}steam" to lookup games on steam. This command is for looking up games that streamers are playing (by channel name).`
    }
  }
}