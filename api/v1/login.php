<?php
include("../db.php");

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select * from userinfo where username='$username' and password='$password'";

$res = mysql_query($sql);

//如果$res里面有记录，说明登录成功

//得到$res的记录条数
$count = mysql_num_rows($res);

if($count > 0){
	echo "<script>alert('登录成功');window.location.href='http://localhost/day22/question_project/index.html';</script>";
	//echo "<h1><a href='../../index.html'>去首页</a></h1>";
	//headers("Location: http://localhost/day22/question_project/index.html");
}else{
	echo "<script>alert('登录失败')</script>";
	echo "<h1><a href='../../login.html'>返回重新登录</a></h1>";
}
	
?>