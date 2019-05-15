module.exports = {
    user: {
        login: 'select * from user where user_name=? and password=? and role=?',
        getById: 'select * from user where id=?'
    },
    farm: {
        add: 'insert into farm (farm_name, image, address, stall_num, temp_thres, humi_thres, illum_thres, amm_thres, h2s_thres, co2_thres) values (?,?,?,?,?,?,?,?,?,?,?)',
        list: 'select * from farm',
        getById: 'select * from farm where id=?'
    }
}