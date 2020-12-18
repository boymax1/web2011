/*
* 依赖文件：
* 1、jquery
* */

//查询本地cookie，判断登录状态
// setCookie("username","xiaodong",4);
let userName = localStorage.getItem("username");
if(userName){
    // console.log("未登录");
    let tempLen=0;
    if(localStorage.getItem("myGoodsInfo")){
        tempLen = (eval("("+localStorage.getItem("myGoodsInfo")+")")).length;
        // tempLen = (localStorage.getItem("myGoodsInfo")).length;
    }
    $(".userInfo").html(`
            <li class="welcome">hi, ${userName}</li>
            <li><a href="javascript:;" class="a-hover-line" onclick="myExit()">退出</a></li>
        `);
    $(".shop-car span").text(tempLen);
    $(".shop-car a").click(function () {
        if(userName){
            location.href = "/jiuxian_min/src/html/shopCar.html";
        }
    });
}else{
    $(".userInfo").html(`
            <li class="welcome">欢迎来到酒仙网！</li>
            <li><a href="/jiuxian_min/src/html/login.html" class="a-hover-line">请登录</a></li>
            <li><a href="/jiuxian_min/src/html/register.html" class="a-hover-line">免费注册</a></li>
        `);
    $(".shop-car span").text(0);
    $(".shop-car a").click(function () {
        if(confirm("请登录后查看,是否跳转到登录页？")){
            location.href="/jiuxian_min/src/html/login.html";
        }
    });
}
function myExit() {
    let myCollect=localStorage.getItem("myCollect");
    let myGoodsInfo=localStorage.getItem("myCollect");
    // $.post('/jiuxian_min/src/php/register.php',{"username":userName,"collect":myCollect,"shopCar":myGoodsInfo},function (data) {
    //     data=eval("("+data+")");
    //     localStorage.removeItem("username");
    //     location.reload();
    // });
    localStorage.removeItem("username");
    location.reload();
}
//头部二级菜单
//初始化

let menuSelect=$(".secondary-menu-left").children(".menu-selector");
let textSelect=$(".secondary-menu-right").children(".text-selector");
menuSelect.removeClass("menu-selector-active");
textSelect.hide();
//二级菜单选项卡效果
menuSelect.mouseover(function () {
    $(this).addClass("menu-selector-active").siblings().removeClass("menu-selector-active");
    textSelect.hide().eq(menuSelect.index($(this))).show();
});
$(".mon-well").mouseleave(function () {
    textSelect.hide();
    menuSelect.removeClass("menu-selector-active");
});
//白酒菜单，按字母筛选
let filterTitle=$(".filter-title a");
filterTitle.mouseenter(function () {
    $(this).addClass("special").siblings().removeClass("special");
    if($(this).attr("data-my")==="all"){
        $(".filter-text a").show();
    }else{
        $(`.filter-text a`).hide().siblings(`.${$(this).attr("data-my")}`).show();
    }
});

// 点击搜索，跳转刷新list页
$(".search-center form").submit(function (event) {
    event.preventDefault();
    let temp = $(this).children("input").val();
    if(temp){
        let str="";
        temp.split(" ").forEach(function (item) {
            str+=item+"+";
        })
        // location.href="/jiuxian_min/src/html/list.html?key="+str.slice(0,-1);
        window.open("/jiuxian_min/src/html/list.html?key="+str.slice(0,-1));
    }
});