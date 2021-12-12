<template>
<div>
  <line-chart :chartdata="chartdata" :options="options"/>
  <HelloWorld :msg="msg" />
</div>
</template>

<script>
  import LineChart from '../components/RandomChart.vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default {
    name: 'Chart',
    components: {
      LineChart,
      HelloWorld
    },
    data() {
      return {
        something: [

        ],
        index: 0,
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        chartdata: {},
        tempData: [],
        msg: 'Zeee',
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    sockets: {
      connect: function () {
          console.log('Home socket connected')
          // socket.emit
      },
    },
    mounted () {
      this.sockets.subscribe('serial', (data) => {
        this.message = data.temp;
        console.log('Text:', data.temp);
        console.log('Index:', this.labels[this.labels.length - 1] + 1);
        this.msg = `Temperature: ${data.temp}`
        if(this.tempData.length > 10) {
          // this.labels.shift();
          this.labels.push(this.labels[this.labels.length - 1] + 1);
          // this.tempData.shift();
          this.tempData.push(parseInt(data.temp))
        } else {
          this.tempData.push(parseInt(data.temp))
        }


        this.chartdata = {
          labels: this.labels,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: '#A463BF',
              data: this.tempData
            }
          ]
        }
      });

      // this.chartdata = {
      //   labels: [0, 1, 2 , 3 , 4, 5, 6, 7, 8],
      //   datasets: [
      //     {
      //       label: 'Temperature',
      //       // backgroundColor: '#333333',
      //       data: [10, 5, 4, 53, 34, 10, 25, 100, 24.4]
      //     }
      //   ]
      // }
    }
  }
</script>