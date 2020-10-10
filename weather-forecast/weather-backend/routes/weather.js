const request = require('superagent')
const config = require('../config')
const {HOST, API_KEY} = config

module.exports = ({weatherRouter}) => {
  weatherRouter.get('/:city', async (ctx,next)=>{
    const {city} = ctx.params;
    await request
      .get(`${HOST}/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => {
        ctx.body = res.body
      })
      .catch(err => {
        console.log(err)
      })
  })

  weatherRouter.get('/', async (ctx,next)=>{
    await request
      .get(`${HOST}/weather?q=Suzhou&appid=${API_KEY}`)
      .then(res => {
        ctx.body = res.body
      })
      .catch(err => {
        console.log(err)
      })
  })
}