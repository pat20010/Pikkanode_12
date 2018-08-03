const { pictures } = require('../../models')

async function getPicturePikka (ctx) {
  try {
    const pictureData = await pictures.getPictureCommentLikeData()
    console.log(pictureData)

    ctx.status = 200
    ctx.body = {
      list: [
        {
          id: pictureData[0].id,
          caption: pictureData[0].caption,
          picture: `http://localhost:3000/-/images/${pictureData[0].id}`,
          createdAt: pictureData[0].created_at,
          commentCount: pictureData[0].comment_count,
          liked: true,
          likeCount: pictureData[0].like_count,
          createdBy: pictureData[0].created_by
        }
      ]
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      error: err.message
    }
  }
}

module.exports = {
  getPicturePikka
}
