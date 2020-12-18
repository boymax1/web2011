//获取操作对象
function utilPlayer(){
    let btns = $(".player-btn a");
    let imgs = $(".pic-list ul li");
    let box=$(".player .inner-width1200")[0];
    var dsq1,dsq2;
//设置当前显示图片的下标
    var imgIndex=0;
    move(imgs[imgIndex],100);

//创建自动执行函数
    function autoMove(){
        //把当前图片进行透明
        imgs[imgIndex].style.opacity=0.1;
        imgs[imgIndex].style.zIndex=1;
        //把当前图片对应的按钮class属性值清空
        btns[imgIndex].className='';
        //获取下一次要显示的图片下标
        imgIndex++;
        if(imgIndex>imgs.length-1){
            imgIndex=0;
        }
        move(imgs[imgIndex],100);
        imgs[imgIndex].style.zIndex=2;
        //把当前图片对应的按钮class属性值清空
        btns[imgIndex].className='selected';
    }
//当鼠标移入到大盒子中时，清除定时器
    box.onmouseover=function(){
        clearInterval(dsq2);
    }
    box.onmouseout=function(){
        dsq2=setInterval(autoMove,3000);
    }
//给每个按钮绑定点击事件
    for(let i=0;i<btns.length;i++){
        btns[i].onmouseover=function(){
            //把当前图片进行透明
            imgs[imgIndex].style.opacity=0.1;
            imgs[imgIndex].style.zIndex=1;
            //把当前图片对应的按钮class属性值清空
            btns[imgIndex].className='';

            //把当前点击按钮的下标赋值给图片下标
            imgIndex=i;
            move(imgs[imgIndex],100);
            imgs[imgIndex].style.zIndex=2;
            //把当前图片对应的按钮class属性值清空
            btns[imgIndex].className='selected';
        }
    }
    dsq2=setInterval(autoMove,3500);
    function move(ele,end){
        clearInterval(dsq1);
        //起始值
        var start=10;
        dsq1=setInterval(function(){
            //判断结束值是否大于起始值
            if(end>start){
                var speed=3;
            }else{
                var speed=-3;
            }
            //判断剩余的距离是否小于等于步长
            if(Math.abs(end-start)<=Math.abs(speed)){
                clearInterval(dsq1);
                ele.style.opacity=end/100;
            }else{
                start+=speed;
                ele.style.opacity=start/100;
            }
        },10);
    }
}