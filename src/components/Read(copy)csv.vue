 <template>
  <div>
    <input type="file" @change="loadCsvFile"  @click='send'/>
    <p>{{ message }}</p>
    <p>{{ new_data }}</p>
    <p>{{ random_rows }}</p>
    <p>{{ round_row }}</p>
    <button @click=" pick_two_random_rows(new_data,random_row);gameplay($event);randomly_order_answers(correct_answer, fake_answer_1, fake_answer_2)" >START</button>
    <p>{{ chosen_row }}</p>
    <p>{{ portions }}</p>


    <table border="1"  class="table">
      <tr v-for="(info, index) in new_data" :key="index">
        <td v-for="(column, index) in info" :key="index">{{ column }}</td>
      </tr>
    </table>
  </div>
</template>
 
<script>

export default {

  
  

  data() {
    return {
      message: "",
      new_data: [],
      round_num:0,
      random_row:0,
      random_column:0,
      current_round:1,
      chosen_row:0,
      question:"",
      portions:"",
      random_rows:[],
      result:{"value":""}

    };
  },
  methods: {
    loadCsvFile(e) {
      let vm = this;
      vm.new_data = [];
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
        //lines.shift();
        items = [];
        for (let i = 0; i < lines.length; i++) {
          items[i] = lines[i].split(",");
        }
        vm.new_data = items;

        };
    },

    send(){
      this.$emit("sendQuestion",this.question);
      this.$emit("sendPortions",this.portions);
    },
    
    pick_two_random_rows:function(new_data,chosen_row,random_rows){
      this.random_rows = [Math.floor( Math.random()*(new_data.length-1)+1) , Math.floor( Math.random()*(new_data.length-1)+1)]
      if(chosen_row in random_rows || random_rows[0]== random_rows[1]){
        this.random_rows= [Math.floor( Math.random()*(new_data.length-1)+1) , Math.floor( Math.random()*(new_data.length-1)+1)]
 
      }
      //console.log(random_rows)
      //return random_rows;      
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
        this.answers_with_letter_dict [key] = chosen_answer;

        this.portions= key + ' :  ' + answers_with_letter_dict[key];
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
      this.question="Please choose the person who was famous for this: " + new_data[chosen_row][2]    
      this.random_rows=pick_two_random_rows(new_data,chosen_row);
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

    gameplay:function(new_data,current_round,random_row){
      this.round_num="Current Round: " + current_round
      this.random_row = Math.random()*(new_data.length-1)+1
      this.random_column=Math.random()*(new_data[0].length-1)
      var question_type = this.what_type_of_question(random_column)

      if(question_type =="Name"){
          this.result=this.ask_name_question(new_data,random_row)
      }else if(question_type=="Country"){
          this.result=this.ask_country_question(new_data,random_row)
      }else if(question_type=="Main Achievement"){
          this.result=this.ask_main_achievement_question(new_data,random_row)
      }else if(question_type=="Key Word"){
          this.result=this.ask_key_word_question(new_data,random_row)
      }else if(question_type=="Year"){
          this.result=this.ask_year_question(new_data,random_row)
      }else if(question_type=="Event in Japan"){
          this.result=this.ask_event_in_japan_question(new_data,random_row)
      }else{
          this.result=this.ask_period_question(new_data,random_row)
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

