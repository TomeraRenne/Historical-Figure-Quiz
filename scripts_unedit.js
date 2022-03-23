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



function pick_two_random_rows(new_data,chosen_row){
  var random_rows = [Math.floor( Math.random() * result.length), Math.floor( Math.random() * new_data.length )]
 
 
  while(chosen_row in random_rows || random_rows[0] == random_rows[1]){
    var random_rows = [Math.floor( Math.random() * new_data.length), Math.floor( Math.random() * new_data.length )]
  }
  return random_rows;
}
console.log(pick_two_random_rows(new_data,3));


// ファイル読み取り失敗時
fileReader.onerror = () => {
  items = [];
  message.innerHTML = "ファイル読み取りに失敗しました。"
}
