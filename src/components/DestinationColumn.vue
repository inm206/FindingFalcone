<template>
  <div class="columns-1 overflow-hidden">
    <text>Destination {{ count }}</text>
    <select v-model="strSelectedPlanet" @change="$emit('planetChosen', this.arrChosen)" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option disabled value="-1">Please select one</option>
      <option v-for="planet in this.arrPlanets" :key="planet.name" :value="planet.name">{{ planet.name }}</option>
    </select>
    <form class="text-left">
      <div v-for="vehicle in this.arrPlanetCapableVehicles" :key="vehicle.name">
        <input type="radio" :id="vehicle.name" :value="vehicle.name" v-model="strSelectedVehicle" :disabled="!vehicle.total_no > 0" @change="$emit('vehicleChosen', this.arrChosen)" />
        <label :for="vehicle.name">{{ vehicle.name }} ({{ vehicle.total_no }})</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DestinationColumn',
  
  props: {
    count: Number,
    arrPlanets: Array,
    arrVehicles: Array
  },

  data () {
    return {
      strSelectedPlanet: "",
      strSelectedVehicle: "",
      intChosenPlanetDistance: 0
    }
  },

  computed: {
    arrPlanetCapableVehicles() {
      if (this.strSelectedPlanet) {
        return this.getPlanetCapableVehicles(this.strSelectedPlanet)
      } else {
        return []
      }
    },

    intTravelTime() {
      if (this.strSelectedVehicle) {
        return this.getTimeToPlanet()
      } else {
        return 0
      }
    },

    arrChosen() {
      return {
        "count": this.count,
        "planet": this.strSelectedPlanet,
        "vehicle": this.strSelectedVehicle,
        "time": this.intTravelTime
      }
    },
  },

  methods: {
    // TODO write function that will get vehicles that can reach passed planet. Find object with value name
    getPlanetCapableVehicles(strPlanet)  {
      let arrCapableVehicles = []
      let intPlanetDistance = this.getPlanetDistance(strPlanet)
      this.intChosenPlanetDistance = intPlanetDistance

      this.arrVehicles.forEach(vehicle => {
        if (vehicle.max_distance >= intPlanetDistance) {
          arrCapableVehicles.push(vehicle)
        }
      })

      return arrCapableVehicles
    },

    getPlanetDistance(strPlanet) {
      let intPlanetDistance = 0
      this.arrPlanets.forEach(planet => {
        if (planet.name === strPlanet) {
          intPlanetDistance = planet.distance
          return
        }
      })
      return intPlanetDistance
    },

    getTimeToPlanet() {
      let intVehicleSpeed = 0
      this.arrVehicles.forEach(vehicle => {
        if (vehicle.name == this.strSelectedVehicle) {
          intVehicleSpeed = vehicle.speed
          return
        }
      })

      return (this.intChosenPlanetDistance / intVehicleSpeed)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
