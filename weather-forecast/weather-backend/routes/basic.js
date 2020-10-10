module.exports = ({router}) => {
  router.get('/', (ctx, next) => {
    console.log(ctx)
    ctx.body = 'Hello World!';
  })
}