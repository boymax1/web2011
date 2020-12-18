$(function () {
    //轮播图，自动生成小圆点
    let playBtn = $(".player-btn");
    let imgList = $(".pic-list ul li");
    let temp="";
    for(let i=0;i<imgList.length;i++){
        temp+=(i===0?`<a href='javascript:;' class="selected">${i+1}</a>`:`<a href='javascript:;'>${i+1}</a>`);
    }
    playBtn.html(temp);
    temp=null;
    playBtn[0].style.marginLeft=-playBtn[0].offsetWidth/2+"px";

    //小轮播图鼠标悬浮效果
    $("#player_small a").hover(function () {
        $(this).children().stop().fadeTo(500,1);
    },function () {
        $(this).children().stop().fadeTo(500,0.8);
    }).children().fadeTo(0,0.8);

    //透明轮播图
    utilPlayer();
    //滑动轮播图
    slidePlayer("player-sm1","./images/player-m",2);
    let timer = setTimeout(function () {
        slidePlayer("player-sm2","./images/player-m178_",3);
        clearTimeout(timer);
    },1000);

    //推荐，选项卡功能
    function mouseChange(notice_t,notice_c,myClass) {
        notice_t=$(`#${notice_t} a`);
        notice_c=$(`#${notice_c} ul`);
        notice_t.eq(0).addClass(myClass).siblings().removeClass(myClass);
        notice_c.eq(0).show().siblings().hide();
        notice_t.on({
            mouseover:function () {
                $(this).addClass(myClass).siblings().removeClass(myClass);
                notice_c.eq(notice_t.index($(this))).show().siblings().hide();
            }
        });
    }
    mouseChange("notice_t","notice_c","main-left-active");
    //分类数据加载
    (async function() {
        //请求数据
        var p1 = await promiseAjax({
            url: './php/list.php'
        })
        var dt = eval('(' + p1 + ')')
        //推荐栏数据加载及动画生成
        let aList = $(".main-left-title a");
        let ulList = $(".main-left-content");
        let str = "";
        for(let i=0;i<aList.length;i++){
            let ul = $("<ul class='clearfix'></ul>");
            let tempArr = dt.splice(0,10);
            tempArr.forEach(function (item) {
                ul.append(`<li>
                            <div class="index-tab-pic">
                                <a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" target="_blank"><img src="${item["product_img"]}" alt=""></a>
                            </div>
                            <div class="index-tab-tit"><i class="mark-pro" style="display:${item['tag2']==="限时抢购"?"inline-block":"none"};"><img src="./images/zhenxuan.jpg" alt=""></i><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" class="a-hover-line" target="_blank">${item["product_name"]}</a></div>
                            <div class="index-tab-price"><span>￥${item["product_price"]}</span></div>
                        </li>`);
            });
            ulList.append(ul);
        }
        ulList = $(".main-left-content ul");
        ulList.hide().eq(0).show();
        aList.on({
            mouseover:function () {
                $(this).addClass("main-left-active").siblings().removeClass("main-left-active");
                ulList.hide().eq(aList.index($(this))).show();
            }
        })
        str="";
        let remUl = $(".floor-level0-pro");
        dt.splice(0,9).forEach(function (item) {
            str+=` <li>
                        <div class="leve10-pic"><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" target="_blank"><img src="${item["product_img"]}" alt=""></a></div>
                        <h4><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" class="a-hover-line" target="_blank">${item["product_name"]}</a></h4>
                        <p>￥${item["product_price"]}</p>
                    </li>`;
        });
        remUl.append(str);
        let remNum = Math.ceil($(".floor-level0-pro li:first").innerWidth()*9/$(".floor-level0-content").eq(0).width());
        remUl.width(remNum*$(".floor-level0-content").eq(0).width());
        str="";
        for(let i=0;i<remNum;i++){
            str+=`<a href="javascript:;"></a>`;
        }
        let tempIndex = 0;
        let step = $(".floor-level0-content").eq(0).width()-12;
        $(".change-point").append(str);
        $(".change-point a").on({
            click:function () {
                tempIndex=$(".change-point a").index($(this));
                $(this).addClass("change-point-active").siblings().removeClass("change-point-active");
                remUl[0].style.left = -step*tempIndex+"px";
            }
        }).eq(0).addClass("change-point-active");
        $(".leve10-arrowL").on({
            click:function () {
                if(tempIndex>0){
                    tempIndex-=1;
                    remUl[0].style.left = -step*tempIndex+"px";
                    $(".change-point a").eq(tempIndex).addClass("change-point-active").siblings().removeClass("change-point-active");
                }
            }
        });
        $(".leve10-arrowR").on({
            click:function () {
                if(tempIndex<remNum-1){
                    tempIndex+=1;
                    remUl[0].style.left = -step*tempIndex+"px";
                    $(".change-point a").eq(tempIndex).addClass("change-point-active").siblings().removeClass("change-point-active");
                }
            }
        });

        //白酒馆数据加载
        function producer1(level1,level1_hot,level1_hot_pro) {
            let str="";
            dt.splice(0,10).forEach(function (item){
                str+=`<li>
                            <div class="section-pic"><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" target="_blank"><img src="${item["product_img"]}" alt=""></a></div>
                            <h4><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" class="a-hover-line" target="_blank">${item["product_name"]}</a></h4>
                            <p>￥${item["product_price"]}</p>
                        </li>`;
            });
            $(`#${level1}`).append(str);
            let levelHot = $(`#${level1_hot} a`);
            let levelPro = $(`#${level1_hot_pro}`);
            for(let i=0;i<levelHot.length;i++){
                let ul = $(`<ul class="clearfix"></ul>`);
                dt.splice(0,5).forEach(function (item) {
                    ul.append(`
                <li>
                    <dl>
                        <dt><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" target="_blank"><img src="${item["product_img"]}" alt=""></a></dt>
                        <dd>
                            <h5><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" class="a-hover-line" target="_blank">${item["product_name"]}</a></h5>
                            <p>￥${item["product_price"]}</p>
                        </dd>
                    </dl>
                </li>
                `);
                });
                levelPro.append(ul);
            }
            levelHot.eq(0).addClass("a-hover-noline").siblings().removeClass("a-hover-noline");
            let ulList2 = $(`#${level1_hot_pro} ul`);
            ulList2.eq(0).show().siblings().hide();
            levelHot.on({
                mouseover:function () {
                    $(this).addClass("a-hover-noline").siblings().removeClass("a-hover-noline");
                    ulList2.eq(levelHot.index($(this))).show().siblings().hide();
                }
            })
        }
        producer1('level1','level1_hot','level1_hot_pro');
        producer1('level2','level2_hot','level2_hot_pro');

        //洋酒馆数据加载
        function producer2(level1) {
            let str="";
            dt.splice(0,10).forEach(function (item){
                str+=`<li>
                            <div class="section-pic"><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" target="_blank"><img src="${item["product_img"]}" alt=""></a></div>
                            <h4><a href="/jiuxian_min/src/html/detail-page.html?id=${item["id"]}" class="a-hover-line" target="_blank">${item["product_name"]}</a></h4>
                            <p>￥${item["product_price"]}</p>
                        </li>`;
            });
            $(`#${level1}`).append(str);
        }
        producer2('level3');
        producer2('level4');
        producer2('level5');
    })();
    //侧边栏轮播图
    slidePlayer("aside-player1","./images/player-210x485-",4);
    slidePlayer("aside-player2","./images/player-210x485-",3);
    slidePlayer("aside-player3","./images/player-210x320-",4);
    slidePlayer("aside-player4","./images/player-210x485-",3);
    slidePlayer("aside-player5","./images/player-210x485-",4);
    //好店铺推荐数据加载
    (async function() {
        //请求数据
        let p1 = await promiseAjax({
            url: './php/store.php'
        })
        let dt = eval('(' + p1 + ')')
        let aList = $("#storeTitle a");
        let box = $("#remStore");
        for(let i=0;i<aList.length;i++){
            let ul = $(`<ul class="clearfix"></ul>`);
            dt.splice(0,Math.ceil(Math.random()*18)).forEach(function (item) {
                ul.append(`
                <li><a href="#"><img src="${item["store_link"]}" alt=""></a></li>
                `);
            });
            box.append(ul);
        }
        mouseChange("storeTitle","remStore","partner-sort-active");
        //好店推荐，hover位移动画效果
        $("#remStore li").hover(function () {
            $(this).children().stop().animate({
                left:-100
            });
        },function () {
            $(this).children().stop().animate({
                left:0
            });
        });
    })();

    //楼梯导航
    let navLi = $(".elevator .floor");
    let colorArr = ["#c94b56","#c2782f","#296693","#6c9d0e","#fe7a65"];
    let widthArr = [70,90,70,130,70];
    navLi.children("i").show().siblings().hide();
    //导航条鼠标悬浮效果
    navLi.hover(function () {
        let myIndex = navLi.index($(this));
        $(this).children("b").show().siblings().hide();
        $(this).css("background-color",colorArr[myIndex]).stop().animate({
            "width": widthArr[myIndex]
        });
    }, function () {
        if($(this).attr("mySwitch")==="on"){
            $(this).stop().animate({
                "width": 30
            },function () {//动画结束后执行回调函数
                $(this).children("span").show().siblings().hide();
            });
        }else{
            $(this).stop().animate({
                "width": 30
            },function () {//动画结束后执行回调函数
                $(this).children("i").show().siblings().hide();
                $(this).css("background-color","#f1f1f1");
            });
        }
    });
    //页面滚动，导航条跟随响应
    let floorLevel = $(".floor-level-f");
    $(".bottom-re").hide();
    $(".elevator").hide();
    let navState = true;//防抖
    $(window).scroll(function () {
        //底部推荐
        if ($(document).scrollTop() >= 1000) {
            $(".bottom-re").fadeIn(600);
        }else{
            $(".bottom-re").fadeOut(600);
        }
        if(floorLevel.eq(0).offset().top-$(document).scrollTop()<=300){
            $(".elevator").fadeIn();
        }else{
            $(".elevator").fadeOut();
        }
        checkNav("span");
    });
    //导航条鼠标单击效果
    navLi.click(function () {
        navState = false;
        let myIndex = navLi.index($(this));
        $("html").animate({
            scrollTop: floorLevel.eq(myIndex).offset().top-290
        },500,function () {
            navState = true;
            checkNav("b");
        });
    });

    $(".bottom-re span").click(function () {
        $(this).parents(".bottom-re").remove();
    });

    //导航公共函数
    function checkNav(varName){
        // console.log(varName);
        floorLevel.each(function (index,item) {
            //楼层导航样式检测
            if($(item).offset().top-$(document).scrollTop()<=300&&navState){
                navLi.attr("mySwitch","off").css("background-color","#f1f1f1").children("i").show().siblings().hide();
                navLi.eq(index).attr("mySwitch","on").css("background-color",colorArr[index]).children(varName).show().siblings().hide();
            }
        });
    }
});