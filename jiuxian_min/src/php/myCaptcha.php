<?php
//PHP运行集成环境：XAMPP或者WampServer, 确认php GD库可以使用
//phpinfo();

//session_start ([ array $options = array() ] ) : bool
//启动新会话或者重用现有会话, session_start() 会创建新会话或者重用现有会话。 如果通过 GET 或者 POST 方式，或者使用 cookie 提交了会话 ID， 则会重用现有会话。
session_start();//必须在顶部

//验证码图片尺寸为80*40px,字体大小5, 验证码长度一般为4
$img_width=80;
$img_height=40;
$fontSize=13;
$len=4;

//定义验证码
$authCode='';

//imagecreatetruecolor ( int $width , int $height ) : 新建一个真彩色图像，返回一个resource
//默认生成一张黑色的图片
$img = imagecreatetruecolor($img_width,$img_height);

//imagecolorallocate ( resource $image , int $red , int $green , int $blue ) : int
//为一幅图像分配颜色,
$white=imagecolorallocate( $img ,255 ,255 , 255 );

//imagefill ( resource $image , int $x , int $y , int $color ) : bool
//区域填充, image 图像的坐标 x，y（图像左上角为 0, 0）处用 color 颜色执行区域填充（即与 x, y 点颜色相同且相邻的点都会被填充）
imagefill($img,0,0,$white);

//随机生成四位验证码
for($i=0;$i<$len;$i++) {
    //定义数字颜色
    $fontColor = imagecolorallocate($img, mt_rand(0, 254), mt_rand(0, 254), mt_rand(0, 254));
    $fontBgColor= imagecolorallocate($img, 0, 0, 250);

    //mt_rand ( int $min , int $max ) : int
    //生成[min, max]间的随机数
    //随机生成0-9之间的数字
    //$fontText = mt_rand(0, 9);

    //随机生成4个数字、字母混合的字符:
    //方法一:
    //array_rand ( array $array [, int $num = 1 ] ) : mixed
    //从数组中随机取出一个或多个单元

    //方法二：
    //substr ( string $string , int $start [, int $length ] ) : string
    //返回字符串的子串
    //strlen ( string $string ) : int
    //获取字符串长度
    $data="abcdefghijklmnopqrstuvwxyz2345678ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $fontText=substr($data,mt_rand(0,strlen($data)-2),1);

    //拼接验证码
    $authCode.=$fontText;

    //定义生成数字在图片中的位置，总宽80, 有4个字
    $x = ($i * $img_width / $len);
    $y = mt_rand(16, 35);
    $arr=[-1,1];
    $angle=mt_rand(0,10)*$arr[mt_rand(0,1)];

    //imagestring ( resource $image , int $font , int $x , int $y , string $s , int $col ) : bool
    //水平地画一行字符串
//    imagestring($img, $fontSize, $x, $y, $fontText, $fontColor);

    //imagettftext ( resource $image , float $size , float $angle , int $x , int $y , int $color , string $fontfile , string $text ) : array
    //用 TrueType 字体向图像写入文本
    $fontfile='E:\xampp\htdocs\xx\GOUDYSTO.TTF';

//    imagettftext($img,$fontSize,$angle,$x,$y,$fontColor,$fontfile,$fontText);
    imagettftext($img,$fontSize,$angle,$x,$y,$fontBgColor,$fontfile,$fontText);
}

//将验证码存放在session中
//strtolower ( string $string ) : string
//将字符串转化为小写
$_SESSION["authCode"]=strtolower($authCode);

//生成干扰元素: 点元素
//for($i=0;$i<200;$i++){
//    $pointColor=imagecolorallocate($img,mt_rand(50,200),mt_rand(50,200),mt_rand(50,200));
//
//    //imagesetpixel ( resource $image , int $x , int $y , int $color ) : bool
//    //画一个单一像素
//    imagesetpixel($img,mt_rand(1,79),mt_rand(1,39),$pointColor);
//}

//生成干扰元素：线元素
//for($i=0;$i<3;$i++){
//    $lineColor=imagecolorallocate($img,mt_rand(200,254),mt_rand(200,254),mt_rand(200,254));
//
//    //imageline ( resource $image , int $x1 , int $y1 , int $x2 , int $y2 , int $color ) : bool
//    //画一条线段
//    imageline($img,mt_rand(1,79),mt_rand(1,39),mt_rand(1,79),mt_rand(1,39),$lineColor);
//}

//设置响应头为图片类型
header("content-type: image/png;charset=utf-8");

//imagepng ( resource $image [, string $filename ] ) : bool
//以 PNG 格式将图像输出到浏览器或文件,返回
imagepng($img);
//imagedestroy ( resource $image ) : 销毁一图像,返回bool
imagedestroy($img);





