<?php
header('content-type:text/html;charset=utf-8');
//连接数据库
$link=mysqli_connect("localhost",'root','','productinfo');
//设置编码
mysqli_set_charset($link,"utf8");
//sql语句
session_start();
$codeP = $_SESSION["authCode"];

if(isset($_GET["authCode"])){
    if ($_GET["authCode"]==$codeP) {
        echo "{'state':1,'message':'ok'}";
    }else{
        echo "{'state':0,'message':'nok'}";
    }
}
if(isset($_GET["noteCode"])){
    if ($_GET["noteCode"]=="1212") {
        echo "{'state':1,'message':'ok'}";
    }else{
        echo "{'state':0,'message':'nok'}";
    }
}

//$icon=array(
//    'phoneNumber'=>"$telephone",
//    'randCode'=>"$notePasswd"
//);
//set_time_limit(0);
//$response=SmsDemo::sendSms($icon);
if(isset($_POST["telephone"])){
    $telephone=$_POST['telephone'];
    $passwd=$_POST['passwd'];
    $username='用户'.$telephone;
    $sql = "INSERT INTO `userinfo` (`username`, `passwd`,`phone`) VALUES('$username', '$passwd',' $telephone')";
    //执行SQL语句，并返回结果集
    $result=mysqli_query($link,$sql);
    echo "{'state':1,'message':'账号创建成功'}";
}
if(isset($_POST['username'])&&isset($_POST['collect'])&&$_POST['shopCar']){
    $collect=$_POST['collect'];
    $shopCar=$_POST['shopCar'];
    $username=$_POST['username'];
    $sql="select * from userInfo where username='$username'";
    $result=mysqli_query($link,$sql);
    $ar1=mysqli_fetch_assoc($result);
    if($ar1){
        $sql = "UPDATE `userinfo` SET `collect`='$collect', `shopcar`='$shopCar' WHERE `username`='$username'";
        $result=mysqli_query($link,$sql);
        echo "{'state':1,'message':'数据更新成功'}";
    }else{
        echo "{'state':0,'message':'非注册用户'}";
    }
}



