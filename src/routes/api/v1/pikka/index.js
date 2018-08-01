const Router = require('koa-router')

const router = new Router()

router.get('/pikka', ctx => {
  ctx.status = 200
  ctx.body = {
    list: [
      {
        id: "2e33875e-a508-450e-a428-433a6ffd9ed6",
        caption: "หน้าตาอย่างน้อง ควรมีพี่เป็นเจ้าของนะครับ ☺️",
        picture: "http://localhost:3000/-/images/d620cb37-797f-48b5-9b3c-865229921ac5",
        createdAt: "2018-06-14T11:32:24.000Z",
        commentCount: 12,
        liked: true,
        likeCount: 5,
        createdBy: "test@test.com"
      },
      {
        id: "0dae605f-a212-488b-8d49-c1db5dd0b88e",
        caption: "Pikkanode is the best",
        picture: "http://localhost:3000/-/images/fca5f3cf-7f88-47a7-b42b-542d80a37d9d",
        createdAt: "2018-06-19T12:32:14.000Z",
        commentCount: 2,
        likeCount: 10,
        liked: false,
        createdBy: "test2@test.com"
      }
    ]
  }
})

router.post('/pikka', ctx => {
  ctx.status = 200
  ctx.body = {
    id: "2e33875e-a508-450e-a428-433a6ffd9ed6",
    createdAt: "2018-06-19T10:33:12.000Z",
  }
})

module.exports = router.routes()
