<?php
include("../db.php");

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "insert into userinfo (username, email, password) values ('$username','$email','$password')";

$isSucc = mysql_query($sql);

if($isSucc){
	echo "<script>alert('注册成功')</script>";
	echo "<h1><a href='../../login.html'>去登录</a></h1>";
}else{
	echo "<script>alert('注册失败')</script>";
	echo "<h1><a href='../../register.html'>返回重新注册</a></h1>";
}


?>