const router = require('koa-router')();
const db = require('../db');
const { user } = require('../db/sql');

router.prefix('/user');

router.post('/login', async function (ctx) {
  const { name, pwd, role } = ctx.request.body;
  const {err, results} = await db.query(user.login, [name, pwd, role]);

  if(err) {
    ctx.response.body = db.error('登录失败,请稍后重试');
    return;
  }

  if(results.length === 0) {
    ctx.response.body = db.error('用户名或密码不正确');
    return;
  }

  ctx.cookies.set('sessonid', results[0].id, {
    domain: 'localhost',
    maxAge: 1000 * 60 * 60 * 30,
    httpOnly: false
  })

  ctx.response.body = db.success(results[0]);
})

router.post('/logout', function(ctx) {
  ctx.cookies.set('sessonid', '', {
    domain: 'localhost',
    maxAge: 0,
    httpOnly: false
  });
  ctx.response.body = db.success({});
})

router.post('/info', async function (ctx) {
  const id = ctx.cookies.get('sessonid');
  if(!id) {
    ctx.response.body = db.error('当前用户未登录');
    return;
  }

  const {err, results} = await db.query(user.getById, [id]);
  if(err) {
    ctx.response.body = db.error('获取用户信息失败');
    return;
  }

  ctx.response.body = db.success(results[0]);
})

module.exports = router;
