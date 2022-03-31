 <template>
  <div>
    <input type="file" @change="loadCsvFile" />
    <p>{{ message }}</p>

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
      question:"",
      portions:""

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
    
    pick_two_random_rows:function(items,chosen_row){
      var random_rows = [Math.floor( Math.random()*(items.length-1)+1) , Math.floor( Math.random()*(items.length-1)+1)];
      while(chosen_row in random_rows || random_rows[0]== random_rows[1]){
        var random_rows = [Math.floor( Math.random()*(items.length-1)+1) , Math.floor( Math.random()*(items.length-1)+1)];
      }
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
    randomly_order_answersun:function (correct_answer, fake_answer_1, fake_answer_2){
      let vn = this;
      vn.portions= "";
      var all_answers = [correct_answer, fake_answer_1 , fake_answer_2];
      var all_answers_copy = [correct_answer, fake_answer_1 , fake_answer_2];
      var answers_with_letter_dict = {'A':None, 'B':None, 'C':None};
      for (var key in answers_with_letter_dict){
        var random_num = Math.floor( Math.random()* all_answers.length);
        var chosen_answer = all_answers[random_num-1];
        this.$set(answers_with_letter_dict [key] = chosen_answer);

        vn.portions = key + ' :  ' + answers_with_letter_dict[key];
        var all_answers = all_answers.splice(random_num-1,1);

        
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
      this.question = ""   
      this.$set(question = "Please choose the person who was famous for this: " + new_data[chosen_row][2]);
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][0],new_data[random_rows[0]][0], new_data[random_rows[1]][0]);
    },

    ask_country_question:function(new_data,chosen_row){
      this.question = ""  
      this.$set(question = "Where did "+ new_data[chosen_row][0] + " mainly work?")
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][1],new_data[random_rows[0]][1], new_data[random_rows[1]][1]);
    },

    ask_main_achievement_question:function(new_data,chosen_row){
      this.question = ""  
      this.$set(question = "What did "+ new_data[chosen_row][0] + " do in about " + new_data[chosen_row][4] + "?")
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][2],new_data[random_rows[0]][2], new_data[random_rows[1]][2]);
    },

    ask_key_word_question:function(new_data,chosen_row){
      this.question = ""  
      this.$set(question = "Which words are the most related to " + new_data[chosen_row][0] + "?")
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][3],new_data[random_rows[0]][3], new_data[random_rows[1]][3]);
    },

    ask_year_question:function(new_data,chosen_row){
      this.question = ""  
      this.$set(question = "When did " + new_data[chosen_row][0] + " " + new_data[chosen_row][2] + "?")
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][4],new_data[random_rows[0]][4], new_data[random_rows[1]][4]);
    },

    ask_event_in_japan_question:function(new_data,chosen_row){
      this.question = ""  
      this.$set(question = "What was happening in Japan when "  + new_data[chosen_row][0] + " " + new_data[chosen_row][2] +  "?")
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][5],new_data[random_rows[0]][5], new_data[random_rows[1]][5]);
    },

    ask_period_question:function(new_data,chosen_row){
      this.question = ""  
      this.$set(question = "Please choose Japanese era when "  + new_data[chosen_row][0] + " " + new_data[chosen_row][2] +  "?")
      this.$set(random_rows = pick_two_random_rows(new_data,chosen_row));
      return randomly_order_answers(new_data[chosen_row][6],new_data[random_rows[0]][6], new_data[random_rows[1]][6]);
    },

    


  }
};

</script>

<style>
    .table {
        
      text-align:center;
      

        
        
    }
</style>

