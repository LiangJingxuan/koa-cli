/* 用户操作 */

const router=require('koa-router')();

router
    .get('/', async (ctx)=>{
        ctx.body='用户的首页-前台';
    });
module.exports=router.routes();