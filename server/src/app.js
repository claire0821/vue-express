const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const {sequelize} = require('./models')
const config = require('./config/config')
const routes = require('./routes')

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


require('./routes')(app)
//#region 利用morgan写日志文档
var fs = require('fs')
var path = require('path')
var logStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags: 'a'})
app.use(morgan('short',{stream:logStream}))
app.use(function(req, res, next){
 res.send('ok')
})
//#endregion
sequelize.sync({force:false})
    .then(() => {
        app.listen(config.port)  
        console.log(`Server started on port ${config.port}`)   
    })
    // console.log("ok")
    // console.log(config.port)
