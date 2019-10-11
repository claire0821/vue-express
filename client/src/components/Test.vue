<template>
<div class="container">
    <button @click="getDataClick()">getdata</button>
    <div class="choose">
    <div class="block" align="left">
      <el-date-picker
      v-model="dateValue"
      type="date"
      placeholder="选择日期"
      align="right"
      :picker-options="datePickerOption"
      @change="setChart()">
      </el-date-picker>
      <br>

      <el-time-select
        is-range
        arrow-control=false
        format="HH:mm"
        value-format="HH:mm"
        v-model="timeValue"
        placeholder="选择结束时间"
        :picker-options="timePickerOption"
        @focus="setMaxTime()"
        @change="setHourlyChart()">
      </el-time-select>
      <br>
      <el-select
      v-model="stockValue"
      placeholder="请输入关键词"
      multiple
      filterable
      remote
      reserve-keyword
      :remote-method="remoteMethod"
      :loading="loading">
        <el-option v-for="item in options" :key="item.value"
        :label="item.label" :value="item.value">
        </el-option>
      </el-select>

    </div>
    <div class="setStock" align="left">
      <el-form :model="stockForm" :inline="true" ref="stockForm"> 
        <el-form-item>
          <el-input v-model="setStockID" placeholder="stock id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(stockForm)">save</el-button>
        </el-form-item>
      </el-form>
    </div>

    </div>

    <canvas id="my-chart" width="500" height="300"></canvas>
    <button @click="fillData()">Randomize</button>
    <br>
    <button @click="stock()">stock</button>
</div>
</template>

<script>
import TestService from '@/services/TestService'
import Chart from 'chart.js'

let dataset = []
let label = []
let cTime = ''
let cPrice = 0
export default {
  name: 'Chart',
  components: {
    Chart
  },
  data () {
    return {
      stockID: 'sh601006',
      chartdata: null,
      data: '',
      orgOptions: {},
      priceData: [],
      data1: [],
      articles: {},
      maxTime: '15:00',
      datePickerOption: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        // selectableRange: '9:00:00 - 15:00:00',
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      dateValue: '',
      timePickerOption: {
        tart: '09:00',
        step: '00:15',
        end: '15:00'
      },
      timeValue: '',

      // select
      options: [],
      stockValue: [],
      list: [],
      loading: false,
      states: [],

      // form
      setStockID: '',
      rules: {
        name: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }

    }
  },
  mounted () {

  },
  methods: {
    async getDataClick () {
      try {
        const response = await TestService.atest({
          stockID: this.stockID
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    async setHourlyChart () {
      try {
        const priceData = await TestService.getHourlyPrice({
          time: this.timeValue
        })
        dataset = []
        label = []
        for (var i = 0; i < priceData.data.length; i++) {
          cPrice = parseFloat(priceData.data[i].currentPrice)
          cTime = priceData.data[i].time
          cTime = cTime.substring(0, 5)
          console.log(cTime)
          console.log(cPrice)
          if (cPrice !== 0) {
            dataset.push(cPrice)
            label.push(cTime)
          }
        }
        let chart = new Chart(document.getElementById('my-chart'), {
          type: 'line',
          data: {
            labels: label,
            datasets: [
              {
                label: '大秦',
                data: dataset
              }
            ]
          },
          options: {
            scales: {
              yAxis: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            }
          },
          tooltips: {
            callbacks: {
            }
          }
        })
        console.log(priceData)
        return chart
      } catch (err) {
        console.log(err)
      }
    },

    async setChart () {
      console.log(this.dateValue.toLocaleDateString())
      var date = this.dateValue.toLocaleDateString().replace(/\//g, '-')
      console.log(date)
      try {
        const priceData = await TestService.getPrice({
          date: date
        })
        dataset = []
        label = []
        for (var i = 0; i < priceData.data.length; i++) {
          cPrice = parseFloat(priceData.data[i].currentPrice)
          cTime = priceData.data[i].time
          cTime = cTime.substring(0, 5)
          console.log(cTime)
          console.log(cPrice)
          if (cPrice !== 0) {
            dataset.push(cPrice)
            label.push(cTime)
          }
        }
        let chart = new Chart(document.getElementById('my-chart'), {
          type: 'line',
          data: {
            labels: label,
            datasets: [
              {
                label: '大秦',
                data: dataset
              }
            ]
          },
          options: {
            scales: {
              yAxis: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            }
          },
          tooltips: {
            callbacks: {
            }
          }
        })
        console.log(priceData)
        return chart
      } catch (err) {
        console.log(err)
      }
    },
    async stock () {
      try {
        const priceData = await TestService.getPrice({
          data: this.data
        })
        dataset = []
        label = []
        for (var i = 0; i < priceData.data[0].length; i++) {
          let cPrice = parseFloat(priceData.data[0][i].currentPrice)
          let cTime = priceData.data[0][i].time
          console.log(cTime)
          console.log(cPrice)
          if (cPrice !== 0) {
            dataset.push(cPrice)
            label.push(cTime)
          }
        }
        let chart = new Chart(document.getElementById('my-chart'), {
          type: 'line',
          data: {
            labels: label,
            datasets: [
              {
                label: '大秦',
                data: dataset
              }
            ]
          },
          options: {
            scales: {
              yAxis: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            }
          },
          tooltips: {
            callbacks: {
              // label(tooltipItem, data) {
              //   const label = data.datasets[tooltipItem.datasetIndex].label
              //   const value = numeral(tooltipItem.yLabel).format('0.00')
              //   return '${label}:${value}'
              // }
            }
          }
        })
        console.log(priceData)
        return chart
      } catch (err) {
        console.log(err)
      }
    },

    // stockForm
    submitForm (formName) {
      // this.$refs[stockForm].validate((valid) => {
      //   if (valid) {
      //     alert('submit1')
      //   } else {
      //     console.log('error submit')
      //     return false
      //   }
      // })
    },

    // select
    remoteMethod () {

    }
  }
}
</script>
