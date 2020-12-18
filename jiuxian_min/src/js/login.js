let loginState = [];
let inputList = $(".input-common dd input");
//表单验证，失去焦点时判断是否为空
inputList.blur(function () {
    if(!$(this).val()){
        $(this).parents("dl").css({
            "border-color": "#ff6666"
        }).find("i,p").show().end().find(".del").hide();
    }else{
        loginState.push(true);
        $(this).parents("dl").css({
            "border-color": "#dcdcdc"
        }).find("i,p").hide().end().find(".del").show();
    }
});
//单击灰色x，重新输入
$(".input-common .del").click(function () {
    $(this).parent().children("input").val("").focus();
});
//单击红色x，重新输入
$(".input-common dd i").click(function () {
    $(this).parent().children("i,p").hide().end().children(".del").show();
    $(this).parent().children("input").focus();
});
//单击切换选项卡
let list = $(".select-nav-list");
list.click(function () {
    loginState.length=0;
    list.children("a").removeClass("active");
    $(this).children("a").toggleClass("active");
    $(".user1").toggle();
    $(".user2").toggle();
});
$(".modal").submit(function (event) {
    event.preventDefault();
    let obj = {};
    $(".input-common dd input").each(function (index,item) {
        obj[item.name]=item.value;
    });
    console.log(111);
    $.post("../php/api.php",obj,function (data) {
        console.log(data);
        if(loginState.length>=3){
            // location.href="../index.html";
            // console.log(data);
            data=eval("("+data+")");
            if(data.state=="1"){
                // console.log("00");
                // if(obj["username"]){
                //     localStorage.setItem("username",obj["username"]);
                // }else{
                //     localStorage.setItem("username",data['username']);
                // }
                localStorage.setItem("username",data['username']);
                // localStorage.setItem("myCollect",data["collect"]);
                // localStorage.setItem("myGoodsInfo",data["shopcar"]);
                location.href="/jiuxian_min/src/index.html";
            }else{
                // console.log("11");
                $("#codeT dd p").show().text(data.message);
            }
        }else{
            // console.log("aa");
            inputList.blur();
        }
    });
});