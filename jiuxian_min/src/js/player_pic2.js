function slidePlayer(box,url,num) {
    box = document.getElementById(box);
    var ul = box.getElementsByTagName("ul")[0];
    var point = box.getElementsByClassName('point')[0];
    var a = box.getElementsByClassName('iconfont');

// 页面初始化，自动添加图片及小圆点
    for(var i=0;i<num;i++){
        ul.innerHTML+= `<li><a href="#"><img src="${url}${i+1}.jpg" alt=""></a></li>`;
        point.innerHTML+=`<span data-index="${i}">${i+1}</span>`
    }
    ul.appendChild(ul.firstElementChild.cloneNode(true));
// 根据图片宽度，自动设置ul总宽
    var imgWidth = box.clientWidth;
    ul.style.width = imgWidth*(ul.children.length)+"px";

// 事件绑定
    var count = 0;
    var state = true;
// 图片或小圆点个数
    var pointLen = point.children.length;

// 左侧按钮事件绑定
    a[0].addEventListener("click",function(e){
        e = EventUtil.getEvent(e);
        if(state){
            changeColor();
            state=false;
            if(count<pointLen){
                point.children[(count+1)%pointLen].style.backgroundColor = "red";
                point.children[(count+1)%pointLen].style.color = "white";
                OtherUtil.animate(ul,-(count+1)*imgWidth,10,true,20,function(){state=true});
                count++;
            }else{
                ul.style.left = 0+"px";
                count=1;
                point.children[count].style.backgroundColor = "red";
                point.children[count].style.color = "white";
                OtherUtil.animate(ul,-count*imgWidth,10,true,20,function(){state=true});
            }
        }
    });

// 右侧按钮事件绑定
    a[1].addEventListener("click",function(e){
        e = EventUtil.getEvent(e);
        if(state){
            state=false;
            if(count>0){
                count--;
                OtherUtil.animate(ul,-count*imgWidth,10,true,20,function(){state=true});
            }else{
                ul.style.left = -pointLen*imgWidth+"px";
                count=pointLen-1;
                OtherUtil.animate(ul,-count*imgWidth,10,true,20,function(){state=true});
            }
            changeColor();
            point.children[count].style.backgroundColor = "red";
            point.children[count].style.color = "white";
        }
    });

// 点击小圆点
    point.addEventListener("click",function(e){
        var e = EventUtil.getEvent(e);
        if(e.target.nodeName=="SPAN"){
            changeColor();
            e.target.style.backgroundColor = "red";
            count = parseInt(e.target.getAttribute("data-index"));
            if(state){
                state=false;
                OtherUtil.animate(ul,-count*imgWidth,10,true,20,function(){state=true});
            }
        }
    });

// 自动播放
    var timer = setInterval(function(){
        a[0].click();
    },4000);

// 悬浮时停止自动播放
    box.addEventListener("mouseover",function(){
        clearInterval(timer);
        timer = null;
    });

// 离开时开启自动播放
    box.addEventListener("mouseout",function(){
        timer=setInterval(function(){
            a[0].click();
        },4000);
    });

// 清空小圆点颜色
    function changeColor(){
        Array.from(point.children).forEach(function(item){
            item.style.backgroundColor = "white";
            item.style.color = "black";
        });
    }
}