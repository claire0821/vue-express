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