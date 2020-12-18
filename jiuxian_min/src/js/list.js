let currentPagination = document.getElementById("currentPagination");
let listBox=document.getElementById("list-box");
let pageCount = document.getElementById("page-count");
let curUrl=decodeURI(location.search.slice(1).split("=")[1]);
let varTimer=null;
$(".list-path a:eq(1)").text(curUrl);
$("#search_input").val(curUrl);
$(".list-search").find("input").val(curUrl);
(async function(){
    var p1=await $.get("../php/list.php",{"key":curUrl},function (data) {
        return data;
    })
    //转换数据类型
    var dt=eval('('+p1+')')
    // console.log(dt);
    //编写传入的obj数据
    var obj={
        //分页数据信息
        pageInfo:{
            pagenum:1,//当前页
            pagesize:60,//每页显示的条数
            totalsize:dt.length,//总条数
            totalpage:Math.ceil(dt.length/60) //总页数
        },
        //分页文本信息
        textInfo:{
            prev:"上一页",
            list:'',
            next:"下一页",
        },
        change(m){
            //截取指定长度的数据
            let ar2=dt.slice((m-1)*60,m*60);
            //拼接所有内容
            var str='';
            //遍历新数组中所有数据
            for(var attr in ar2){
                str+=`
                        <li>
            <div class="collectBox">
                <a href="./detail-page.html?id=${ar2[attr]['id']}&key=${curUrl}" class="product-img" target="_blank"><img src="${ar2[attr]["product_img"]}" alt=""></a>
                <div class="collectText"><a href="javascript:;"><i></i><span class="clickCollect">收藏</span></a></div>
            </div>
            <div class="list-pro-price"><i>￥</i>${ar2[attr]["product_price"]}</div>
            <div class="list-pro-desc">
                <a href="./detail-page.html?id=${ar2[attr]['id']}&key=${curUrl}" class="a-hover-line" target="_blank">${ar2[attr]["product_name"]}
                    <span class="slogan">${ar2[attr]["product_info"]}</span>
                </a>
            </div>
            <div class="evaluation">
                <a href="${ar2[attr]["product_evalution_link"]}"><span>${ar2[attr]["count"]}</span>评价</a>
            </div>
            <div class="list-store-name">
                <a href="javascript:;"><i style="display:${ar2[attr]["store_name"]==""?"none":"inline-block"};"></i><span>${ar2[attr]["store_name"]}</span></a>
            </div>
            <div class="list-pro-tag">
                <i style="display:${ar2[attr]["store_icon"]==""?"none":"inline-block"};"></i>
                <span style="display:${ar2[attr]["tag1"]==""?"none":"inline-block"};">${ar2[attr]["tag1"]}</span>
                <span style="display:${ar2[attr]["tag2"]==""?"none":"inline-block"};">${ar2[attr]["tag2"]}</span>
                <span style="display:${ar2[attr]["tag3"]==""?"none":"inline-block"};">${ar2[attr]["tag3"]}</span>
                <span style="display:${ar2[attr]["tag4"]==""?"none":"inline-block"};">${ar2[attr]["tag4"]}</span>
            </div>
            <div class="buyArea clearfix">
                <div class="fl buy-count">
                    <a href="javascript:;" class="fl subtraction">-</a>
                    <a href="javascript:;" class="fr add">+</a>
                    <input type="text" value="1">
                </div>
                <a href="javascript:;" class="fr shop-car">
                    <i></i>加入购物车
                </a>
            </div>
        </li>
                    `
            }
            listBox.innerHTML=str;
            // console.log(listBox);
            pageCount.innerText = Math.ceil(dt.length/60)+"";
            $(".page-num").children("span").text(this.default.pageInfo.totalpage);
            $(".page-num").children("b").text(this.default.pageInfo.pagenum);
        }
    }
    //创建分页器对象
    let myPa=new Pagination(currentPagination,obj);
    if(dt.length===0){
        listBox.innerHTML+=listBox.innerHTML+"<h3>抱歉，没有找到符合条件的商品</h3>"
    }else{
        $(".list-path").find("p b").text(dt.length);
    }
})();
//重新搜索
$(".search-center form,.list-search form").submit(function (event) {
    event.preventDefault();
    let temp = $(this).children("input").val();
    if(temp){
        let str="";
        temp.split(" ").forEach(function (item) {
            str+=item+"+";
        })
        location.href="./list.html?key="+str.slice(0,-1);
    }
});
//翻页箭头
$(".list-arrow-r").click(function () {
    $(".next").trigger("click");
});
$(".list-arrow-l").click(function () {
    $(".prev").trigger("click");
});
$("#list-box").on("click","li",function (event) {
    let $target=$(event.target);
    if($target.hasClass("add")){
        $target.siblings("input").val(($target.siblings("input").val()-0+1).toFixed(0));
    }
    if($target.hasClass("subtraction")&&$target.siblings("input").val()>1){
        $target.siblings("input").val(($target.siblings("input").val()-1).toFixed(0));
    }
    if($target.hasClass("shop-car")){
        let myGoods=[]
        if(localStorage.getItem("myGoodsInfo")){
            myGoods = eval("("+localStorage.getItem("myGoodsInfo")+")");
        }
        let tempCount=$target.siblings(".buy-count").children("input").val()-0;
        let tempId = decodeURI($target.parents("li").find(".product-img").prop("href")).split("?")[1].split("&")[0].split("=")[1];
        // console.log(tempId);
        // (async function (){
        $.get("../php/detail.php",{"id":tempId},function (data) {
            data=eval("("+data+")");
            let curGoodsInfo={
                "info":data[0],
                "count": tempCount
            };
            let tempState=true;
            for(let i=0;i<myGoods.length;i++){
                if (myGoods[i]["info"]["id"]===tempId){
                    myGoods[i]["count"]++;
                    tempState=false;
                    break;
                }
            }
            if (tempState){
                myGoods.push(curGoodsInfo);
            }
            localStorage.setItem("myGoodsInfo",JSON.stringify(myGoods));

            let tempLen=0;
            if(localStorage.getItem("myGoodsInfo")){
                tempLen = (eval("("+localStorage.getItem("myGoodsInfo")+")")).length;
                console.log(tempLen,eval("("+localStorage.getItem("myGoodsInfo")+")"));
            }
            $(`<div class="joinShop"></div>
            <div class="joinShopCar">
                <dl class="clearfix">
                    <dt><i></i></dt>
                    <dd>
                        <h4>该商品已成功放入购物车</h4>
                        <p>购物车共 <span>${tempLen}</span>件商品</p>
                        <div class="continue clearfix">
                            <a href="javascript:;" class="continue-left">&lt;&lt; 继续购物</a>
                            <a href="javascript:;" class="continue-right">去购物车结算</a>
                        </div>
                        <a href="javascript:;" class="del-join"></a>
                    </dd>
                </dl>
            </div>`).appendTo($("body"));
            $(".continue-left,.del-join").click(function () {
                delMyShop();
            });
            $(".continue-right").click(function () {
                // location.href="/jiuxian_min/src/html/shopCar.html";
                window.open("/jiuxian_min/src/html/shopCar.html");
            });
            varTimer=setTimeout(function () {
                delMyShop();
                clearTimeout(varTimer);
            },3000);
        });
    }
    if($target.hasClass("clickCollect")){
        let myId=decodeURI($target.parents("li").find(".product-img").prop("href")).split("?")[1].split("&")[0].split("=")[1];
        $.get("../php/detail.php",{"id":myId},function (data) {
            data=eval("("+data+")");
            let myCollect=[];
            if(localStorage.getItem("myCollect")){
                myCollect=eval("("+localStorage.getItem("myCollect")+")");
                // console.log("bb");
                let delLocalState=true;
                for(let i=0;i<myCollect.length;i++){
                    if (myCollect[i]["id"]===myId){
                        delLocalState=false;
                        break;
                    }
                }
                if(delLocalState){
                    myCollect.unshift(data[0]);
                    localStorage.setItem("myCollect",JSON.stringify(myCollect));
                }
            }else{
                myCollect.unshift(data[0]);
                localStorage.setItem("myCollect",JSON.stringify(myCollect));
            }
            alert("已成功加入我的收藏夹");
        });
    }
});
$("#list-box").on("blur","li",function (event) {
    let $target=$(event.target);
    if($target.prop('type')==="text"){
        if(parseInt($target.val())&&parseInt($target.val())>0){
            $target.val(parseInt($target.val()));
        }else{
            $target.val(1);
        }
    }
});
function delMyShop() {
    $(".joinShop").remove();
    $(".joinShopCar").remove();
}