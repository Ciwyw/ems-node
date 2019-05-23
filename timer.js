const db = require('./db');
const { env } = require('./db/sql');

function timer () {
    setInterval(addEnv, 1000 * 60);
}

async function addEnv () {
    const farm_id = 2;
    const temperature = random(10,30);
    const humidity = random(60,90);
    const illuminance = random(80,110);
    const ammonia = random(0,15);
    const h2s = random(0,10);
    const co2 = random(30,100);
    const {err, results} = await db.query(env.add, [farm_id, temperature, humidity, illuminance, ammonia, h2s, co2]);
    if(err) {
        console.log(err, 'env add error');
        return;
    }
}

function random (min, max) {
    return Math.round(Math.random()*(max-min+1)+min);
}

module.exports = timer;