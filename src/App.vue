<template>
  <div class="justify-center flex items-center">
    <div class="text-4xl font-bold">
      Finding Falcone!
    </div>
  </div>
  <br><br>
  <div v-if="!blnResults">
    <div class="justify-center flex items-center">
      <div class="text-2xl">
        Select planets you want to search in:
      </div>
    </div>
    <br><br>
    <div class="justify-around flex items-center">
      <div class="columns-5 minHeight50">
        <DestinationColumn count=1 :arr-planets="this.arrPlanets" :arr-vehicles="this.arrVehicles" @planet-chosen="planetChosen" @vehicle-chosen="vehicleChosen" class="minHeight50"/>
        <DestinationColumn count=2 :arr-planets="this.arrPlanets" :arr-vehicles="this.arrVehicles" @planet-chosen="planetChosen" @vehicle-chosen="vehicleChosen" class="minHeight50"/>
        <DestinationColumn count=3 :arr-planets="this.arrPlanets" :arr-vehicles="this.arrVehicles" @planet-chosen="planetChosen" @vehicle-chosen="vehicleChosen" class="minHeight50"/>
        <DestinationColumn count=4 :arr-planets="this.arrPlanets" :arr-vehicles="this.arrVehicles" @planet-chosen="planetChosen" @vehicle-chosen="vehicleChosen" class="minHeight50"/>
        <div class="columns-1 text-2xl">
          <br>
          Time taken: {{ this.intTotalTime }}
        </div>
      </div>
    </div>
    <br><br><br>
    <div class="justify-center flex items-center">
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="executeFind">Find Falcone!</button>
      <br><br>
    </div>
    <div class="justify-center flex items-center text-red-700">
      <p v-if="blnApiError">API error, see console</p>
    </div>
  </div>
  <div v-if="blnResults">
    <ResultView @restart="startAgain" :intTotalTime="this.intTotalTime" :strPlanetName="this.strResultPlanet" :strStatus="this.strResultStatus"  />
  </div>
</template>

<script>
import DestinationColumn from './components/DestinationColumn.vue'
import ResultView from './components/ResultView.vue'

export default {
  name: 'App',
  inject: ['axios'],
  components: {
    DestinationColumn,
    ResultView
  },
  data () {
    return {
      strToken: "",
      arrPlanets: [],
      arrVehicles: [],
      arrVehiclesReceived: [],
      arrSelectedPlanets: ["", "", "", ""],
      arrSelectedVehicles: ["", "", "", ""],
      arrTravelTimes: [0, 0, 0, 0],
      blnResults: false,
      blnApiError: false,
      strResultPlanet: "",
      strResultStatus: ""
    }
  },

  computed: {
    arrDataForFind() {
      return {
        "token": this.strToken,
        "planet_names": [...this.arrSelectedPlanets],
        "vehicle_names": [...this.arrSelectedVehicles]
      }
    },

    intTotalTime() {
      return this.arrTravelTimes.reduce((partialSum, a) => partialSum + a, 0)
    }
  },

  async created() {
    // console.log(this.axios) // injected value
    await this.getToken()
    await this.getPlanets()
    await this.getVehicles()
  },

  mounted() {
    
  },

  methods: {
    async getToken() {
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

    async getPlanets() {
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
    },

    async getVehicles() {
      this.axios.get('vehicles')
        .then(response => {
          // handle success
          console.log(response)
          response.data.forEach(vehicle => {this.arrVehicles.push(vehicle)})
          this.arrVehiclesReceived = JSON.parse(JSON.stringify(this.arrVehicles))
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },

    async executeFind() {
      let apiError = false
      if (this.blnApiError) {
        this.blnApiError = false
      }
      this.axios.post('find', {data: this.arrDataForFind})
        .then(response => {
          // handle success
          console.log(response)
          this.strResultStatus = response.data.status
          this.strResultPlanet = response.data.planet_name
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          apiError = true
        })
        .finally(() => {
          if (!apiError) {
            this.blnResults = true
          } else {
            this.blnApiError = true
          }
        })
    },

    planetChosen(arrDetails) {
      switch(arrDetails.count) {
        case '1':
          this.arrSelectedPlanets[0] = arrDetails.planet
          break
        case '2':
          this.arrSelectedPlanets[1] = arrDetails.planet
          break
        case '3':
          this.arrSelectedPlanets[2] = arrDetails.planet
          break
        case '4':
          this.arrSelectedPlanets[3] = arrDetails.planet
          break
      }
    },

    vehicleChosen(arrDetails) {
      switch(arrDetails.count) {
        case '1':
          this.arrSelectedVehicles[0] = arrDetails.vehicle
          this.arrTravelTimes[0] = arrDetails.time
          break
        case '2':
          this.arrSelectedVehicles[1] = arrDetails.vehicle
          this.arrTravelTimes[1] = arrDetails.time
          break
        case '3':
          this.arrSelectedVehicles[2] = arrDetails.vehicle
          this.arrTravelTimes[2] = arrDetails.time
          break
        case '4':
          this.arrSelectedVehicles[3] = arrDetails.vehicle
          this.arrTravelTimes[3] = arrDetails.time
          break
      }
      this.arrVehicles = JSON.parse(JSON.stringify(this.arrVehiclesReceived))
      this.vehicleCountUpdater()
    },

    vehicleCountUpdater() {
      for (let i = 0; i < this.arrVehicles.length; i++) {
        this.arrSelectedVehicles.forEach(vehicle => {
          if (this.arrVehicles[i].name === vehicle) {
            this.arrVehicles[i].total_no -= 1
          }
        })
      }
    },

    startAgain() {
      // this.blnResults = false
      window.location.reload();
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

.minHeight50 {
  min-height: 50vh
}
</style>
