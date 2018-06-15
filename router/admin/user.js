/* 用户操作 */

const router=require('koa-router')();
const userModule=require('.././user');

router
    .get('/', async (ctx)=>{
        ctx.session.token='hq ai jx ...';
        ctx.body=await userModule.userList(1);
    })
    .get('/i', async (ctx)=>{

        ctx.body=ctx.session;

    });

module.exports=router.routes();