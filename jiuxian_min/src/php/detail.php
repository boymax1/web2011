<?php

header('content-type:text/html;charset=utf-8');
//连接数据库
if(isset($_GET["id"])){
    $id = $_GET["id"];
    //sql语句
    $sql = "select * from sheet1 where id like '$id'";
}
if(isset($_GET['max'])){
    $max=$_GET['max'];
    //sql语句
    $sql = "select * from sheet1 where product_price = '$max' limit 6";
}
$link = mysqli_connect("localhost", 'root', '', 'productinfo');
//设置编码
mysqli_set_charset($link, "utf8");
//执行SQL语句，并返回结果集
$result = mysqli_query($link, $sql);
//创建数组存储所有数据
$ar1 = [];
//遍历结果集中所有数据
while ($row = mysqli_fetch_assoc($result)) {
    array_push($ar1, $row);
}
echo json_encode($ar1);
