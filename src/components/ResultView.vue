<template>
  <div v-if="this.strStatus === 'success'">
    <div class="justify-center flex items-center">
      <div class="text-2xl">
        Success! Congratulations on Finding Falcone. King Shan is mighty pleased.
      </div>
    </div>
    <br><br>
    <div class="text-2xl">
      Time taken: {{ this.intTotalTime }}
      <br>
      Planet found: {{ this.strPlanetName }}
    </div>
    <br><br><br>
  </div>
  <div v-if="this.strStatus !== 'success'">
    <div class="justify-center flex items-center">
      <div class="text-2xl">
        Unlucky! Falcone continues to evade King Shan, he is livid.
      </div>
    </div>
    <br><br>
    <div class="text-2xl">
      Time taken: {{ this.intTotalTime }}
    </div>
    <br><br><br>
  </div>
  <div class="justify-center flex items-center">
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 startAgain-button" @click="$emit('restart')">Start Again</button>
    </div>
</template>

<script>
export default {
  name: 'ResultView',
  
  props: {
    intTotalTime: Number,
    strPlanetName: String,
    strStatus: String
  },
  
  emits: ['restart'],

  data () {
    return {

    }
  },

  computed: {

  },

  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
