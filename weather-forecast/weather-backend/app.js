const Koa = require('koa');
const Router = require('koa-router');
const koaRequest = require('koa-http-request');
const PORT = 8080;
const logger = require('koa-logger')
const cors = require('@koa/cors');
const app = new Koa();
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
// require our external routes and pass in the router
require('./routes/basic')({ router }); //const basicRoutes = require('./routes/basic'); basicRoutes({router});
require('./routes/weather')({weatherRouter})
// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

const server = app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
module.exports = server;