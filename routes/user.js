const router = require('koa-router')();
const db = require('../db');
const { user } = require('../db/sql');

router.prefix('/user');

router.post('/login', async function (ctx) {
  const { mobile, pwd, role } = ctx.request.body;
  const {err, results} = await db.query(user.login, [mobile, pwd, parseInt(role)]);

  if(err) {
    ctx.response.body = db.error('登录失败,请稍后重试');
    return;
  }

  if(results.length === 0) {
    ctx.response.body = db.error('手机号或密码不正确');
    return;
  }

  const info = results[0];
  ctx.cookies.set('sessonid', info.id, {
    maxAge: 1000 * 60 * 60 * 30,
    httpOnly: false
  })

  ctx.response.body = db.success(info);
})

router.post('/logout', function(ctx) {
  ctx.cookies.set('sessonid', '', {
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

router.post('/check', async function (ctx) {
  const { id } = ctx.request.body;
  const {err, results} = await db.query(user.getById, [id]);
  if(err) {
    ctx.response.body = db.error('获取用户信息失败');
    return;
  }
  ctx.response.body = db.success(results[0]);
})

router.post('/rolelist', async function (ctx) {
  const { role } = ctx.request.body;
  const {err, results} = await db.query(user.roleList, [role]);
    if(err) {
        ctx.response.body = db.error('数据加载失败');
        return;
    }
    ctx.response.body = db.success(results);  
})

router.post('/add', async function (ctx) {
  const { user_name, sex, role, phone_number, farm_id, farm_name } = ctx.request.body;
  const {err, results} = await db.query(user.add, [user_name, sex, role, phone_number, farm_id, farm_name]);  
  if(err) {
    ctx.response.body = db.error('保存失败,请稍后重试');
    return;
}
ctx.response.body = db.success(results); 
})

router.post('/update', async function (ctx) {
  const { user_name, sex, phone_number, farm_id, farm_name, id } = ctx.request.body;
  const {err, results} = await db.query(user.update, [user_name, sex, phone_number, farm_id, farm_name, id]);  
  if(err) {
    ctx.response.body = db.error('保存失败,请稍后重试');
    return;
}
ctx.response.body = db.success(results); 
})

router.post('/update/name', async function (ctx) {
  const id = ctx.cookies.get('sessonid');
  const { user_name } = ctx.request.body;
  const {err, results} = await db.query(user.updateName, [user_name, id]);

  if(err) {
    ctx.response.body = db.error('保存失败');
    return;
  }
  ctx.response.body = db.success(results);
})

router.post('/update/mobile', async function (ctx) {
  const id = ctx.cookies.get('sessonid');
  const { phone_number } = ctx.request.body;
  const {err, results} = await db.query(user.updateMobile, [phone_number, id]);

  if(err) {
    ctx.response.body = db.error('保存失败');
    return;
  }
  ctx.response.body = db.success(results);
})

router.post('/update/pwd', async function (ctx) {
  const id = ctx.cookies.get('sessonid');
  const { old_pwd, new_pwd } = ctx.request.body;
  const {err, results} = await db.query(user.updatePwd, [new_pwd, id, old_pwd]);

  if(err) {
    ctx.response.body = db.error('保存失败');
    return;
  }
  ctx.response.body = db.success(results);
})

router.post('/update/avatar', async function (ctx) {
  const id = ctx.cookies.get('sessonid');
  const { avatar } = ctx.request.body;
  const {err, results} = await db.query(user.updateAvatar, [avatar, id]);

  if(err) {
    ctx.response.body = db.error('头像保存失败');
    return;
  }
  ctx.response.body = db.success(results);
})

router.post('/delete', async function (ctx) {
  const { id } = ctx.request.body;
  const {err, results} = await db.query(user.delete, [id]);
  if(err) {
    ctx.response.body = db.error('删除失败，请稍后重试');
    return;
  }
  ctx.response.body = db.success(results);
})
module.exports = router;
