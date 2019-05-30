module.exports = {
    user: {
        login: 'select * from user where phone_number=? and password=? and role=?',
        getById: 'select * from user where id=?',
        update: 'update user set user_name=?, sex=?, phone_number=?, farm_id=?, farm_name=? where id=?',
        updateName: 'update user set user_name=? where id=?',
        updateMobile: 'update user set phone_number=? where id=?',
        updatePwd: 'update user set password=? where id=? and password=?',
        updateAvatar: 'update user set avatar=? where id=?',
        add: 'insert into user (user_name, sex, role, phone_number, farm_id, farm_name) values (?,?,?,?,?,?)',
        roleList: 'select * from user where role=?',
        delete: 'delete from user where id=?'
    },
    farm: {
        add: 'insert into farm (farm_name, stall_num, image, address, temp_thres, humi_thres, illum_thres, amm_thres, h2s_thres, co2_thres) values (?,?,?,?,?,?,?,?,?,?)',
        update: 'update farm set farm_name=?, stall_num=?, image=?, address=?, temp_thres=?, humi_thres=?, illum_thres=?, amm_thres=?, h2s_thres=?, co2_thres=? where id=?',
        delete: 'delete from farm where id=?',
        list: 'select * from farm',
        getById: 'select * from farm where id=? and create_time'
    },
    env: {
        list: 'select * from env where farm_id=? and DATE_FORMAT(update_time,"%Y-%m-%d")=?',
        add: 'insert into env (farm_id, temperature, humidity, illuminance, ammonia, h2s, co2) values (?,?,?,?,?,?,?)'
    }
}