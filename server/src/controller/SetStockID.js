const http = require('http')
const {StockID} = require('../models')
var iconv = require('iconv-lite')
const Url = 'http://hq.sinajs.cn/list='

// const config = require('../config/config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
// const sequelize = new Sequelize(
//     config.db.database,
//     config.db.user,
//     config.db.password,
//     config.db.options
// )


//股票信息字符串转换成数组
function processingData(ID,data)
{
    var sourceData = data
    var search = '\"'
    var startIndex = sourceData.indexOf(search) // 找到第一个引号
    var endIndex = sourceData.indexOf(search,startIndex+1) // 找到第二个引号
    if(endIndex - startIndex > 2) // 有数据为真实股票代码
    {
        var result = sourceData.substring(startIndex+1,endIndex-1)
        console.log('result: ', result)
        var dataArr = result.split(',')
        try{
            (async () => {
                var stocks = await StockID.findAll({
                where: {
                    stockID: ID
                }
            });
            if(stocks.length == 0)
            {
                    const stockid = StockID.create({
                        stockID: ID,
                        name: dataArr[0],
                    })
            }
            else
            {
                StockID.update({name: dataArr[0]}, {where: {stockID: ID}})
            }
        })()

            //     if(stocks.stockID != ID)
            //     {
            //         const stockid = StockID.create({
            //             stockID: ID,
            //             name: dataArr[0],
            //         })
            //     }
            //     else
            //     {
            //         StockID.update({name: dataArr[0]}, {where: {stockID: ID}})
            //     }
            // })
            // const stockid = StockID.create({
            //     stockID: ID,
            //     name: dataArr[0],
            // })

        }catch (err){
            console.log('stock mysql err:',err)
        }
    }
    else {
        return
    }

}
// 获取url数据
function getStocksDate (ID) {
    var stockUrl = ''
    stockUrl = Url + ID
    console.log(stockUrl)

    http.get(stockUrl,(res)=>{
        res.setEncoding('binary')
        var html = ""
        res.on("data",(data)=>{
            html+=data
        })
        
        res.on("end",()=>{
            var buf = new Buffer(html,'binary')
            var stockData = iconv.decode(buf,'gbk');
            console.log(stockData)
            processingData(ID,stockData)
        }) 
        
    }).on("error",(e)=>{
        console.log(`获取数据失败: ${e.message}`)
    })
}
// 将数字前补零
function PrefixInteger(num, n) { 
    return (Array(n).join(0) + num).slice(-n);
}

function getsh () {
    var numID = 0
    var a = 0
    for(a = 900901+0; a < 900901+1000; a++)
    {
        console.log('a=',a)
        var tmpID = 'sh'
        numID++
        // var num = PrefixInteger(numID, 6)
        // console.log(num)
        tmpID = tmpID + a
        console.log(tmpID)
        getStocksDate(tmpID)

    }
}

module.exports = {
    async setID (req, res) {
        try{
            // const user = await StockID.create()
            // res.send(user.toJSON())
            // res.status(200).send({
            //     user:"user"
            // })
            // getStocksDate('sh000001')
            getsh()
            console.log('test')
        }catch (err){
            res.status(400).send({
                error:"this email is already in use."  
            })
            console.log(err)
        }
    },
    async getID (req, res) {
        try{
            console.log(req.body.stockName)
            // var sql = "SELECT from mydb.stockids WHERE name LIKE '%:name%'"
            // sequelize.query(sql,
            // {replacements: {name: [req.body.stockName]}, type: sequelize.QueryTypes.SELECT})
            // .then(function(result){
            //     console.log(result)
            //     res.send(result)
            // })
            var tmp = req.body.stockName
            var name = '%'+tmp+'%'
            var stocks = await StockID.findAll({
                raw: true,
                order: [
                    ['name', 'DESC']
                ],
                where: {
                    name: {
                        [Op.like]: '%'+req.body.stockName+'%'
                    }
                }
            })
            console.log(stocks)
            res.status(200).send({
                stocks: stocks
            })
        } catch (err){
            res.status(400).send({
                error:"can not get id"
            })
            console.log(err)
        }
    }
}