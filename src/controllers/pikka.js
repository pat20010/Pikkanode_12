const uuidv4 = require('uuid/v4')
const fse = require('fs-extra')
const path = require('path')
const { pictures } = require('../models')

async function createGetHandler (ctx) {
  await ctx.render('upload')
}

async function createPostHandler (ctx) {
  let reqCaption = ctx.request.body.caption
  let reqPathImageUpload = ctx.request.files.uploadImage.path

  const fileName = uuidv4()
  const imagesDir = path.join(process.cwd(), 'src', 'public', 'imagesUpload')
  await fse.move(reqPathImageUpload, path.join(imagesDir, `${fileName}.jpg`))

  const rowsInsert = await pictures.insertPicture(fileName, reqCaption, ctx.session.userId)
  console.log(rowsInsert)

  console.log(imagesDir)
  console.log(reqCaption)
  console.log(reqPathImageUpload)
  await ctx.redirect('/')
}

async function detailGetHandler (ctx) {
  ctx.body = 'Detail get page'
}

async function commentPostHandler (ctx) {
  ctx.body = 'Comment post page'
}

async function likePostHandler (ctx) {
  ctx.body = 'Like post page'
}

module.exports = {
  createGetHandler,
  createPostHandler,
  detailGetHandler,
  commentPostHandler,
  likePostHandler
}
