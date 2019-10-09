const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')) 

function hashPassword (user, options) {
    const SALT_FACTOR = 8 // 加密密码计算强度1-10
    if(!user.changed('password')) {
        return
    }

    let now = new Date(Date.now())
    now.setHours(now.getHours()+8)
    user.createdAt = now
    user.updatedAt = now

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => user.setDataValue('password', hash))
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        email : {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        latestLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },{
        hooks: {
            beforeSave: hashPassword,
        }
    })

    User.prototype.comparePassword = function (password) {
        // console.log("p")
        // console.log(this.password)
        // var flag = bcrypt.compareAsync(password,this.password)
        // console.log(flag)
        return bcrypt.compareAsync(password, this.password)
    }

    // User.prototype.latestLoginTime = function (email){
    //     let now = new Date(Date.now())
    //     now.setHours(now.getHours()+8)
    //     user.latestLogin = now
    // }
    exports.update = function(email,now){
        return User.findOne({where:{email:email}})
            .then(function(user){
                return user.update({
                    latestLogin: now
                }).then(function(result){
                    console.log("update latest login time success"+result);
                }).catch(function(err){
                    console.log("update latest login time failed"+err)
                })
            })
    }

    User.prototype.latestLoginTime = function (email,now){
        console.log('email,now')
    }

    return User
}
