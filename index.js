const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');

const nightmare = Nightmare({ show: true });
const url = 'https://news.ycombinator.com';

//make request (nightmare)
nightmare
  .goto(url)
  .wait('body')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
.then(response => {
  console.log(getData(response));
}).catch(err => {
  console.log(err);
});

//parse date (cheerio)
let getData = html => {
  const data = [];
  const $ = cheerio.load(html);
  $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
    let story = {
      title : $(elem).text(),
      link : $(elem).find('a.storylink').attr('href')
    }
    data.push(story);
  });
  fs.writeFileSync('data.json', JSON.stringify({ data }));
  return data;
}
