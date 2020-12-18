<?php
header('Content-Type:text/html; charset=utf-8');
//连接数据库
$link=mysqli_connect("localhost",'root','','productinfo');
//设置编码
mysqli_set_charset($link,"utf8");
//sql语句
session_start();
$codeT = $_POST['captcha'];
$username=$_POST['username'];
$telephone=$_POST['telephone'];
$notePasswd=$_POST['notePasswd'];
$passwd=$_POST['passwd'];

//$codeT = $_GET['captcha'];
//$username=$_GET['username'];
//$telephone=$_GET['telephone'];
//$notePasswd=$_GET['notePasswd'];
//$passwd=$_GET['passwd'];

//$icon=array(
//    'phoneNumber'=>"$telephone",
//    'randCode'=>"$notePasswd"
//);
//set_time_limit(0);
//$response=SmsDemo::sendSms($icon);
if($username){
    $sql="select * from userInfo where username='$username' or phone='$username'";
}else {
    $sql = "select * from userInfo where phone='$telephone'";
}
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);

$ar1=mysqli_fetch_assoc($result);

//$yourInfo=json_encode($ar1);
//echo $yourInfo;
$resName=$ar1["username"];
$codeP = $_SESSION["authCode"];
if ($codeT==$codeP) {
    if($notePasswd){
        if($ar1["phone"]==$telephone&&$notePasswd=="1212"){
            echo "{'state':1,'message':'ok','username':'"."$resName"."'}";
        }else{
            echo "{'state':0,'message':'手机号或短信验证码错误'}";
        }
    }else{
        if(($ar1["username"]==$username||$ar1["phone"]==$username)&&$ar1["passwd"]==$passwd){
            echo "{'state':1,'message':'ok','username':'"."$resName"."'}";
        }else{
            echo "{'state':0,'message':'用户名或密码错误'}";
        }
    }
}else {
    echo "{'state':0,'message':'验证码错误'}";
}
