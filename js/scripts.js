let fileInput = document.getElementById('csv_file');
let message = document.getElementById('message');
let fileReader = new FileReader();

// ファイル変更時イベント
fileInput.onchange = () => {
  message.innerHTML = "読み込み中..."

  let file = fileInput.files[0];
  fileReader.readAsText(file, "Shift_JIS");
};

// ファイル読み込み時
let items = [];
fileReader.onload = () => {
  // ファイル読み込み
  let fileResult = fileReader.result.split('\r\n');


  // 先頭行をヘッダとして格納
  let header = fileResult[0].split(',')
  // 先頭行の削除
  fileResult.shift();

  // CSVから情報を取得
  items = fileResult.map(item => {
    let datas = item.split(',');
    let result = {};
    for (const index in datas) {
      let key = header[index];
      result[key] = datas[index];
    }
    return result;
  });

  // テーブル初期化
  let tbody = document.querySelector('#csv_data_table tbody');
  tbody.innerHTML = "";

  //　CSVの内容を表示
  let tbody_html = "";
  for (item of items) {
    tbody_html += `<tr>
      <td>${item.Name}</td>
      <td>${item.Country}</td>
      <td>${item.Main_achievement }</td>
      <td>${item.Key_word}</td>
      <td>${item.Year}</td>
      <td>${item.Event_in_Japan}</td>
      <td>${item.Period}</td>
      </tr>
      `
  }
  tbody.innerHTML = tbody_html;

  message.innerHTML = items.length + "件のデータを読み込みました。"
}

function pick_two_random_rows(items,chosen_row){
var random_rows = [Math.floor( Math.random()*(items.length-1)+1) , Math.floor( Math.random()*(items.length-1)+1)];
  while(chosen_row in random_rows || random_rows[0]== random_rows[1]){
    var random_rows = [Math.floor( Math.random()*(items.length-1)+1) , Math.floor( Math.random()*(items.length-1)+1)];
  }
  return random_rows;
  
}


function what_type_of_question(chosen_column)
{
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
}

function ask_name_question(items,chosen_row){
  console.log("Please choose who was famous for this:" + items[chosen_row][2])
  random_rows=  pick_two_random_rows(items,chosen_row)
  return
  randomly_order_answers(items[chosen_row][0], items[random_row[0]][0],items[random_rows[1]][0])
}

function ask_coutry_question(items,chosen_row){
  console.log("Where did " + items[chosen_row][0] + " mainly work?")
  
  random_rows=  pick_two_random_rows(items,chosen_row)
  return
  randomly_order_answers(items[chosen_row][1], items[random_row[0]][0],items[random_rows[1]][0])
}

// ファイル読み取り失敗時
fileReader.onerror = () => {
  items = [];
  message.innerHTML = "ファイル読み取りに失敗しました。"
}
