const { pictures } = require('../models')
const uuidv4 = require('uuid/v4')
const fse = require('fs-extra')
const path = require('path')

/**
 * upload picture
 * upload picture then return picture id
 * @param {string} caption
 * @param {string} picture
 * @param {string} createdBy
 * @returns {Promise<string>}
 */
async function uploadPicture (caption, picture, createdBy) {
  const allowFileType = {
    'image/png': true,
    'image/jpeg': true
  }

  if (!allowFileType[picture.type]) {
    throw new AppError('file type not allow', 400)
  }

  const fileName = uuidv4()
  const imagesDir = path.join(process.cwd(), 'src', 'public', 'imagesUpload')
  await fse.move(picture.path, path.join(imagesDir, `${fileName}.jpg`))

  const pictureId = await pictures.insertPicture(fileName, caption, createdBy)
  return pictureId
}

module.exports = {
  uploadPicture
}
