<?php
header('content-type:text/html;charset=utf-8');
//连接数据库
$link=mysqli_connect("localhost",'root','','productinfo');
if(isset($_GET["key"])){
    $getPara=preg_split("/\+/",$_GET["key"]);
    $str="%";
    foreach ($getPara as $value){
        $str.=$value."%";
    }
//设置编码
    mysqli_set_charset($link,"utf8");
//sql语句
    $sql="select * from sheet1 where product_name like '$str'";
}else{
    $sql="select * from sheet1";
}
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//创建数组存储所有数据
$ar1=[];
//遍历结果集中所有数据
while($row=mysqli_fetch_assoc($result)){
    array_push($ar1,$row);
}
echo json_encode($ar1);
?>