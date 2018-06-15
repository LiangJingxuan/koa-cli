const koa=require('koa');
const bodyparser=require('koa-bodyparser');
const session=require('koa-session-minimal');
const router=require('koa-router')();
const statics=require('koa-static-cache');
const paths=require('path');

const deploy=require('./config/default').config;

const app=new koa();

// 中间件配置
app.use(statics(paths.join(__dirname,'./www'),{dynamic:true},{maxAge: 365*24*60*60}));
app.use(bodyparser());
app.use(session({
    key: 'session-id',
    cookie: {
        maxAge: 1000 * 30,
        httpOnly: true,
        overwrite: false
    }
}));

// 路由
router.use('/index', require('./router/layout/index'));
router.use('/admin', require('./router/admin/index'));

app.use(router.routes()).use(router.allowedMethods());
app.listen(deploy.port);
