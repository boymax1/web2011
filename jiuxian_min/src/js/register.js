let registerState = [];
let inputList = $(".input-info dd input");
//表单验证，失去焦点时判断是否为空
inputList.blur(function () {
    if(!$(this).val()){
        $(this).parents("dd").css({
            "border-color": "#ff6666"
        }).find("p").show();
        $(this).siblings("span").show().css({
            "background-position-x": "-162px"
        });
    }else{
        console.log($(this).prop("name"),$(this).val());
        switch ($(this).prop("name")) {
            case "telephone":
                if(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/g.test($(this).val())){
                    colorChange1($(this));
                    registerState[0]=true;
                }else{
                    registerState[0]=false;
                    colorChange2($(this),"请输入正确手机号码");
                }
                break;
            case "noteCode":
                let that_code=$(this);
                $.get("../php/register.php",{"noteCode":$(this).val()},function (data) {
                    data=eval("("+data+")");
                    console.log(data);
                    if(data.state){
                        colorChange1(that_code);
                        registerState[2]=true;
                    }else{
                        colorChange2(that_code,"短信验证码错误");
                        registerState[2]=false;
                    }
                })
                break;
            case "passwd":
                $(".tip").show();
                registerState[3]=true;
                if(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[_]).*$/g.test($(this).val())){
                    colorChange1($(this));
                    $(".tip").children("b").css({
                        "background-position-x": "-319px"
                    });
                }else if(/^[a-zA-Z]\w{5,17}$/g.test($(this).val())){
                    colorChange1($(this));
                    $(".tip").children("b").css({
                        "background-position-x": "-269px"
                    });
                }else if(/^\w{6,18}$/g.test($(this).val())){
                    colorChange1($(this));
                    $(".tip").children("b").css({
                        "background-position-x": "-222px"
                    });
                }else{
                    colorChange2($(this),"密码为6~18位字母、数字或下划线");
                    $(".tip").hide();
                    registerState[3]=false;
                }
                break;
            case "rePasswd":
                if($(this).val()===$("input[name='passwd']").val()){
                    colorChange1($(this));
                    registerState[4]=true;
                }else{
                    $(this).parents("dd").css({
                        "border-color": "#ff6666"
                    }).find("p").show();
                    $(this).siblings("span").css({
                        "background-position-x": "-162px"
                    });
                    registerState[4]=false;
                }
                break;
            case "authCode":
                let that = $(this);
                $.get("../php/register.php",{"authCode":$(this).val()},function (data) {
                    data=eval("("+data+")");
                    console.log(data);
                    if(data['state']==1){
                        colorChange1(that);
                        registerState[1]=true;
                    }else{
                        colorChange2(that,"验证码错误");
                        registerState[1]=false;
                    }
                })
                break;
        }
        function colorChange1(that){
            that.parents("dd").css({
                "border-color": "#eaeaea"
            }).find("p").hide();
            that.siblings("span").show().css({
                "background-position-x": "-139px"
            });
        }
        function colorChange2(that,mes){
            that.parents("dd").css({
                "border-color": "#eaeaea"
            }).end().siblings("p").show().text(mes);
            that.siblings("span").show().css({
                "background-position-x": "-162px"
            });
        }
    }
});
$(".protocol input").change(function () {
    if($(this).prop("checked")){
        $(".protocol strong").hide();
    }else{
        $(".protocol strong").show();
    }
});
$(".select-opt").submit(function (event) {
    event.preventDefault();
    if(registerState.indexOf(false)!==-1){
        inputList.blur();
    }else if($(".protocol input").prop("checked")==false){
        $(".protocol strong").show();
    }else{
        let obj = {};
        $(".input-info dd input").each(function (index,item) {
            obj[item.name]=item.value;
        });
        console.log(obj);
        $.post("../php/register.php",obj,function (data) {
            data=eval("("+data+")");
            console.log(data);
            if(data.state){
                localStorage.removeItem("myCollect");
                localStorage.removeItem("myGoodsInfo");
                localStorage.removeItem("myLookInfo");
                if(confirm("账号创建成功，点击'确认'跳转到登录页面！")){
                    location.href="/jiuxian_min/src/html/login.html";
                }
            }else{
                alert("账号创建失败了，请重新再注册一次。");
            }
        });
    }
});