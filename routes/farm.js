const router = require('koa-router')();
const db = require('../db');
const { farm, env } = require('../db/sql');

router.prefix('/farm');

router.post('/add', async function (ctx) {
    const { farm_name, stall_num, image, address, temp_thres, humi_thres, illum_thres, amm_thres, h2s_thres, co2_thres } = ctx.request.body;
    const {err, results} = await db.query(farm.add, [farm_name, stall_num, image, address, temp_thres, humi_thres, illum_thres, amm_thres, h2s_thres, co2_thres]);
    if(err) {
        ctx.response.body = db.error('保存失败,请稍后重试');
        return;
    }
    ctx.response.body = db.success(results);    
})

router.post('/update', async function (ctx) {
    const { id, farm_name, stall_num, image, address, temp_thres, humi_thres, illum_thres, amm_thres, h2s_thres, co2_thres } = ctx.request.body;
    const {err, results} = await db.query(farm.update, [farm_name, stall_num, image, address, temp_thres, humi_thres, illum_thres, amm_thres, h2s_thres, co2_thres, id]);
    if(err) {
        ctx.response.body = db.error('保存失败,请稍后重试');
        return;
    }
    ctx.response.body = db.success(results);    
})

router.post('/delete', async function (ctx) {
    const { id } = ctx.request.body;
    const {err, results} = await db.query(farm.delete, [id]);
    if(err) {
        ctx.response.body = db.error('删除失败,请稍后重试');
        return;
    }
    ctx.response.body = db.success(results); 
})

router.post('/list', async function (ctx) {
    const {err, results} = await db.query(farm.list);
    if(err) {
        ctx.response.body = db.error('数据加载失败');
        return;
    }
    ctx.response.body = db.success(results);    

})

router.post('/info', async function (ctx) {
    const { id } = ctx.request.body;
    const {err, results} = await db.query(farm.getById, [id]);
    if(err) {
        ctx.response.body = db.error('数据加载失败');
        return;
    }
    ctx.response.body = db.success(results[0]);  
})

router.post('/env', async function (ctx) {
    const { id } = ctx.request.body;
    const {err, results} = await db.query(env.list, [id]);
    if(err) {
        ctx.response.body = db.error('数据加载失败');
        return;
    }
    ctx.response.body = db.success(results); 
})

module.exports = router;
