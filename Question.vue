<template>
    <div class="question">
        <h1>'Welcome to the Historical Figure Quiz!!'</h1>
        <p>{{ round_num }}</p>
        <h2>{{ question }}</h2>
        <h3>{{ portions }}</h3>
        
    </div>
</template>

<script>



export default {
    props:['question', 'portions'],

    
    data(){
        return{           
            round_num:"CurrentRound 1",
            lives_remaining : 3,
            game_still_going : true,
            //game_still_going == lives_remaining >=1,
            current_round : 1,
            score : 0,
            play_again : 'Y',
            score_list : [],
            result : null
            

        };
    },
    
    
    

    
    
    

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