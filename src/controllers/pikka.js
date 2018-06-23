const uuidv4 = require('uuid/v4')
const fse = require('fs-extra')
const path = require('path')
const picturesModel = require('../models/pictures')

module.exports = function (pool) {
  return {

    async createGetHandler (ctx) {
      await ctx.render('upload')
    },

    async createPostHandler (ctx) {
      let reqCaption = ctx.request.body.caption
      let reqPathImageUpload = ctx.request.files.uploadImage.path

      const fileName = uuidv4()
      const imagesDir = path.join(process.cwd(), 'src', 'public', 'imagesUpload')
      await fse.move(reqPathImageUpload, path.join(imagesDir, `${fileName}.jpg`))

      const [rowsInsert] = await picturesModel.insertPictures(pool, fileName, reqCaption, ctx.session.userId)
      console.log(rowsInsert)

      console.log(imagesDir)
      console.log(reqCaption)
      console.log(reqPathImageUpload)
      await ctx.redirect('/')
    },

    async detailGetHandler (ctx) {
      ctx.body = 'Detail get page'
    },

    async commentPostHandler (ctx) {
      ctx.body = 'Comment post page'
    },

    async likePostHandler (ctx) {
      ctx.body = 'Like post page'
    }
  }
}
