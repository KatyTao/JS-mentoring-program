const request = require('superagent')
require('dotenv').config()

const getUserInfo = (token_type, access_token) => {
  return request
    .get('https://api.github.com/user')
    .set({ 'Accept': 'application/json', 'Authorization': `${token_type} ${access_token}`, 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' })
}

module.exports = ({ oauthRouter }) => {
  oauthRouter.post('/', async (ctx, next) => {
    const { code } = ctx.request.body;
    if (code) {
      const getToken = await request
        .post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`)
        .catch(err => {
          ctx.body = { code: err.status, message: err.message }
        })
      if (getToken.status === 200) {
        const { token_type, access_token } = getToken.body
        const result = await getUserInfo(token_type, access_token).catch(err => {
          ctx.body = { code: err.status, message: err.message }
        })
        if (result.status === 200) {
          ctx.body = {
            code: result.status,
            data: result.body,
          }
        }
      }
    }
  })
}