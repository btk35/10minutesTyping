'use strict';

/*
予定：
・入力にあわせて左のテキストの文字色を変えたい
　（正誤判定で間違いなら赤、あっていたら薄くする等
    背景の幅を1remでとって変えていく案
・入力量に応じたスクロール
・使い方と更新の説明モーダル作って横にfix
*/

//counter
const input = document.getElementById('js-inp');//入力文字
const len = document.getElementById('length');//文字数カウントのspanエリア
const resetter= document.querySelector(".reset");
let total= 0; 
let totalScore= document.querySelector(".totalScore");
const start = document.querySelector(".js-record button");

//タイマー開始イベント
input.addEventListener('keydown',()=>{
  clearInterval(countDown);
  timerFunc();
},{once: true});

//文字数カウントイベント
input.addEventListener('keydown',()=>{
  let inputText = input.value.replace(/\n/g, '');
  len.innerHTML =`${inputText.length} 文字`;
});

//timer and reset
let count = 600;
const timer = document.querySelector('.timer');//時間表示エリア
let countDown;

function timerFunc(){
  count = 600;
   countDown =  setInterval(()=>{
    count--;
    timer.innerHTML = `あと${Math.floor(count/60)}分${Math.floor(count%60)}秒`;
    if (count === 0) {
      clearInterval(countDown);
      input.disabled = true;
      window.alert("お疲れ様でした！reset & sumボタンを押して合計数を確認してください")
    }
  },1000);
};
//clearIntervalはsetIntervalのスコープ内でないと効かないことを失念し、迷走する


function closeInputArea(){
  input.addEventListener('input',function(){
    input.disabled= false;
    },{once: true}
  );
}
closeInputArea();

resetter.addEventListener('click',()=>{
  total += input.textLength;
  totalScore.innerHTML= `total:　${total}`;
  input.disabled= false;
  input.value="";
  closeInputArea();
});

//タブ切り替えのテキスト
const tabList = document.querySelectorAll(".text-num li"); //liリスト
const textTab = document.querySelectorAll(".text-tab p");//pリスト
const aozoraTextTab = document.querySelectorAll(".text-tab blockquote")

for(let clickedTab of tabList){
  clickedTab.addEventListener("click",(e)=>{
    for (let tab of tabList){
      tab.classList.remove("num-active");    
    }

    const clickedLi = e.target;
    const index = Array.from(tabList).indexOf(clickedLi);
    clickedLi.classList.add("num-active");

    if(textTab.length > 0){
      for(let p of textTab){
        p.classList.remove("active");
      }
      textTab[index].classList.add("active");      
      }else{
          for(let q of aozoraTextTab){
          q.classList.remove("active");
          }
          aozoraTextTab[index].classList.add("active");
      };
   });
};

//伸ばす
