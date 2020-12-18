
//侧边栏悬浮显示
let asideList = $(".userNav-top div");
let asideListB = $(".userNav-bottom div");
asideList.hover(function () {
    let temp = $(this).find('i')[0];
    let pos = 0;
    if(window.getComputedStyle){
        pos=window.getComputedStyle(temp)[`backgroundPositionX`].slice(0,-2)-20;
    }else{
        pos=temp.currentStyle[`backgroundPositionX`].slice(0,-2)-20;
    }
    $(this).css({
        "background-color": "#c00",
    });
    $(this).children(".myIcon").css({
        "background-position-x": pos+"px",
    }).end().children("p").css({
        "color": "white"
    }).end().children("dl").show();
},function () {
    let temp = $(this).find('i')[0];
    let pos = 0;
    if(window.getComputedStyle){
        pos=window.getComputedStyle(temp)[`backgroundPositionX`].slice(0,-2)-0+20;
    }else{
        pos=temp.currentStyle[`backgroundPositionX`].slice(0,-2)-0+20;
    }
    $(this).css({
        "background-color": "white",
    });
    $(this).children(".myIcon").css({
        "background-position-x": pos+"px"
    }).end().children("p").css({
        "color": "#333"
    }).end().children("dl").hide();
});
asideListB.hover(function () {
    let temp = $(this).find('i')[0];
    let pos = 0;
    if(window.getComputedStyle){
        pos=window.getComputedStyle(temp)[`backgroundPositionY`].slice(0,-2)-17;
    }else{
        pos=temp.currentStyle[`backgroundPositionY`].slice(0,-2)-17;
    }
    $(this).css({
        "background-color": "#c00",
    });
    $(this).children("i").css({
        "background-position-y": pos+"px",
    }).end().children("p").show();
},function () {
    let temp = $(this).find('i')[0];
    let pos = 0;
    if(window.getComputedStyle){
        pos=window.getComputedStyle(temp)[`backgroundPositionY`].slice(0,-2)-0+17;
    }else{
        pos=temp.currentStyle[`backgroundPositionY`].slice(0,-2)-0+17;
    }
    $(this).css({
        "background-color": "white",
    });
    $(this).children("i").css({
        "background-position-y": pos+"px"
    }).end().children("p").hide();
});

//点击回到顶部
$(".go-top").click(function () {
    $("html").stop().animate({
        scrollTop: 0
    },500);
});

//根据localStorage判断，我的收藏，我的登录状态
let asideUserName = localStorage.getItem("username");
let myCollect=localStorage.getItem("myCollect");
if(asideUserName){
    $(".myAccount dt span").text(`你好! ${asideUserName}`);
    if(myCollect){
        // myCollect=myCollect;
            myCollect=eval("("+myCollect+")");
    }else{
        myCollect=[];
    }
    $(".myCollect dt span").html(`已收藏商品(<b>${myCollect.length}</b>)`);
    $(".myCar").click(function () {
        location.href="/jiuxian_min/src/html/shopCar.html";
    });
    $(".myCollect").click(function () {
        location.href="/jiuxian_min/src/html/shopCar.html#myCollectPos";
    })
}else{
    $(".myCar").click(function () {
        if(confirm("请登录后查看,是否跳转到登录页？")){
            location.href="/jiuxian_min/src/html/login.html";
        }
    });
}
