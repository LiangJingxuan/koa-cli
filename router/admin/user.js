/* 用户操作 */

const router=require('koa-router')();
const koaBody=require('koa-body');
const paths=require('path');
const userModule=require('../../model/user');

router
    .get('/', async (ctx)=>{
        ctx.session.token='hq ai jx ...';
        ctx.body=await userModule.userList(1);
    })
    .get('/i', async (ctx)=>{

        ctx.body=ctx.session;

    })
    .post('/up', koaBody({
        multipart: true,
        formidable: {
            uploadDir: paths.join(__dirname, '../../www/uploads'),
            keepExtensions: true,
            maxFieldsSize: 2 * 1024 * 1024,
            maxFileSize: 2 * 1024 * 1024,
            onFileBegin: (name,file)=>{
                console.log(name,file);
            },
        },
        onError: (err)=>{
            console.log(11111);
        }
    }), async (ctx)=>{
        ctx.body='test';
        if(!ctx.request.files){
            ctx.body='文件上传失败，请重试！';
        }
    })

    ;

module.exports=router.routes();