const AuthenticationController = require('../src/controller/AuthenticationController') 
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('../src/controller/SongsController')
const MarkdownController = require('../src/controller/MarkdownController')
const FileController = require('../src/controller/FileController')
const Test = require('../src/controller/Test')

module.exports = (app) => {
    app.post('/register',
    AuthenticationControllerPolicy.register, // 先检查输入合法性
    AuthenticationController.register) // 再存入数据库

    app.post('/login',
    AuthenticationController.login)

    app.get('/songs',
    SongsController.index)

    app.post('/songs',
    SongsController.post)

    app.get('/songs/:songId',
    SongsController.show)

    app.get('/markdown',
    MarkdownController.index)
    
    app.post('/markdown',
    MarkdownController.post)

    app.get('/markdown/:markdownId',
    MarkdownController.show)

    // app.post('/upload',
    // FileController.upload)

    app.post('/test', // 接口名称 实时信息存入数据库
    Test.atest)

    app.post('/getPrice',
    Test.getPrice)

    app.post('/getHourlyPrice',
    Test.getHourlyPrice)
} 