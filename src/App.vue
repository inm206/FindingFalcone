<template>
  <div class="justify-center flex items-center">
    <div class="text-4xl font-bold">
      Finding Falcone!
    </div>
  </div>
  <br><br>
  <div class="justify-center flex items-center">
    <div class="text-2xl">
      Select planets you want to search in:
    </div>
  </div>
  <div class="justify-center flex items-center">
    <div class="columns-5 block">
      <div>
        <p class="block">Destination 1</p>
      </div>
      <div>
        Destination 2
      </div>
      <div>
        Destination 3
      </div>
      <div>
        Destination 4
      </div>
    </div>
    <br><br>
    <div class="columns-5 block">
      <div>
        <select placeholder="Planet" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Planet</select>
      </div>
      <div>

      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  inject: ['axios'],
  components: {
    
  },
  data () {
    return {
      strToken: "",
      arrPlanets: [],
    }
  },

  created() {
    // console.log(this.axios) // injected value
  },

  mounted() {
    this.getToken()
    this.getPlanets()
  },

  methods: {
    getToken() {
      this.axios.post('token')
        .then(response => {
          // handle success
          this.strToken = response.data.token
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },

    getPlanets() {
      this.axios.get('planets')
        .then(response => {
          // handle success
          console.log(response)
          response.data.forEach(planet => {this.arrPlanets.push(planet)})
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
