const koa=require('koa');
const views=require('koa-views');
const bodyparser=require('koa-bodyparser');
const koaBody=require('koa-body');
const session=require('koa-session-minimal');
const router=require('koa-router')();
const statics=require('koa-static-cache');
const paths=require('path');

const deploy=require('./config/default').config;

const app=new koa();

// 模板引擎中间件配置
app.use(views('views',{extension: 'ejs'}));
// 静态资源带缓存中间件配置
app.use(statics(paths.join(__dirname,'./www'),{dynamic:true},{maxAge: 365*24*60*60}));
// post数据接收中间件配置
app.use(bodyparser());
// session中间件配置
app.use(session({
    key: 'session-id',
    cookie: {
        maxAge: 1000 * 30,
        httpOnly: true,
        overwrite: false
    }
}));
// 文件上传中间件配置
/*app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: paths.join(__dirname, '/www/uploads'),
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        maxFileSize: 2 * 1024 * 1024
    },
    onError:(err)=>{
        console.log(11111);
    }
}));*/

// 路由
router.use('/', require('./router/layout/index'));
router.use('/admin', require('./router/admin/index'));

app.use(router.routes()).use(router.allowedMethods());
app.listen(deploy.port);
