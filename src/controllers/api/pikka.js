const { pictures } = require('../../models')
const pikka = require('../../service/pikka')

async function getPicturePikka (ctx) {
  try {
    const pictureDatas = await pictures.getPictureCommentLikeData()
    console.log(pictureDatas)

    ctx.status = 200
    ctx.body = {
      list: pictureDatas.map(picture => (
        {
          id: picture.id,
          caption: picture.caption,
          picture: `http://localhost:8000/-/imagesUpload/${picture.id}.jpg`,
          createdAt: picture.created_at,
          commentCount: picture.comment_count,
          liked: true,
          likeCount: picture.like_count,
          createdBy: picture.created_by
        }
      ))
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      error: err.message
    }
  }
}

async function postPicturePikka (ctx) {
  console.log(ctx.request.body)
  try {
    const pictureId = await pikka.uploadPicture(
      ctx.request.body.caption,
      ctx.request.files.picture,
      ctx.session.userId
    )

    ctx.status = 200
    ctx.body = {
      id: pictureId
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      error: err.message
    }
  }
}

module.exports = {
  getPicturePikka,
  postPicturePikka
}
