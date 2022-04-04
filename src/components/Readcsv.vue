 <template>
  <div>
    <input type="file" @change="loadCsvFile" @click='send'/>
    <p>{{ message }}</p>
    <button @click="pick_two_random_rows,what_type_of_question,randomly_order_answers,gameplay" >START</button>
    


    <table border="1"  class="table">
      <tr v-for="(worker, index) in workers" :key="index">
        <td v-for="(column, index) in worker" :key="index">{{ column }}</td>
      </tr>
    </table>
  </div>
</template>
 
<script>

export default {

  
  

  data() {
    return {
      message: "",
      workers: [],
      question:{"value":"tu"},
      portions:{"value":""},
      random_rows:{"value":""},
      result:{"value":""}

    };
  },
  methods: {
    loadCsvFile(e) {
      let vm = this;
      vm.workers = [];
      vm.message = "";
      let file = e.target.files[0];

      if (!file.type.match("text/csv")) {
        vm.message = "CSVファイルを選択してください";
        return;
      }

      let reader = new FileReader();
      reader.readAsText(file);


      let items = [];
      reader.onload = () => {
        //ファイル読み込み
        let lines = reader.result.split("\n");
        lines.shift();
        items = [];
        for (let i = 0; i < lines.length; i++) {
          items[i] = lines[i].split(",");
        }
        vm.workers = items;
        
        };
    },

    send(){
      this.$emit("sendQuestion",this.question);
      this.$emit("sendPortions",this.portions);
    },
    
    pick_two_random_rows:function(items,chosen_row){
      this.$set(this.random_rows,"value",[Math.floor( Math.random()*(items.length-1)+1) , Math.floor( Math.random()*(items.length-1)+1)])
      while(chosen_row in random_rows || random_rows[0]== random_rows[1]){
        this.$set(this.random_rows,"value", [Math.floor( Math.random()*(items.length-1)+1) , Math.floor( Math.random()*(items.length-1)+1)])        
      }
      //console.log(random_rows)
      return random_rows;      
    },
    what_type_of_question:function(chosen_column){
      if (chosen_column==0){
        return "Name";
      }else if(chosen_column==1){
        return"Country";
      }else if(chosen_column==2){
        return"Main Achievement";
      }else if(chosen_column==3){
        return"Key Word";
      }else if(chosen_column==4){
        return"Year";
      }else if(chosen_column==5){
        return "Event in Japan";
      }else{
        return"Period";
      }
    },
    randomly_order_answers:function (correct_answer, fake_answer_1, fake_answer_2){
      var all_answers = [correct_answer, fake_answer_1 , fake_answer_2];
      var all_answers_copy = [correct_answer, fake_answer_1 , fake_answer_2];
      var answers_with_letter_dict = {'A':None, 'B':None, 'C':None};
      for (var key in answers_with_letter_dict){
        var random_num = Math.floor( Math.random()* all_answers.length);
        var chosen_answer = all_answers[random_num-1];
        this.$set(answers_with_letter_dict [key] = chosen_answer);

        this.$set(this.portions, "value", key + ' :  ' + answers_with_letter_dict[key]);
        this.all_answers = all_answers.splice(random_num-1,1);

        
        if (correct_answer == A ) {
          if( AisPushed==true){
            return "Correct";
          }else{ return "Incorrect"};        
        }else if(correct_answer == B){
          if(BisPushed == true){
            return "Correct";
          }else{ return "Incorrect" };
        }else if (correct_answer== C){
          if( CisPushed == true){
            return "Correct";
          }else{ return "Incorrect"};
        }

      }
    },
    ask_name_question:function(new_data,chosen_row){         
      this.$set(this.question, "value", "Please choose the person who was famous for this: " + new_data[chosen_row][2])      
      this.$set(this.random_rows,"value",pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][0],new_data[random_rows[0]][0], new_data[random_rows[1]][0]);
    },

    ask_country_question:function(new_data,chosen_row){       
      this.$set(this.question,"value", "Where did "+ new_data[chosen_row][0] + " mainly work?")
      this.$set(this.random_rows,"value", pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][1],new_data[random_rows[0]][1], new_data[random_rows[1]][1]);
    },

    ask_main_achievement_question:function(new_data,chosen_row){       
      this.$set(this.question,"value" ,"What did "+ new_data[chosen_row][0] + " do in about " + new_data[chosen_row][4] + "?")
      this.$set(this.random_rows,"value",pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][2],new_data[random_rows[0]][2], new_data[random_rows[1]][2]);
    },

    ask_key_word_question:function(new_data,chosen_row){       
      this.$set(this.question,"value","Which words are the most related to " + new_data[chosen_row][0] + "?")
      this.$set(this.random_rows,"value",pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][3],new_data[random_rows[0]][3], new_data[random_rows[1]][3]);
    },

    ask_year_question:function(new_data,chosen_row){       
      this.$set(this.question,"value", "When did " + new_data[chosen_row][0] + " " + new_data[chosen_row][2] + "?")
      this.$set(this.random_rows,"value",pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][4],new_data[random_rows[0]][4], new_data[random_rows[1]][4]);
    },

    ask_event_in_japan_question:function(new_data,chosen_row){       
      this.$set(this.question,"value","What was happening in Japan when "  + new_data[chosen_row][0] + " " + new_data[chosen_row][2] +  "?")
      this.$set(this.random_rows,"value",pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][5],new_data[random_rows[0]][5], new_data[random_rows[1]][5]);
    },

    ask_period_question:function(new_data,chosen_row){       
      this.$set(this.question,"value","Please choose Japanese era when "  + new_data[chosen_row][0] + " " + new_data[chosen_row][2] +  "?")
      this.$set(this.random_rows ,"value", pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][6],new_data[random_rows[0]][6], new_data[random_rows[1]][6]);
    },

    while(game_still_going =true && play_again =='Y'){
      this.round_num="Current Round: " + String(current_round)
      this.random_row = Math.random()*(items.length-1)+1
      this.random_column=Math.random()*(items[0].length-1)
      var question_type = what_type_of_question(random_column)

      if(question_type =="Name"){
          this.$set(this.result, "value", ask_name_question(new_data,random_row))
      }else if(question_type=="Country"){
          this.$set(this.result, "result", ask_country_question(new_data,random_row))
      }else if(question_type=="Main Achievement"){
          this.$set(this.result, "result", ask_main_achievement_question(new_data,random_row))
      }else if(question_type=="Key Word"){
          this.$set(this.result,"result",ask_key_word_question(new_data,random_row))
      }else if(question_type=="Year"){
          this.$set(this.result,"result",ask_year_question(new_data,random_row))
      }else if(question_type=="Event in Japan"){
          this.$set(this.result,"result",ask_event_in_japan_question(new_data,random_row))
      }else{
          this.$set(this.result,"result",ask_period_question(new_data,random_row))
      }


    }



    


  }
};

</script>

<style>
    .table {
        
      text-align:center;
      

        
        
    }
</style>

