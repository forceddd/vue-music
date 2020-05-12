
const express = require('express')
const app = express()
const axios = require('axios');
const cors = require('cors');
app.use(cors());
// 获取歌曲列表
app.get('/artist/top/song', async (req, res) => {
  let r = await axios.get(`https://autumnfish.cn/artist/top/song?id=${req.query.id}`)
  // console.log(r.data.songs);
  res.json({
    code: r.data.code,
    more: r.data.more,
    songs: r.data.songs
  })

})
app.get('/song/url', async (req, res) => {
  let r = await axios.get(`https://autumnfish.cn/song/url?id=${req.query.id}`)

  res.json({
    code: r.data.code,
    data: r.data.data
  })

})
app.get('/song/detail', async (req, res) => {
  let r = await axios.get(`https://autumnfish.cn/song/detail?ids=${req.query.ids}`)

  res.json({
    code: r.data.code,
    songs: r.data.songs,
    privileges: r.data.privileges
  })

})
app.get('/comment/hot', async (req, res) => {
  let r = await axios.get(`https://autumnfish.cn/comment/hot?type=0&id=${req.query.id}`)

  res.json({
    code: r.data.code,
    total: r.data.tatal,
    hotComments: r.data.hotComments,
    hasMore:r.data.hasMore,
    topComments: r.data.topComments
  })

})
app.get('/search', async (req, res) => {
  let r = await axios.get(encodeURI(`https://autumnfish.cn/search?keywords=${req.query.keywords}`))

  res.json({
    result:r.data.result,
    code:r.data.code
  })

})
app.get('/mv/url', async (req, res) => {
  let r = await axios.get(`https://autumnfish.cn/mv/url?id=${req.query.id}`)

  res.json({
    data:r.data.data,
    code:r.data.code
  })

})
app.listen(3000, () => {
  console.log('启动在3000端口上');
});