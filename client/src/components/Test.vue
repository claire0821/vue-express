<template>
<div class="container">
    <h1>test</h1>
    <label>try test</label>
    <button @click="getDataClick()">getdata</button>
    <!-- <line-chart

      :chartdata="chartdata"
    /> -->
     <div style="width:500px;height:500px" ref="chart"></div>
  <canvas id="my-chart" width="500" height="300"></canvas>
    <button @click="fillData()">Randomize</button>
    <br>
    <button @click="stock()">stock</button>
</div>
</template>

<script>
import TestService from '@/services/TestService'
// import LineChart from './LineChart.js'

// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

// import echarts from 'echarts'

import Chart from 'chart.js'

let dataset = []
let label = []
var timeArr = []
var currentPriceArr = []

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
      timeArr: [],
      currentPriceArr: [],
      priceData: [],
      data1: [],
      articles: {}
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

    // chartget (priceData) {
    //   var data1 = []
    //   for (var i = 0; i < priceData.data.length; i++) {
    //     data1.push(priceData.data[i].currentPriceArr)
    //   }
    //   myChart2.Line({
    //     type: 'line',
    //     data: {
    //       label: ['j', 'f', 'm'],
    //       datasets: [
    //         {
    //           label: 'test1',
    //           data: data1
    //         }
    //       ]
    //     },
    //     options: {

    //     }

    //   })
    // },
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            abel: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            backgroundColor: '#f87900',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },

    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },

    initCharts (priceData) {
      for (var i = 0; i < priceData.data.length; i++) {
        currentPriceArr.push(priceData.data[i].currentPrice)
        timeArr.push(priceData.data[i].time)
      }
      let myChart = this.echarts.init(this.$refs.chart)
      console.log(this.$refs.chart)
      myChart.setOption({
        title: {text: 'echart test'},
        tooltip: {},
        xAxis: {
          type: 'time',
          data: timeArr
        },
        yAxis: {
          type: 'value',
          data: currentPriceArr
        }
      })
    },

    async stock () {
      try {
        const priceData = await TestService.getPrice({
          data: this.data
        })
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
