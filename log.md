# vue-express
## 2019-10-10:

### client text.vue修改
#### 全局引用element-ui 使用时间选择器el-date-picker
#### maxTime只能传string，未找到限制maxTime为当前时间

### server test.js修改
#### sequelize.query()原生查询使用replacements防止sql注入
2.2 查询参数替换
原始查询中有两种替换查询参数的方法，以:开头的参数的形式替换或以不命名以?替换。在选项对象中传递参数：
如果传递一个数组，? 会按数组的顺序被依次替换
巢传递一个对象，:key将会用对象的键替换。如果对象中未找到指定键，则会引发异常（反之亦然）
sequelize.query('SELECT * FROM projects WHERE status = ?',
  { replacements: ['active'], type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT * FROM projects WHERE status = :status ',
  { replacements: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

FLOOR(MINUTE(time) / 15) AS fifteen按15分钟计算平均值

## 2019-10-11
### client
增加el-form
拟模糊搜索，从数据库返回匹配数据，或简单地输入股票代码传给服务器，测试代码是否正确。

### server
增加数据表包含股票的名称，id
拟从股票代码范围尝试能否获得返回数据，有返回则确认，存入数据库

## 2019-10-15
### 未解决
for循环次数过大时server端内存不足
Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
### client
el-autocomplete远程搜索，输入股票名字发送给server
接到返回数据后需要设定value值，自定义建议的模版

### server
接收名字后开始Sequelize.Op模糊搜索，返回符合的数组给client
由于内存不足，手动更改股票代码，判断是否为现有股票代码，存入数据库，目前只存有上海大部分股票代码

### 打包
config/index.js     
assetsPublicPath: '/', 改  assetsPublicPath: './',
npm run build
https://www.jianshu.com/p/aae355d692a1