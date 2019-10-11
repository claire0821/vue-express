const {stockID} = require('../models')

module.exports = {
    async set (req, res) {
        try{
            const user = await stockID.create(req.body)
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
    }
}