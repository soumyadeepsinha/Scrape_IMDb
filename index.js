const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const { gzip } = require('zlib')
const json2csv = require('json2csv').Parser

const movies = ['https://www.imdb.com/title/tt8110330/?ref_=nv_sr_srsg_0', 'https://www.imdb.com/title/tt1187043/?ref_=nv_sr_srsg_0', 'https://www.imdb.com/title/tt0405508/?ref_=nv_sr_srsg_0'];
(async () => {
  let imdbData = [];
  for (let movie of movies) {
    const response = await request({
      uri: movie,
      headers: {
        'Accept': 'text / html, application/ xhtml + xml, application/ xml; q = 0.9, image / webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en - US, en; q = 0.5'
      },
      gzip: true,
    });

    let $ = cheerio.load(response)
    let title = $('div[class="title_wrapper"] > h1').text().trim()
    let genre = $('a[href="/search/title?genres=comedy&explore=title_type,genres&ref_=tt_ov_inf"]').text().trim()
    let genreTwo = $('a[href="/search/title?genres=drama&explore=title_type,genres&ref_=tt_ov_inf"]').text().trim()
    let releaseDate = $('a[title="See more release dates"]').text().trim()
    let rating = $('div[class="ratingValue"] > strong > span').text()
    let summary = $('div[class="summary_text"]').text().trim()

    imdbData.push({
      title, genre, genreTwo, releaseDate, rating, summary
    });
  }

  const json = new json2csv()
  const csv = json.parse(imdbData)

  fs.writeFileSync('./imdb.csv', csv, 'utf-8')
})();

