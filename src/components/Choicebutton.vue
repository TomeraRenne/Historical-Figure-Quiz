<template>

  
    <div class="btn btn--orange btn--radius" @click='A'>A</div>
    <div class="btn btn--orange btn--radius" @click='B'>B</div>
    <div class="btn btn--orange btn--radius" @click='C'>C</div>

</template>

<script>
export default {
  components:{},
  data(){
    return{
      AisPushed:false,
      BisPushed:false,
      CisPushed:false
    }
  },
  methods:{
    A(){
      this.AisPushed = true
    },
    B(){
      this.BisPushed = true
    },
    C(){
      this.CisPushed = true
    },
    

  }

}
</script>

<style>

  *,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

.btn,
a.btn,
button.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
  margin: 40px;
}

.btn--orange,
a.btn--orange {
  color: #fff;
  background-color: #ecb2d9;
}

.btn--orange:hover,
a.btn--orange:hover {
  color: #fff;
  background: #ff60ca;
}

a.btn--radius {
  border-radius: 100vh;
}

</style>