options={
    originalInfo:{
        width: "420px",
        height: "420px",
        borderWidth: "0"
    },
    extendInfo:{
        width: "440px",
        height: "440px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#e4e4e4",
        left: "441px",
        top: "0px",
        visibility: "hidden"
    },
    showList:{
        width: "440px",
        height: "64px",
    },
    cursorStyle:{
        position: "absolute",
        left: "0",
        top: "0",
        width: "231px",
        height: "231px",
        backgroundColor: "#fede4f",
        opacity: "0.5",
        filter: "alpha(opacity=50)",
        cursor: "move",
        visibility: "hidden"
    }
}

let mySearch=decodeURI(location.search).slice(1).split("&");
let myPara="";
if(mySearch.length>1){
    myPara=mySearch[1].split("=")[1];
}
let myId=mySearch[0].split("=")[1];
let path=$("#detail-path");
let goodsNum=$(".user-evaluation");
let productIntroduce=$(".product-introduce");
let varTimer=null;

//浏览痕迹获取
let myLookInfo=[];
if(localStorage.getItem("myLookInfo")) {
    myLookInfo = eval("(" + localStorage.getItem("myLookInfo") + ")");
}

$.get("../php/detail.php",{"id":myId},function (data) {
    data = (eval("(" + data + ")"))[0];
    // console.log(data);
    let str1=`<a href="#" class="a-hover-line">首页</a>
    <i style="display: ${myPara?'inline-block':'none'}">&gt;</i>
    <a href="#" class="a-hover-line" style="display: ${myPara?'inline-block':'none'}">${myPara}</a>
    <i>&gt;</i>
    <span>${data["product_name"]}</span>`
    path.append(str1);


    let str2=`<div class="fr say-good">
              <a href="#" class="share"><i></i>收藏 （<span>${data["count"]}</span>）</a>
              <a href="#" class="like"><i></i>分享</a>
              </div>
              <p>商品编号：${data["id"]}</p>`;
    goodsNum.append(str2);

    let str3=`<div class="introduce-top">
                <h3 title="${data['product_name']}">${data["product_name"]}</h3>
                <p>${data["product_info"]}</p>
            </div>
            <div class="detail-info">
                <div class="detail-price1 clearfix">
                    <div class="com-left">酒仙价</div>
                    <div class="com-right clearfix">
                        <div class="phone-buy">
                            <i></i>
                            <span>手机购买</span>
                            <b></b>
                            <div class="phone-buy-slide">
                                <a href="#">
                                    <img src="../images/tz001.jpg" alt="">
                                    <p>手机购买优惠多</p>
                                </a>
                            </div>
                        </div>
                        <p class="del-price">${data['sale_price']}</p>
                    </div>
                </div>
                <div class="detail-price2 clearfix">
                    <div class="com-left">促销价</div>
                    <div class="com-right">
                        <h3><span>￥</span><b>${data['product_price']}</b></h3>
                        <p><i></i><span>会员下单再享98折, 可省5.12元 </span><a href="#">开通会员 <strong>&gt;</strong></a></p>
                    </div>
                </div>
                <div class="detail-sale clearfix">
                    <div class="com-left">促&nbsp;&nbsp;&nbsp;销</div>
                    <div class="com-right">
                        <ul>
                            <li style="display: ${data["tag1"]?'inline-block':'none'}">
                                <i>${data["tag1"]}</i>
<!--                                <span>此商品限购1套</span>-->
                            </li>
                            <li style="display: ${data["tag2"]?'inline-block':'none'}">
                               <i>${data["tag2"]}</i>
<!--                                <span>限时特卖</span>-->
                            </li>
                            <li style="display: ${data["tag3"]?'inline-block':'none'}">
                               <i>${data["tag3"]}</i>
<!--                               <span>限时特卖</span>-->
                            </li>
                            <li style="display: ${data["tag4"]?'inline-block':'none'}">
                                <i>${data["tag4"]}</i>
<!--                                <a href="#"><img src="../images/section1.jpg" alt=""></a>-->
<!--                                <b>x1</b>-->
<!--                                <span>下单即送三人炫酒杯</span>-->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="detail-feedback clearfix">
                <ul>
                    <li class="feedback-count">
                        <i></i>
                        <span>累计销量</span>
                        <b>${data["sale_num"]}</b>
                    </li>
                    <li class="feedback-score">
                        <i></i>
                        <span>酒友评分</span>
                        <b>${data["score"]}</b>
                    </li>
                    <li class="feedback-gold">
                        <i></i>
                        <span>送金币</span>
                        <b>${data["gold"]}</b>
                        <a href="#"></a>
                    </li>
                </ul>
            </div>
            <div class="detail-info detail-info2">
                <div class="detail-subsidy clearfix">
                    <div class="com-left">津&nbsp;&nbsp;&nbsp;贴</div>
                    <div class="com-right clearfix">
                        <div class="subsidy-content">
                            <i>酒仙津贴</i><span>每满300减40,领取津贴全平台可用,</span><a href="#">点击领取 <strong>&gt;&gt;</strong></a>
                        </div>
                    </div>
                </div>
                <div class="detail-coupon clearfix">
                    <div class="com-left">优惠券</div>
                    <div class="com-right">
                        <a href="#">
                            <i></i>
                            <span>满270减20</span>
                        </a>
                    </div>
                </div>
                <div class="detail-address clearfix">
                    <div class="com-left">配送到</div>
                    <div class="com-right">
                        <a href="#">
                            <i>广东省</i>
                            <i>深圳市</i>
                            <i>宝安区</i>
                            <u></u>
                        </a>
                        <b>有货!</b>
                    </div>
                </div>
                <div class="detail-count clearfix">
                    <div class="com-left">数&nbsp;&nbsp;&nbsp;量</div>
                    <div class="com-right">
                        <div class="detail-count-input">
                            <input type="text" value="1">
                            <a href="javascript:;" class="detail-count-at"></a>
                            <a href="javascript:;" class="detail-count-ab"></a>
                        </div>
                        <button>加入购物车</button>
                    </div>
                </div>
            </div>`;
    productIntroduce.append(str3);

    let str6=`<a href="#">
                    <img src="${data['brand_icon']}" alt="">
                    <span>${data['bussiness']}</span>
                </a>
                <strong style="display: ${data['jiuxian']?'inline-block':'none'}">${data['jiuxian']}</strong>`;
    $(".product-store-icon").append(str6);

    let str7=`<ul class="clearfix">
                    <li>商品详情</li>
                    <li>规格参数</li>
                    <li>累计评价<span>${data['count']}</span></li>
                    <li class="detail-content-last">商品咨询</li>
                </ul>`;
    $(".detail-content-select").append(str7);

    let str8=`<div class="detail-option1">
                    <ul class="clearfix">
                        <li style="display: ${data["address"]?'inline-block':'none'}"><i class="op-icon-p"></i><span>${data['address']}</span></li>
                        <li style="display: ${data["materials"]?'inline-block':'none'}"><i class="op-icon-m"></i><span>${data['materials']}</span></li>
                        <li style="display: ${data["business_pro"]?'inline-block':'none'}"><i class="op-icon-c"></i><span>${data['business_pro']}</span></li>
                        <li style="display: ${data["content"]?'inline-block':'none'}"><i class="op-icon-j"></i><span>${data['content']}</span></li>
                        <li style="display: ${data["deg"]?'inline-block':'none'}"><i class="op-icon-jj"></i><span>${data['deg']}</span></li>
                        <li style="display: ${data["size"]?'inline-block':'none'}"><i class="op-icon-s"></i><span>${data['size']}</span></li>
                        <li style="display: ${data["condition"]?'inline-block':'none'}"><i class="op-icon-s"></i><span>${data['condition']}</span></li>
                    </ul>
                </div>
                <div class="detail-option2">
                    <h3>
                        <i></i>
                        <b>商品特点</b>
                    </h3>
                    <p class="text-tip">温馨提示：洋河系列产品新旧包装更替中，随机发货，请以收到的实物为准，给您带来的不便敬请谅解！
                        <br>产品详情正在更新，请期待.</p>
                    <div class="detail-option2-pic">
                        <img src="${data['bg1']}" alt="" style="display: ${data["bg1"]?'inline-block':'none'}">
                        <img src="${data['bg2']}" alt="" style="display: ${data["bg2"]?'inline-block':'none'}">
                        <img src="${data['bg3']}" alt="" style="display: ${data["bg3"]?'inline-block':'none'}">
                    </div>
                </div>
                <div class="detail-option4">
                    <h3>
                        <i></i>
                        <b>售后保障</b>
                    </h3>
                    <ul class="clearfix">
                        <li>
                            <h4>恒温恒湿 理想存储</h4>
                            <p>采用电商领先的ERP和WMS系统配货包装准确率高达99.9%</p>
                            <img src="../images/shbz.jpg" alt="">
                        </li>
                        <li>
                            <h4>防震包装 全程呵护</h4>
                            <p>六大系列的“防冲爆”包装，大大减少配送途中对酒产生的影响</p>
                            <img src="../images/shbz.jpg" alt="">
                        </li>
                        <li>
                            <h4>安全送达 方便快捷</h4>
                            <p>全面采用条形码周转作业24小时，快递公司不间断提货</p>
                            <img src="../images/shbz.jpg" alt="">
                        </li>
                        <li class="detail-option4-last">
                            <h4>客服热线 购买无忧</h4>
                            <p>配备专业客服热线，购买中或者购买后有任何问题可拨打400-617-9999</p>
                            <img src="../images/shbz.jpg" alt="">
                        </li>
                    </ul>
                </div>
                <div class="detail-option4 detail-option5">
                    <h3>
                        <i></i>
                        <b>温馨提示</b>
                    </h3>
                    <div class="detail-option5-text">
                        <p class="option5-text-tip">本网站不向未成年人售酒,为了您和家人的健康，适度饮酒、不要酒后驾车，酒仙网祝您购物愉快!</p>
                        <p class="option5-text">根据新修订的《商标法》及国家工商总局文件要求，2014年5月1日之后不得将"驰名商标"字样用于商品宣传，酒仙网依法对商品图片中含"驰名商标"字样做马赛克处理；同时，涉及厂家正在按照新规定逐步更换包装，在此期间，我们将对新旧包装货品随机发货，请以实际收到的货物为准。详情请见：（http://help.jiuxian.com/show-156.htm）。给您带来的不便，敬请谅解。</p>
                        <dl>
                            <dt>价格说明：</dt>
                            <dd><i></i>酒仙价：酒仙价是商品的指导价，商品展示的酒仙价为参考价，并非原价，该价格可能是品牌专柜标价、或由品牌供应商提供的指导价；</dd>
                            <dd><i></i>促销价：促销价为商品的销售价，是您最终决定是否购买商品的依据</dd>
                            <dd><i></i>折扣：如无特殊说明，折扣指销售商在促销价或酒仙价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系客服进行咨询。</dd>
                            <dd><i></i>异常问题：商品促销信息以商品详情页“促销”栏中的信息为准；商品的最终售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系客服。</dd>
                        </dl>
                    </div>
                </div>
                <div class="detail-option6">
                    <div class="option6-title clearfix">
                        <div class="fl option6-title-l">
                            <h4>99<span>%</span></h4>
                            <p>好评率</p>
                        </div>
                        <div class="fr option6-title-r">
                            <h5>评论获积分</h5>
                            <ul>
                                <li>前5名额外5-15金币</li>
                                <li><a href="#">积分规则</a><i>|</i><a href="#">发表评论</a></li>
                            </ul>
                        </div>
                        <div class="option6-title-c">
                            <p>大家都认为</p>
                            <a href="#">送货快(<b>262</b>)</a>
                            <a href="#">品质好酒(<b>233</b>)</a>
                            <a href="#">包装给力(<b>211</b>)</a>
                            <a href="#">老牌名酒(<b>174</b>)</a>
                            <a href="#">多次购买(<b>138</b>)</a>
                        </div>
                    </div>
                    <div class="option6-content">
                        <div class="option6-select-title">
                            <ul class="clearfix">
                                <li class="option6-select-active">全部(<span>${data['count']}</span>)</li>
                                <li>晒单(<span>338</span>)</li>
                                <li>追评(<span>90</span>)</li>
                            </ul>
                        </div>
                        <div class="option6-select-option">
                            <div class="option6-option-user">
                                <div class="fl option6-user-l">
                                    <dl>
                                        <dt><img src="../images/sbbgg.jpg" alt=""></dt>
                                        <dd>
                                            <h5>xiaodong</h5>
                                            <i></i>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="fl option6-user-r">
                                    <dl class="option6-user-score">
                                        <dt>评分：</dt>
                                        <dd>
                                            <a href="javascript:;"></a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>心得：</dt>
                                        <dd>
                                            包装给力,入口绵柔,送货快,品质好酒,老牌名酒。包装给力,入口绵柔,送货快,品质好酒,老牌名酒。包装给力,入口绵柔,送货快,品质好酒,老牌名酒.包装给力,入口绵柔,送货快,品质好酒,老牌名酒。包装给力,入口绵柔,送货快,品质好酒,老牌名酒
                                        </dd>
                                    </dl>
                                    <dl class="user-share">
                                        <dt>晒单：</dt>
                                        <dd>
                                            <a href="#"><img src="../images/section1.jpg" alt=""></a>
                                        </dd>
                                    </dl>
                                </div>
                                <p class="option-user-time">2020-11-04 09:28:15</p>
                                <div class="give-like"><a href="javascript:;"><i></i><span>0</span></a></div>
                            </div>
                            <div class="option6-option-user">
                                <div class="fl option6-user-l">
                                    <dl>
                                        <dt><img src="../images/sbbgg.jpg" alt=""></dt>
                                        <dd>
                                            <h5>xiaodong</h5>
                                            <i></i>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="fl option6-user-r">
                                    <dl class="option6-user-score">
                                        <dt>评分：</dt>
                                        <dd>
                                            <a href="javascript:;"></a>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>心得：</dt>
                                        <dd>
                                            包装给力,入口绵柔,送货快,品质好酒,老牌名酒
                                        </dd>
                                    </dl>
                                    <dl class="user-share">
                                        <dt>晒单：</dt>
                                        <dd>
                                            <a href="#"><img src="../images/section1.jpg" alt=""></a>
                                        </dd>
                                    </dl>
                                </div>
                                <p class="option-user-time">2020-11-04 09:28:15</p>
                                <div class="give-like"><a href="javascript:;"><i></i><span>0</span></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-option6 detail-option7">
                    <div class="option6-content">
                        <div class="option6-select-title">
                            <ul class="clearfix">
                                <li class="option6-select-active">全部咨询</li>
                                <li>商品提问(<span>0</span>)</li>
                                <li>促销活动(<span>0</span>)</li>
                                <li>库存及物流(<span>0</span>)</li>
                                <li>售后提问(<span>0</span>)</li>
                            </ul>
                        </div>
                        <div class="option6-select-option">
                            <div class="option7-option-warn">
                                <dl class="clearfix">
                                    <dt><i></i><b>提示：</b></dt>
                                    <dd>
                                        <p>因厂家更改产品包装、产地或者更换随机附件等没有任何提前通知，且每位咨询者购买情况、提问时间等不同， 为此以下回复信息仅供参考！若由此给您带来不便请多多谅解，谢谢！</p>
                                        <a href="javascript:;"><i></i>我要咨询</a>
                                    </dd>
                                </dl>
                            </div>
                            <div class="option6-option-user">
                                <div class="fl option6-user-r">
                                    <dl>
                                        <dt><i></i></dt>
                                        <dd>
                                            <h4>xiaodong</h4>
                                            <p>你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="option6-option-user">
                                <div class="fl option6-user-r">
                                    <dl>
                                        <dt><i></i></dt>
                                        <dd>
                                            <h4>xiaodong</h4>
                                            <p>你家这个酒到底有没有？卖不卖？</p>
                                        </dd>
                                    </dl>
                                    <dl class="jiuxian-feedback">
                                        <dt><i></i></dt>
                                        <dd>
                                            <h4>酒仙网客服回复：</h4>
                                            <p>亲爱的酒友您好，此款酒水的箱规是1*4哦~感谢您对我们的支持，祝您生活愉快！</p>
                                            <span class="feedback-time">2017-12-19 09:35:09</span>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div class="option6-option-user">
                                <div class="fl option6-user-r">
                                    <dl>
                                        <dt><i></i></dt>
                                        <dd>
                                            <h4>xiaodong</h4>
                                            <p>你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？你家这个酒到底有没有？卖不卖？？</p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-option4 detail-option8">
                    <h3>
                        <i></i>
                        <b>提问：${data["product_name"]}</b>
                    </h3>
                    <div class="yourAsk">
                        <p class="pleaseLogin">登录后才可发表咨询<a href="#">立即登录</a></p>
                        <form action="">
                            <dl class="clearfix">
                                <dt>提问类型：</dt>
                                <dd>
                                    <label><input type="radio" name="userType" value="0">商品提问</label>
                                    <label><input type="radio" name="userType" value="1">促销活动提问</label>
                                    <label><input type="radio" name="userType" value="2">库存及物流提问</label>
                                    <label><input type="radio" name="userType" value="3">售后提问</label>
                                </dd>
                            </dl>
                            <dl class="clearfix">
                                <dt>提问内容：</dt>
                                <dd>
                                    <textarea name="yourAskContent"></textarea>
                                    <button>提交问题</button>
                                </dd>
                            </dl>
                        </form>
                        <div class="askExplain">
                            <h5>咨询说明</h5>
                            <p>1、商品咨询是酒仙网为您提供的疑难问答，在这里您可以与工作人员直接进行交流。因发起咨询的用户较多，可能无法及时进行回复，我们将在最快的时间内为您解答；</p>
                            <p>2、当涉及广告、比价、重复反馈、不实评论、恶意评论、粗口、危害国家安全等等不当言论时，酒仙网有权予以管理。</p>
                        </div>
                    </div>
                </div>`;
    $(".detail-select-option").append(str8);

    //放大镜
    let box = document.getElementsByClassName("product-extend")[0];
    const myExtend = new ExtendTemplate(box,options);
    myExtend.addPic([`${data["product_img"]}`]);

    //加入购物车
    $(".phone-buy").find('.phone-buy-slide').hide();
    $(".phone-buy").hover(function () {
        $(this).find('.phone-buy-slide').show().animate({
            top:0
        },600);
    },function () {
        $(this).find('.phone-buy-slide').hide().stop().animate({
            top:32
        },800);
    })
    $(".detail-count-at").click(function () {
        $(this).siblings("input").val($(this).siblings("input").val()-0+1);
    });
    $(".detail-count-ab").click(function () {
        if($(this).siblings("input").val()>1){
            $(this).siblings("input").val($(this).siblings("input").val()-1);
        }else{
            $(this).siblings("input").val(1);
        }
    });
    $(".detail-count-ab").siblings("input").blur(function () {
        if(parseInt($(this).val())&&parseInt($(this).val())>0){
            $(this).val(parseInt($(this).val()));
        }else{
            $(this).val(1);
        }
    });

    $(".detail-count button").click(function () {
        let myGoods=[]
        if(localStorage.getItem("myGoodsInfo")){
            myGoods = eval("("+localStorage.getItem("myGoodsInfo")+")");
        }
        let tempCount=$(".detail-count-ab").siblings("input").val()-0;
        $.get("../php/detail.php",{"id":myId},function (data) {
            data=eval("("+data+")");
            let curGoodsInfo={
                "info":data[0],
                "count": tempCount
            };
            let tempState=true;
            for(let i=0;i<myGoods.length;i++){
                if (myGoods[i]["info"]["id"]===myId){
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
                window.open("/jiuxian_min/src/html/shopCar.html");
            });
            varTimer=setTimeout(function () {
                delMyShop();
                clearTimeout(varTimer);
            },3000);
        });
    });

    $.get("../php/detail.php",{"max":data['product_price']},function (max) {
        max = (eval("(" + max + ")"));
        let str5=``;
        if(max.length>0){
            max.forEach(function (item,index) {
                str5+=`<dl>
                    <dt>
                        <img src="${item['product_img']}" alt="">
                        <i class="${index>1?'':'bg-red-i'}">${index+1}</i>
                    </dt>
                    <dd>
                        <h4><a href="/jiuxian_min/src/html/detail-page.html?id=${item['id']}" class="a-hover-line">${item['product_name']}</a></h4>
                        <b>￥${item['product_price']}</b>
                    </dd>
                </dl>`;
            })
        }
        $(".rank-list").append(str5);
    });


    window.addEventListener("unload",function () {
        if(myLookInfo){
            let delLocalState=true;
            for(let i=0;i<myLookInfo.length;i++){
                if (myLookInfo[i]["id"]===myId){
                    delLocalState=false;
                    break;
                }
            }
            if(delLocalState){
                myLookInfo.unshift(data);
                if(myLookInfo.length>6){
                    myLookInfo.length=6;
                }
                localStorage.setItem("myLookInfo",JSON.stringify(myLookInfo));
            }
        }else{
            myLookInfo.unshift(data);
            localStorage.setItem("myLookInfo",JSON.stringify(myLookInfo));
        }
    })
});

let str4="";
if(myLookInfo){
    myLookInfo.forEach(function (item) {
        str4+=`<li>
                <div class="your-look-pic">
                    <a href="/jiuxian_min/src/html/detail-page.html?id=${item['id']}"><img src="${item['product_img']}" alt=""></a>
                </div>
                <a href="/jiuxian_min/src/html/detail-page.html?id=${item['id']}" class="a-hover-line">${item['product_name']}</a>
                <p>￥${item['product_price']}</p>
            </li>`;
    })
}
$(".your-look ul").append(str4);


function delMyShop() {
    $(".joinShop").remove();
    $(".joinShopCar").remove();
}



