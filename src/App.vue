<template>
  <h1>Historical Figure Quiz</h1>
  <h2>ようこそ歴史人物道場へ！</h2>
  <Readcsv />
  <button @click='start'>play</button>
  <Question :question='question' v-if="isPlaying" />
  <Choicebutton v-if="isPlaying"/>
</template>

<script>
import Readcsv from './components/Readcsv.vue'
import Question from './components/Question.vue'
import Choicebutton from './components/Choicebutton.vue'

export default {
  name: 'App',
  components: { Readcsv , Question , Choicebutton },
  data(){
    return{
      isPlaying: false,
      
     

      
    }
  },
  
  methods:{
    start(){
      this.isPlaying = true
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