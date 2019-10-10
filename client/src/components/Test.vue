<template>
<div class="container">
    <h1>test</h1>
    <label>try test</label>
    <button @click="getDataClick()">getdata</button>
    <!-- <line-chart

      :chartdata="chartdata"
    /> -->
    <div class="block">
      <span></span>
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
    </div>
      <!-- value-format="yyyyMMddHHmmss" -->
     <div style="width:500px;height:500px" ref="chart"></div>
  <canvas id="my-chart" width="500" height="300"></canvas>
  <el-button type="primary"></el-button>
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
      timeValue: ''
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
    }
  }
}
</script>
