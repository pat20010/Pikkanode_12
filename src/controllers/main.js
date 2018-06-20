module.exports = function () {
  return {

    async mainGetHandler (ctx) {
      if(ctx.session && (ctx.session.userId && ctx.session.userId === 20010)) {
       return await ctx.render('main')
      }
      return await ctx.render('index')
    }
    
  }  
}

