const { pictures } = require('../models')

async function mainGetHandler (ctx) {
  if (ctx.session && ctx.session.userId) {
    const rowsPicture = await pictures.getAllPictureData()
    console.log(rowsPicture)

    await ctx.render('main', {
      allPicture: rowsPicture
    })
    return
  }
  await ctx.render('index')
}

module.exports = {
  mainGetHandler
}
