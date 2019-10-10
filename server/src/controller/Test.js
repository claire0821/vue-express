const Promise = require('bluebird')
const URL = require('url')
const http = require('http');
const {Stock} = require('../models')
var request = require('request');
var iconv = require('iconv-lite');
const schedule = require('node-schedule') //定时器
const tmpUrl = 'http://hq.sinajs.cn/list='

const config = require('../config/config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

let stockFlag = true // 是否获取股票信息

function processingData(stockID,data)
{
    var sourceData = data
    var search = '\"'
    var startIndex = sourceData.indexOf(search)
    var endIndex = sourceData.indexOf(search,startIndex+1)
    var result = sourceData.substring(startIndex+1,endIndex-1)
    console.log('result: ', result)
    var dataArr = result.split(',')  
    var count = dataArr.length;
    try{
        const stock = Stock.create({
            stockID: 'hq_str_sh601857',
            name: dataArr[0],
            openingPrice: parseFloat(dataArr[1]),
            closingPrice: parseFloat(dataArr[2]),
            currentPrice: parseFloat(dataArr[3]),
            highestPrice: parseFloat(dataArr[4]),
            lowestPrice: parseFloat(dataArr[5]),
            date: dataArr[count-3],
            time: dataArr[count-2]
        })
    }catch (err){
        console.log('stock mysql err:',err)
    }
}
function getData(testUrl)
{
    http.get(testUrl,(res)=>{
    
        var stockData = ""
        res.on("data",(data)=>{
            stockData+=data
        })
        
        res.on("end",()=>{
            res.setEncoding('utf-8')
            console.log(stockData)
            processingData(0,stockData)
        }) 
        
    }).on("error",(e)=>{
        console.log(`获取数据失败: ${e.message}`)
    })
}

function getDataGet(testUrl)
{
    http.get(testUrl,(res)=>{
        res.setEncoding('binary')
        var html = ""
        res.on("data",(data)=>{
            html+=data
        })
        
        res.on("end",()=>{
            var buf = new Buffer(html,'binary')
            var stockData = iconv.decode(buf,'gbk');
            console.log(stockData)
            processingData(0,stockData)
        }) 
        
    }).on("error",(e)=>{
        console.log(`获取数据失败: ${e.message}`)
    })
}

const scheduleCronstyle = (stockID)=>{
    let obj = schedule.scheduleJob('00 * * * * *',()=>{ // 秒 分 时 日 月 星期
        console.log('循环')
        var stockUrl = ''
        stockUrl = tmpUrl + stockID
        console.log(stockUrl)
        getDataGet(stockUrl)
    })
    var currentTime = new Date(Date.now())
    var currentHour = currentTime.getHours()
    var currentMinute = currentTime.getMinutes()
    console.log('currentHour',currentHour)
    if(currentHour >= 15 || (currentHour < 9 && currentMinute > 30))
    {
        stockFlag = false
    }
    if(currentHour > 11 && currentHour < 13)
    if(stockFlag == false)
    {
        obj.cancel()
        console.log('下午三点到早上九点半不进行循环事件')
    }
    // if(currentHour >= 11 || (currentHour < 9 && currentMinute > 30))
    // {
    //     stockFlag
    // }

} 

module.exports = {
    async atest (req, res){
        try{
            var stockID = ''
            stockID = req.body.stockID  
            
            // getData(stockUrl)
            //getDataGet(stockUrl)
            scheduleCronstyle(stockID)
             console.log("ok")
             // res.send(txt.toJSON())
             res.status(200).send({
                 success: "ok"
             })
        }catch(err){
            res.status(400).send({
                error:" error"
            })
            console.log(' error:',err)
        }
    },
    async getPrice (req, res){
        try{
        // const findData = await Stock.findAll({
        //     attributes: ['currentPrice','time'],
        //     limit: 100
        // })
        // sequelize.query("SELECT currentPrice, time FROM mydb.stocks limit 10",{ type: Sequelize.QueryTypes.SELECT})
        // .then(function(stocks){
        //     console.log(stocks)
        //     res.send(stocks)
        // })
        var date = req.body.date
        console.log(date)
        // var sql = "SELECT FORMAT(AVG(currentPrice),2) as currentPrice, date,time FROM mydb.stocks where YEAR(date) = YEAR('${date}') and MONTH(date) = MONTH('${date}') and DAY(date) = DAY('${date}')GROUP BY HOUR(time)"
        var sql = "SELECT FORMAT(AVG(currentPrice),2) as currentPrice, date,time FROM mydb.stocks where YEAR(date) = YEAR(:date) and MONTH(date) = MONTH(:date) and DAY(date) = DAY(:date)GROUP BY HOUR(time)"
        await sequelize.query(sql,
        { replacements: {date: [date]}, type: sequelize.QueryTypes.SELECT})
        .then(function(result){
            console.log(result)
            res.send(result)
        })
        // console.log('findData:',findData)
        // res.send(findData)
        }catch(err){
            res.status(500).send({
                error: err
            })
            console.log('findall err',err)
        }
    },

    async getHourlyPrice (req, res){
        try{
        var time = req.body.time
        console.log(time)
        var date = new Date(Date.now())
        var currentDate = date.toLocaleDateString()
        // var sql = "SELECT FORMAT(AVG(currentPrice),2) as currentPrice, date,time FROM mydb.stocks where YEAR(date) = YEAR('${date}') and MONTH(date) = MONTH('${date}') and DAY(date) = DAY('${date}')GROUP BY HOUR(time)"
        var sql = "SELECT FORMAT(AVG(currentPrice),2) as currentPrice, date,time, FLOOR(MINUTE(time) / 15) AS fifteen FROM mydb.stocks where YEAR(date) = YEAR(:date) and MONTH(date) = MONTH(:date) and DAY(date) = DAY(:date) and time BETWEEN '09:30:00' and '11:30:00' or time BETWEEN '13:00:00' and '15:00:00' and time <= :time GROUP BY HOUR(time),fifteen"
        await sequelize.query(sql,
        { replacements: {date: [currentDate], time: time}, type: sequelize.QueryTypes.SELECT})
        .then(function(result){
            console.log(result)
            res.send(result)
        })
        // console.log('findData:',findData)
        // res.send(findData)
        }catch(err){
            res.status(500).send({
                error: err
            })
            console.log('findall err',err)
        }
    }
}

