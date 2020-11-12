const request = require('superagent')
const config = require('../config')
const { HOST, API_KEY } = config
const Redis = require('ioredis');
const client = new Redis()

module.exports = ({ weatherRouter }) => {
  weatherRouter.get('/:city', async (ctx, next) => {
    const { city } = ctx.params;
    let redisResult = await client.get(`${city}`)
    let finalResult;
    if (!redisResult) {
      const requestResult = await request.get(`${HOST}/forecast?q=${city}&appid=${API_KEY}&units=metric`).catch(err => {
        console.log(err.message)
      })
      if (requestResult && requestResult.status === 200) {
        client.set(`${city}`, JSON.stringify(requestResult.body))
        finalResult = requestResult.body
      } else {
        finalResult = {code:200, message: 'Not found'}
      }
    } else {
      finalResult = redisResult
    }
    ctx.body = finalResult
  })

  weatherRouter.get('/', async (ctx, next) => {
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