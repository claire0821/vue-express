const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')) 

function jwtSignUser (user) {
    const ONE_WEEK = 7 * 24 * 60 *60;
    return jwt.sign(user, config.authentication.jwtSecret,{
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try{
            // const {Remail, Rpassword} = req.body
            // console.log(req.body.email)
            const user = await User.create(req.body)
            // const user = await User.create({
            //     email: req.body.email,
            //     password: req.body.password,
            //     time: req.body.time,
            // })
            // console.log(user)
            console.log('user')
            console.log(user.createdAt)
            res.send(user.toJSON())
            // res.status(200).send({
            //     user:"user"
            // })
        }catch (err){
            res.status(400).send({
                error:"this email is already in use."        
            })
            // console.log(err)
        }
    },

    async login (req, res) {
        try{
            const {email, password} = req.body
            console.log(req.body)

            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            // console.log('user:',user)
// 没有此用户
            if(!user){
                return res.status(404).send({
                    error: "The user is not found test"
                })
                // return res.send({
                //     error: "The user is not found test"
                // })
            }
            
            const isPasswordValid = await user.comparePassword(password)
            console.log('isPasswordValid: ',isPasswordValid)
            if(!isPasswordValid){
                return res.status(403).send({
                    error: "The password does not match"
                })
            }

            const now = new Date(Date.now())
            now.setHours(now.getHours()+8)            
            // console.log('now:',now)
            // await user.latestLoginTime(email,now)
            await User.update({latestLogin: now}, {where: {email: email}})
            // user = await userJson.update({
            //     latestLogin: now
            // },{
            //     where: {
            //         email: email
            //     }
            // })

            const userJson = user.toJSON()
            // console.log('userjson: ',userJson)
            // res.status(200).send({
            //     user:userJson,
            // })
            // res.send(user.toJSON())
            // res.status(200).send({
            //     user: user.toJSON()
            // })
            res.status(200).send({
                user: userJson,
                token: jwtSignUser(userJson)
            })       
        }catch (err) {
            console.log('loginerr: ',err)
            res.status(500).send({
                error:"Sth wrong , try again later"
            })
        }
    }
}