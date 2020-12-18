$(function () {
    // $.get("../php/detail.php",{"id":myId},function (data) {
    //     data=eval("("+data+")");

    //购物车头部登录状态
    let userHeader=$(".user-info");
    let jiuXian = $("#myJiuXian");
    let curUserName=localStorage.getItem("username");

    //收藏夹
    let loadCollect = $("#myCollect");
    let loadLook = $("#myLook");
    if(curUserName){
        userHeader.append($(`<span>hi，${curUserName}</span>
                <a href="javascript:;" class="login-out a-hover-line">退出</a>
                <a href="javascript:;"><i>金币</i><b>0</b></a>`));
        $(".login-out").click(function () {
            localStorage.removeItem("username");
            location.href="/jiuxian_min/src/";
        });
        //我的收藏加载、最近浏览
        let collectSava=localStorage.getItem("myCollect");
        if(collectSava){
            addCollectInfo(collectSava,loadCollect);
        }else{
            $(`<p class="tip">您目前无加入收藏的商品</p>`).appendTo(loadCollect);
        }
    }else{
        $(`<p class="tip"><a href="/jiuxian_min/src/html/login.html">登录</a>后查看</p>`).appendTo(loadCollect);
        jiuXian.prop("href","/jiuxian_min/src/");
        userHeader.append($(`<a href="/jiuxian_min/src/html/login.html" class="login-in a-hover-line">Hi 请登录</a>
                <a href="/jiuxian_min/src/html/register.html" class="login-in a-hover-line">免费注册</a>`));
        $(".my-shop-car")[0].innerHTML="";
        $(".my-shop-car").append($(`<div class="targetList">
            <i></i>
            <p>购物车内暂时没有商品, 登录后可查看您之前加入的商品。您可以选择现在 <a href="/jiuxian_min/src/html/login.html" class="targetList-a1">登录</a>, 或者先<a href="/jiuxian_min/src/" class="targetList-a2">随便逛逛 ></a></p>
            <div class="search-center">
                <form action="">
                    <input type="text" id="search_input" autocomplete="off">
                    <button>搜索</button>
                </form>
            </div>
            <ul id="search_slide"></ul>
        </div>`));
        if(!$("#helpScript")[0]){
            $(`<script src="../js/autoComplete.js" id="helpScript"></script>`).appendTo("body");
        }
    }
    let lookSava=localStorage.getItem("myLookInfo");
    //最近浏览
    if(lookSava){
        addCollectInfo(lookSava,loadLook);
    }else{
        $(`<p class="tip">您最近未查看任何商品</p>`).appendTo(loadCollect);
    }
    //收藏夹数据
    function addCollectInfo(collectSava,loadCollect) {
        collectSava=eval("("+collectSava+")");
        // console.log(collectSava);
        let tempStr = `<ul class="clearfix">`;
        collectSava.forEach(function (item) {
            tempStr+=`<li>
                        <div class="recommendImg"><img src="${item['product_img']}" alt=""></div>
                        <div class="recommendInfo"><a href="/jiuxian_min/src/html/detail-page.html?id=${item['id']}" target="_blank">${item['product_name']}</a></div>
                        <div class="recommend-price"><span>￥${item['product_price']}</span></div>
                        <div class="recommend-comment"><span>${item['count']}</span>人已评价</div>
                        <div class="cart-btn">
                            <a href="javascript:;">
                                <i class="cartIcon"></i>
                                <span>加入购物车</span>
                            </a>
                        </div>
                    </li>`
        })
        tempStr+=`</ul>
                <p class="collect-arrow">
                    <i class="collect-arrow-l"></i>
                    <b>1/2</b>
                    <i class="collect-arrow-r"></i>
                </p>
                <a href="javascript:;" class="collect-big-arrow collect-big-arrow-l"><i></i></a>
                <a href="javascript:;" class="collect-big-arrow collect-big-arrow-r"><i></i></a>`
        $(tempStr).appendTo(loadCollect);
    }

    //购物车数据加载
    let tempInfo=[];
    let reTempInfo=[];
    if(localStorage.getItem("myGoodsInfo")){
        tempInfo = eval("("+localStorage.getItem("myGoodsInfo")+")");
        while (tempInfo.length>0){
            let tempItem = tempInfo.splice(0,1)[0];
            if(tempItem["info"]["store_name"]||tempItem["info"]["store_icon"]){
                let tempStoreName= tempItem["info"]["store_name"]||"酒仙自营";
                if(reTempInfo.indexOf(tempStoreName)===-1){
                    reTempInfo.push(tempStoreName);
                    $(`<div class="cart-store" data-store="${tempStoreName}">
                    <div class="cart-store-info storeSelect clearfix">
                        <div class="fl cart-checkbox">
                            <label class="check-all"><i class="cartIcon"></i><input name="" type="checkbox" value=""></label>
                            <span class="checkAllText">${tempStoreName}</span>
                        </div>
                        <p class="fr" style="display: ${tempStoreName==='酒仙自营'?'inline-block':'none'}">自营实付金额满<span>100元</span>包邮</p>
                    </div>
                    <div class="cart-my-goods">
                        <div class="cart-checkbox">
                            <label class="click-checkbox"><i class="cartIcon"></i><input name="" type="checkbox" value="" checked></label>
                        </div>
                        <div class="cart-goods">
                            <div class="goods-info clearfix">
                                <div class="goods-img fl">
                                    <a href="/jiuxian_min/src/html/detail-page.html?id=${tempItem['info']['id']}" target="_blank"><img src="${tempItem["info"]["product_img"]}" width="80" height="80"></a>
                                </div>
                                <div class="goods-right">
                                    <div class="goods-name">
                                        <a href="/jiuxian_min/src/html/detail-page.html?id=${tempItem['info']['id']}" target="_blank" class="a-hover-line">${tempItem["info"]["product_name"]}</a>
                                    </div>
                                    <div class="cart-tag">
                                        <span style="display: ${tempItem['info']['tag1']?'inline-block':'none'}">${tempItem['info']['tag1']}</span>
                                        <span style="display: ${tempItem['info']['tag2']?'inline-block':'none'}">${tempItem['info']['tag2']}</span>
                                        <span style="display: ${tempItem['info']['tag3']?'inline-block':'none'}">${tempItem['info']['tag3']}</span>
                                        <span style="display: ${tempItem['info']['tag4']?'inline-block':'none'}">${tempItem['info']['tag4']}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cart-price text-center">
                            <div class="goods-price">￥${tempItem['info']['product_price']}</div>
                        </div>
                        <div class="cart-gold text-center">
                            <div class="goods-gold">${tempItem['info']['gold']}币</div></div>
                        <div class="cart-quantity text-center">
                            <div class="goods-num">
                                <i class="cut"></i>
                                <input name="" type="text" value="${tempItem['count']}" min="1">
                                <i class="add"></i>
                            </div>
                        </div>
                        <div class="cart-subtotal text-center"><div class="goods-total-price">0.00</div></div>
                        <div class="cart-operating">
                            <div class="goods-operating">
                                <p><a href="javascript:;" class="list-del a-no-color">删除</a></p>
                                <p><a href="javascript:;" class="move-collect a-no-color">移入我的收藏</a></p>
                            </div>
                        </div>
                    </div>
                </div>`).appendTo($(".tab-body"));
                }else{
                    $(`<div class="cart-my-goods">
                        <div class="cart-checkbox">
                            <label class="click-checkbox"><i class="cartIcon"></i><input name="" type="checkbox" value="" checked></label>
                        </div>
                        <div class="cart-goods">
                            <div class="goods-info clearfix">
                                <div class="goods-img fl">
                                    <a href="/jiuxian_min/src/html/detail-page.html?id=${tempItem['info']['id']}" target="_blank"><img src="${tempItem["info"]["product_img"]}" width="80" height="80"></a>
                                </div>
                                <div class="goods-right">
                                    <div class="goods-name">
                                        <a href="/jiuxian_min/src/html/detail-page.html?id=${tempItem['info']['id']}" target="_blank" class="a-hover-line">${tempItem["info"]["product_name"]}</a>
                                    </div>
                                    <div class="cart-tag">
                                        <span style="display: ${tempItem['info']['tag1']?'inline-block':'none'}">${tempItem['info']['tag1']}</span>
                                        <span style="display: ${tempItem['info']['tag2']?'inline-block':'none'}">${tempItem['info']['tag2']}</span>
                                        <span style="display: ${tempItem['info']['tag3']?'inline-block':'none'}">${tempItem['info']['tag3']}</span>
                                        <span style="display: ${tempItem['info']['tag4']?'inline-block':'none'}">${tempItem['info']['tag4']}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cart-price text-center">
                            <div class="goods-price">￥${tempItem['info']['product_price']}</div>
                        </div>
                        <div class="cart-gold text-center">
                            <div class="goods-gold">${tempItem['info']['gold']}币</div></div>
                        <div class="cart-quantity text-center">
                            <div class="goods-num">
                                <i class="cut"></i>
                                <input name="" type="text" value="${tempItem['count']}" min="1">
                                <i class="add"></i>
                            </div>
                        </div>
                        <div class="cart-subtotal text-center"><div class="goods-total-price">0.00</div></div>
                        <div class="cart-operating">
                            <div class="goods-operating">
                                <p><a href="javascript:;" class="list-del a-no-color">删除</a></p>
                                <p><a href="javascript:;" class="move-collect a-no-color">移入我的收藏</a></p>
                            </div>
                        </div>
                    </div>`).appendTo($((".cart-store[data-store='"+tempStoreName+"']")));
                }
            }
        }
    }else{
        if(curUserName){
            $(".my-shop-car")[0].innerHTML="";
            $(".my-shop-car").append($(`<div class="targetList">
            <i></i>
            <p>购物车内暂时没有商品, 登录后可查看您之前加入的商品。您可以先<a href="/jiuxian_min/src/" class="targetList-a2">随便逛逛 ></a></p>
            <div class="search-center">
                <form action="">
                    <input type="text" id="search_input" autocomplete="off">
                    <button>搜索</button>
                </form>
            </div>
            <ul id="search_slide"></ul>
        </div>`));
        }else{
            $(".my-shop-car")[0].innerHTML="";
            $(".my-shop-car").append($(`<div class="targetList">
            <i></i>
            <p>购物车内暂时没有商品, 登录后可查看您之前加入的商品。您可以选择现在 <a href="/jiuxian_min/src/html/login.html" class="targetList-a1">登录</a>, 或者先<a href="/jiuxian_min/src/" class="targetList-a2">随便逛逛 ></a></p>
            <div class="search-center">
                <form action="">
                    <input type="text" id="search_input" autocomplete="off">
                    <button>搜索</button>
                </form>
            </div>
            <ul id="search_slide"></ul>
        </div>`));
            if(!$("#helpScript")[0]){
                $(`<script src="../js/autoComplete.js" id="helpScript"></script>`).appendTo("body");
            }
        }
    }
    //购物车商品种类
    myShopCar();
    //选中状态初始化
    let allSelect = $(".allSelect input");
    allSelectState();
    //店铺选中状态初始化
    $(".cart-checkbox input").each(function (index,item) {
        inputChange($(item));
    })
    let singleSelect = $(".cart-my-goods");
    singleSelect.each(function (index,item) {
        storeSelectState($(item));
    })
    //单件商品小计
    $(".goods-num .add").each(function (index,item) {
        singlePriceTotal($(item));
    });
    //选中商品总计
    allTotal();
    //页面初始化结束

    //数量输入框输入限制
    let goodsNum = $(".goods-num input");
    goodsNum.change(function () {
        // console.log($(this).val());
        if(parseInt($(this).val())&&parseInt($(this).val())>0){
            $(this).val(parseInt($(this).val()));
        }else{
            $(this).val(1);
        }
    });
    //所有全选
    //allSelect见初始化
    allSelect.change(function (){
        console.log(11);
        allSelect.prop("checked",$(this).prop("checked"));
        inputChange(allSelect);
        if($(this).prop("checked")){
            $(".cart-store input[type='checkbox']").prop("checked",$(this).prop("checked")).prev("i").css("background-position-x",-17).parents(".cart-my-goods").css("background-color","#fffbf0");
        }else{
            $(".cart-store input[type='checkbox']").prop("checked",$(this).prop("checked")).prev("i").css("background-position-x",0).parents(".cart-my-goods").css("background-color","#fff");
        }
        allTotal();
    });
    //店铺内全选
    let storeSelect = $(".storeSelect");
    storeSelect.find("input").change(function () {
        inputChange($(this));
        if($(this).prop("checked")){
            $(this).parents(".storeSelect").siblings(".cart-my-goods").css("background-color","#fffbf0").find(".cart-checkbox").find("input").prop("checked",$(this).prop("checked")).prev().css("background-position-x", -17);
        }else{
            $(this).parents(".storeSelect").siblings(".cart-my-goods").css("background-color","#fff").find(".cart-checkbox").find("input").prop("checked",$(this).prop("checked")).prev().css("background-position-x", 0);
        }
        allTotal();
        allSelectState();
    })
    //单个选择
    //singleSelect见初始化
    singleSelect.click(function (e) {
        e=e||window.event;
        if(e.target.nodeName==="INPUT"&&e.target["type"]==="checkbox"){
            inputChange($(e.target));
            if($(e.target).prop("checked")){
                $(e.target).parents(".cart-my-goods").css("background-color","#fffbf0")
            }else{
                $(e.target).parents(".cart-my-goods").css("background-color","#fff")
            }
            allTotal();
            allSelectState();
            //店铺全选功能
            storeSelectState($(this));
        }else if(e.target.nodeName==="I"&&$(e.target).hasClass("cut")){
            if($(e.target).next().val()>1){
                $(e.target).next().val($(e.target).next().val()-1);
                singlePriceTotal($(e.target));
                allTotal();
            }
        }else if(e.target.nodeName==="I"&&$(e.target).hasClass("add")){
            $(e.target).prev().val($(e.target).prev().val()-0+1);
            singlePriceTotal($(e.target));
            allTotal();
        }else if(e.target.nodeName==="A"&&$(e.target).hasClass("list-del")){
            let $that=$(e.target);
            let joinCollectBg=$(".joinCollectBg");
            let delGoodsInfo=$(".delGoodsInfo");
            joinCollectBg.show();
            delGoodsInfo.show();
            $(".delGoodsInfo .collect-btn-l")[0].onclick=function () {
                joinCollectBg.hide();
                delGoodsInfo.hide();
                let tempId=$that.parents(".cart-my-goods").find(".goods-img a").prop("href").split("?")[1].split("=")[1];
                delLocalstorage(tempId);
                clickDel($that);
            }
            $(".delGoodsInfo .collect-btn-r")[0].onclick=function () {
                joinCollectBg.hide();
                delGoodsInfo.hide();
            };
        }else if(e.target.nodeName==="A"&&$(e.target).hasClass("move-collect")){
            //移入我的收藏
            let joinCollectBg=$(".joinCollectBg");
            let joinCollect=$(".joinCollect");
            joinCollectBg.show();
            joinCollect.show();
            $(".joinCollect .collect-btn-l")[0].onclick=function () {
                joinCollectBg.hide();
                joinCollect.hide();
                let goodsId=$(e.target).parents(".cart-my-goods").find(".goods-img a").prop("href").split("?")[1].split("=")[1];
                joinMyCollect(goodsId);
                delLocalstorage(goodsId);
                clickDel($(e.target).parents(".goods-operating").find(".list-del"));
            };
            $(".joinCollect .collect-btn-r")[0].onclick=function () {
                joinCollectBg.hide();
                joinCollect.hide();
            };
        }
    });
    //删除选中商品
    let delMySelect=$("#delMySelect");
    delMySelect.click(function () {
        //触发一次删除事件
        let joinCollectBg=$(".joinCollectBg");
        let delGoodsInfo=$(".delGoodsInfo");
        joinCollectBg.show();
        delGoodsInfo.show();
        $(".delGoodsInfo .collect-btn-l")[0].onclick=function () {
            $(".cart-my-goods input:checked").each(function () {
                clickDel($(this).parents(".cart-my-goods").find(".list-del"));
                delLocalstorage($(this).parents(".cart-my-goods").find(".goods-img a").prop("href").split("?")[1].split("=")[1]);
            });
            joinCollectBg.hide();
            delGoodsInfo.hide();
        }
        $(".delGoodsInfo .collect-btn-r")[0].onclick=function () {
            joinCollectBg.hide();
            delGoodsInfo.hide();
        };
    });
    //批量移入收藏
    let selectedMyCollect=$("#joinMyCollect");
    selectedMyCollect.click(function () {
        //触发一次移入收藏事件
        let joinCollectBg=$(".joinCollectBg");
        let joinCollect=$(".joinCollect");
        joinCollectBg.show();
        joinCollect.show();
        $(".joinCollect .collect-btn-l")[0].onclick=function () {
            $(".cart-my-goods input:checked").each(function () {
                let goodsId=$(this).parents(".cart-my-goods").find(".goods-img a").prop("href").split("?")[1].split("=")[1];
                joinMyCollect(goodsId);
                delLocalstorage(goodsId);
                clickDel($(this).parents(".cart-my-goods").find(".list-del"));
            });
            joinCollectBg.hide();
            joinCollect.hide();
        };
        $(".joinCollect .collect-btn-r")[0].onclick=function () {
            joinCollectBg.hide();
            joinCollect.hide();
        };
    });

    //单击删除函数
    function clickDel($that){
        let myTemp = $that.parents(".cart-store");
        $that.parents(".cart-my-goods").remove();
        if(myTemp.find(".cart-my-goods").length===0){
            myTemp.remove();
        }else if(myTemp.find(".cart-my-goods input:checked").length===0){
            myTemp.find(".storeSelect input").prop("checked",false).prev().css("background-position-x", 0);
        }else{
            myTemp.find(".storeSelect input").prop("checked",true).prev().css("background-position-x", -17);
        }
        allTotal();
        allSelectState();
        myShopCar();
    }

    //我的收藏功能
    let myCollectTitle = $(".myCollectTitle a");
    let showCommend = $(".showCommend");
    //收藏夹初始化
    showCommend.eq(0).show().siblings(".showCommend").hide();
    showCommend.find(".collect-big-arrow").hide();
    //动态改变ul宽度, 收藏夹显示页数
    showCommend.find("ul").each(function () {
        let len=Math.ceil($(this).children().length/4);
        $(this).width(len*1000).next("p").children('b').text(`1/${len}`);
    });

    myCollectTitle.hover(function () {
        //选项卡
        $(this).addClass("over-active").siblings('a').removeClass("over-active");
        showCommend.eq(myCollectTitle.index($(this))).show().siblings(".showCommend").hide();
    });
    showCommend.hover(function () {
        //悬浮显示箭头, 当ul宽度超过盒子时显示
        if($(this).find(".collect-arrow b").text().split("/")[1]>1){
            $(this).find(".collect-big-arrow").toggle();
        }
    })
    //将商品由收藏夹加入购物车
    $(".myCollectContent")[0].onclick=function (e) {
        e=e||window.event;
        let myTarget = e.target||e.srcElement;
        if(myTarget.nodeName==="SPAN"&&$(myTarget).parents("div").hasClass("cart-btn")){
            console.log("aaa");
            let myId=$(myTarget).parents("div").siblings(".recommendInfo").children("a").prop("href").split("?")[1].split("=")[1];
            let myGoodsInfo=[];
            let myCollectInfo=[];
            if($(myTarget).parents(".showCommend").prop("id")==="myCollect"){
                myCollectInfo=eval("("+localStorage.getItem('myCollect')+")");
            }else{
                myCollectInfo=eval("("+localStorage.getItem('myLookInfo')+")");
            }
            let tempState=true;
            let tempValue={};
            myCollectInfo.forEach(function (item) {
                if(item["id"]===myId){
                    tempState=item;
                }
            })
            if(localStorage.getItem("myGoodsInfo")){
                myGoodsInfo=eval("("+localStorage.getItem("myGoodsInfo")+")");
                for(let i=0;i<myGoodsInfo.length;i++){
                    if (myGoodsInfo[i]["info"]["id"]===myId){
                        tempState=false;
                    }
                }
                if(tempState){
                    myGoodsInfo.unshift({
                        "info":tempState,
                        "count":1
                    })
                }
                localStorage.setItem("myGoodsInfo",JSON.stringify(myGoodsInfo));
                location.reload();
            }
        }
    }


    //防抖
    let state = true;
    showCommend.find(".collect-big-arrow").on({
        "click":function() {
            //点击翻页
            if($(this).hasClass("collect-big-arrow-l")){
                if($(this).siblings("ul").position().left>-($(this).siblings("p").find("b").text().split("/")[1]-1)*1000){
                    if(state){
                        state = false;
                        $(this).siblings("ul").animate({
                            left:$(this).siblings("ul").position().left-1000
                        },500,function () {
                            state=true;
                        });
                    }
                }
            }else if($(this).hasClass("collect-big-arrow-r")){
                if($(this).siblings("ul").position().left<0){
                    if(state){
                        state=false;
                        $(this).siblings("ul").animate({
                            left:parseInt($(this).siblings("ul").position().left)+1000
                        },500,function () {
                            state=true;
                        });
                    }
                }
            }
        },
        "mouseover":function () {
            $(this).css("background-color","rgba(0,0,0,0.3)");
        },
        "mouseout":function () {
            $(this).css("background-color","rgba(0,0,0,0.1)")
        }
    });
    showCommend.find(".collect-arrow i").click(function () {
        if($(this).hasClass("collect-arrow-l")){
            $(".collect-big-arrow-l").trigger("click");
        }else if($(this).hasClass("collect-arrow-r")){
            $(".collect-big-arrow-r").trigger("click");
        }
    });

    //公共函数
    function inputChange(jqObj) {
        //选中状态改变函数
        if (jqObj.prop("checked")){
            jqObj.prev().css("background-position-x", -17);
        }else {
            jqObj.prev().css("background-position-x", 0);
        }
    }

    function singlePriceTotal(jqObj){
        //单件商品重新计价
        jqObj.parents(".cart-quantity").siblings(".cart-subtotal").children(".goods-total-price").text(`￥${((jqObj.parents(".cart-quantity").siblings(".cart-price").children(".goods-price").text().slice(1))*(jqObj.siblings("input").val())).toFixed(2)}`);
    }

    function allTotal(){
        //总价重新计价,总量重新计算，总金币
        let gold = 0;
        let price = 0;
        let count=0;
        let temp = $(".cart-my-goods input:checked");
        temp.each(function (index,item) {
            gold+=parseInt($(item).parents(".cart-checkbox").siblings(".cart-gold").find(".goods-gold").text())*($(item).parents(".cart-checkbox").siblings(".cart-quantity").find("input").val());
            price+=parseFloat($(item).parents(".cart-checkbox").siblings(".cart-subtotal").find(".goods-total-price").text().slice(1));
            count+=parseInt($(item).parents(".cart-checkbox").siblings(".cart-quantity").find("input").val());
        });
        $(".should-pay").find("b").text(count).end().find("i:eq(1)").text(gold).end().find("strong").text(`￥${price.toFixed(2)}`);
    }

    function allSelectState() {
        //判断全选是否选中
        if($(".cart-my-goods").length===$(".cart-my-goods input:checked").length){
            allSelect.prop("checked",true);
            inputChange(allSelect);
        }else{
            allSelect.prop("checked",false);
            inputChange(allSelect);
        }
    }
    function storeSelectState(temp) {
        //判断店铺全选功能
        if(temp.find("input:checked").length===0){
            temp.siblings(".storeSelect").find("input").prop("checked",false).prev().css("background-position-x", 0);
        }else{
            temp.siblings(".storeSelect").find("input").prop("checked",true).prev().css("background-position-x", -17);
        }
    }
    function myShopCar() {
        //我的购物车商品种类
        $("#myShop").find("b").text($(".cart-my-goods").length);
    }

    //点击移入我的收藏
    function joinMyCollect(myId) {
        $.get("../php/detail.php",{"id":myId},function (data) {
            data=eval("("+data+")");
            let myCollect=[];
            if(localStorage.getItem("myCollect")){
                myCollect=eval("("+localStorage.getItem("myCollect")+")");
                console.log("bb");
                let delLocalState=true;
                for(let i=0;i<myCollect.length;i++){
                    if (myCollect[i]["id"]===myId){
                        delLocalState=false;
                        break;
                    }
                }
                if(delLocalState){
                    myCollect.unshift(data[0]);
                    console.log(122);
                    localStorage.setItem("myCollect",JSON.stringify(myCollect));
                }
            }else{
                myCollect.unshift(data[0]);
                localStorage.setItem("myCollect",JSON.stringify(myCollect));
            }
        });
    }
    //点击删除localstorage
    function delLocalstorage(myId){
        let myGoodsInfo=[];
        if(localStorage.getItem("myGoodsInfo")){
            myGoodsInfo=eval("("+localStorage.getItem("myGoodsInfo")+")");
            for(let i=0;i<myGoodsInfo.length;i++){
                if (myGoodsInfo[i]["info"]["id"]===myId){
                    myGoodsInfo.splice(i,1);
                }
            }
            localStorage.setItem("myGoodsInfo",JSON.stringify(myGoodsInfo));
        }
    }

});