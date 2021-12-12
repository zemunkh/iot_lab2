<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>...................</p>
    <h3>{{ message }}</h3>
    <button v-on:click="send()">Ywuul</button>

    <button v-on:click="getData()">Aw data </button>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      socket: {},
      context: {},
      message: '',    }
  },
  // sockets: {
  //   connect: function () {
  //       console.log('socket connected')
  //       // socket.emit
  //   },
  // },
  methods: { 
    send: function(event) {
      // event.preventDefault();
      if (event) {
        alert(event.target.tagName)
      }
      console.log("Now we are sendin data");
      this.$socket.emit('send', 'Kakkakakaka Zeee');
    },
    // getData: function() {
    //   this.sockets.subscribe('serial', (data) => {
    //       this.message = data.temp;
    //       console.log('Text:', data.temp);
    //   });
    // } 
    
  },
  // mounted() {
  //   this.sockets.subscribe('serial', (data) => {
  //       this.message = data.temp;
  //       console.log('Text:', data.temp);
  //   });
  // },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
