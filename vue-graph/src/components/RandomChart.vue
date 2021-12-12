<template>
  <div class="small">
    <line-chart :chart-data="chartdata" :options="options"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    props: {
      chartdata: Object
    },
    data () {
      return {
        datacollection: null,
            options: {
              color: ['grey'],
                maintainAspectRatio: false,
                responsive: false,
                title: {
                    display: true,
                    text: 'Бодит хугацаанд авч буй Температурын дата',
                    fontSize: 18
                },
                legend: {
                    display: true
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      min: -20,
                      max: 60,
                    }
                  }]
                }
            }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>