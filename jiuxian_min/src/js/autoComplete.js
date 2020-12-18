/*
* 依赖文件：
*1、jQuery
* */

function fn1(dt){
    //定义回调函数
    let ul=document.getElementById("search_slide");
    let data=dt["resultList"];
    if(data){
        ul.style.display='block';
        let str='';
        for(let attr of data){
            str+=`<li>
                <a href="/jiuxian_min/src/html/list.html?key=${attr["word"]}">
                    <b>${attr["word"]}</b><span>约<strong>${attr["count"]}</strong>件商品</span>
                </a>
            </li>`
        }
        ul.innerHTML=str;
    }else{
        ul.style.display='none';
    }
}
//搜索自动提示
let inp=document.getElementById("search_input");
document.getElementById("search_slide").style.display="none";
inp.oninput=function(){
    let val=this.value;
    if(!val){
        document.getElementById("search_slide").style.display="none";
    }else{
        document.getElementById("search_slide").style.display="block";
        let script1=document.createElement('script');
        script1.src=`http://list.jiuxian.com/assKeyWords.htm?t=1607182943997&callback=fn1&wd=${val}&area=6&searchUserKey=1331ac0d-ff3d-133d-aa6d-f23a7b79aa4b&randomTest=${Math.random()}&_=1607181637404`;
        document.body.appendChild(script1);
        script1.remove();
    }
}
inp.onblur=function (){
    let timer=setTimeout(function () {
        document.getElementById("search_slide").style.display="none";
    },300);
};