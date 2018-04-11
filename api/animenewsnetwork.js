const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')

const baseURL = 'http://anidb.net/perl-bin'

const animeEncylopedia = {
  async getAllAnime (page=0) {
    const {data} = await axios.get(`${baseURL}/animedb.pl?show=animelist&orderby.name=0.1&noalias=1&h=1&page=${page}&view=list`)

    const $ = cheerio.load(data)
    const content = $('table#animelist')
    const animes = $('tbody tr', content)
      .map((index, el) => {
        const id = $('.thumb.anime a', el).attr('href').replace('animedb.pl?show=anime&aid=', '')
        const title = $('.name.main.anime a', el).text()
        const image = $('.thumb.anime a picture source', el).attr('srcset')
        const type = $('.type', el).text().trim()
        const episodes = $('.count.eps', el).text().trim()
        const rating = $('.rating.weighted', el).text().trim()
        const user = $('.count.members', el).text().trim()
        const aired = $('.date.airdate', el).text().trim()
        const ended = $('.date.enddate', el).text().trim()
        return {
          id,
          title,
          image,
          type,
          episodes,
          rating,
          user,
          aired,
          ended
        }
      }).get()
    return animes
  },
  async getAnime (id=0) {
    const {data} = await axios.get(`${baseURL}/animedb.pl?show=anime&aid=${id}`)

    const $ = cheerio.load(data)
    const content = $('div.g_content')
    const section_info = $('div.g_section.info', content)
    const definition_list = $('.g_definitionlist', section_info)

    const processed = {}
    processed.main_title = $('.romaji .value span', definition_list).html()
    processed.official_title = $('.official .value label', definition_list).html()
    processed.description = $('div.g_bubble.g_section.desc', content).text()
    processed.image = $('picture img', section_info).attr('src')
    processed.year = $('.year .value', definition_list).text().trim()
    processed.tags = $('.tags .value .g_tag', definition_list)
      .map((index, el) => {
        const genre = $('.tagname', el).html()
        return genre
      }).get()

    return processed
  }
}

module.exports = animeEncylopedia
