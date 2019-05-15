const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const db = require('../db');

const ip = '192.168.43.97:3000';

router.post('/upload', async function (ctx) {
    const { file } = ctx.request.files;
    const reader = fs.createReadStream(file.path);
    const targetPath = path.join(__dirname, '../public/images/') + `/${file.name}`;
    const writer = fs.createWriteStream(targetPath);
    reader.pipe(writer);

    const data = {
        uri: `http://${ip}/images/${file.name}`
    };
  ctx.response.body = db.success(data);
})

module.exports = router;
