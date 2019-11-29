var Rows = document.getElementById("rows");
var Cols = document.getElementById("cols");
var area = document.getElementById("area");
var Closebtn = document.getElementById("setting_close_button");
var SetBtn = document.getElementById("setting_setting_button");
var Enablebtn = document.getElementById("setting_enable");
var IdsetBtn = document.getElementById("setting_deskID");
var SetNameBtn = document.getElementById("setting_name");
var Set = document.getElementById("setting");
var random = document.getElementById("random");

var rows = 0;
var cols = 0;
var buttons = [];

Closebtn.onclick = function(){
  Set.style.display = "none";
}

rows.oninput = function(){
  if(isNaN(this.value)){
    this.value = this.value.slice(0,-1);
  }else{
    rows = parseInt(this.value);
  }
  generate();
}

Cols.oninput = function(){
  if(isNaN(this.value)){
    this.value = this.value.slice(0,-1);
  }else{
    cols = parseInt(this.value);
  }
  generate();
}

SetBtn.onclick = function(){
  var id = parseInt(IdsetBtn.value);
  if(SetNameBtn.value != ""){
    buttons[id].name = SetNameBtn.value;
    buttons[id].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(id)+'</span>';
    buttons[id].innerHTML += SetNameBtn.value;
  }else{
    buttons[id].name = "";
    buttons[id].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(id)+'</span>';
    buttons[id].innerHTML += '<span style="color:gray">이름 입력</span>';
  }
  buttons[id].using = Enablebtn.checked;
  if(!buttons[id].using){
    buttons[id].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(id)+'</span>';
    buttons[id].innerHTML += '<span style="color:red">사용 안함</span>';
  }
  Set.style.display = "none";
}

random.onclick=function(){
  var shuffle = [];
  var j=0;
  for(var i=0;i<buttons.length;i++){
    if(buttons[i].using){
      shuffle[j] = buttons[i].name;
      j += 1;
    }
  }

  var using = [];
  for(var i=0;i<buttons.length;i++){
    using[i] = buttons[i].using;
  }

  // 섞기
  shuffle = shuffle.sort(function(){return 0.5-Math.random()});

  // 재배치
  var buttonsHTML = '';
  var c=0;
  for(var i=0;i<cols;i++){
    buttonsHTML += '<div>';
    for(var j=0;j<rows;j++){
      buttonsHTML += '<button class="desk" id="'+String(c)+'">' + '</button>';
      c += 1;
    }
  }
  area.innerHTML = buttonsHTML;

  buttons = [];
  var j=0;
  for(var i=0;i<cols*rows;i++){
    buttons[i] = document.getElementById(String(i));
    buttons[i].onclick = function(){
      Set.style.display = "block";
      Enablebtn.checked = this.using;
      IdsetBtn.value = this.id;
      SetNameBtn.value = this.name;
    }

    buttons[i].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(i)+'</span>';
    buttons[i].using = using[i];
    if(buttons[i].using){
      buttons[i].name = shuffle[j];
      if(buttons[i].name == ""){
        buttons[i].innerHTML += '<span style="color:gray">이름 입력</span>';
      }else{
        buttons[i].innerHTML += buttons[i].name;
      }
      j+=1;
    }else{
      buttons[i].name = "";
      buttons[i].innerHTML += '<span style="color:red">사용 안함</span>';
    }
  }
}

function generate(){
  if(cols != 0 && rows != 0){
    // 버튼 HTML 생성
    var buttonsHTML = '';
    for(var i=0;i<cols;i++){
      buttonsHTML += '<div>';
      for(var j=0;j<rows;j++){
        buttonsHTML += '<button class="desk" id="'+String(i*rows+j)+'">' + '</button>'
      }
      buttonsHTML += '</div>';
    }
    area.innerHTML = buttonsHTML;

    // 버튼 속성 초기화

    buttons = [];
    for(var i=0;i<cols*rows;i++){
      buttons[i] = document.getElementById(String(i));
      buttons[i].onclick = function(){
        Set.style.display = "block";
        Enablebtn.checked = this.using;
        IdsetBtn.value = this.id;
        SetNameBtn.value = this.name;
      }
      buttons[i].name = "";
      buttons[i].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(i)+'</span>';
      buttons[i].innerHTML += '<span style="color:gray">이름 입력</span>';
      buttons[i].using = true;
    }
    random.style.display = "block"
  }
}