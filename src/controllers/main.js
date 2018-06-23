const picturesModel = require('../models/pictures')

module.exports = function (pool) {
  return {

    async mainGetHandler (ctx) {
      if (ctx.session && ctx.session.userId) {
        const dataPicture = await picturesModel.findAll(pool)
        console.log(dataPicture)

        await ctx.render('main', {
          allPicture: dataPicture
        })
        return
      }
      await ctx.render('index')
    }
  }
}
