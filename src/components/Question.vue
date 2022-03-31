<template>
    <div class="question">
        <h1>Let's start the quiz!</h1>
        <h2>{{ question }}</h2>
        <h3>{{ portions }}</h3>
        
    </div>
</template>

<script>



export default {
    props:['question', 'portions'],

    
    data(){
        return{
            question:"",
            portions:"",

        };
    }
    

}
</script>

<style>
    .question {
        width: 800px;
        border-radius: 20px;
        background:#abe7ff;;
        color:rgb(255, 255, 255);
        text-align:left;
        padding: 100px 0;
        margin: 40px auto;
        
    }
</style>
