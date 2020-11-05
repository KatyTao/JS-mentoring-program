const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const koaBody = require('koa-body');
const config = require('./config')
const {PORT} = config
const logger = require('koa-logger');
const joi = require('joi')
const validate = require('koa-joi-validate')
const cors = require('@koa/cors');
const app = new Koa();
app.use(serve('./public'));
app.use(cors())
app.use(logger())



// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

const router = new Router();
const weatherRouter = new Router({
  prefix:'/weather'
})

const uploadRouter = new Router({
  prefix:'/upload'
})

const oauthRouter = new Router({
  prefix: '/authorization_code'
})

// require our external routes and pass in the router
require('./routes/basic')({ router }); //const basicRoutes = require('./routes/basic'); basicRoutes({router});
require('./routes/weather')({weatherRouter})
require('./routes/upload')({uploadRouter})
require('./routes/oauth')({oauthRouter})
// tells the router to use all the routes that are on the object

app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2000*1024*1024, //文件最大限制，默认2M
  }
}))

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());
app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());
app.use(oauthRouter.routes());
app.use(oauthRouter.allowedMethods());


const server = app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
module.exports = server;