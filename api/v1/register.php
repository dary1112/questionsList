<?php
include("../db.php");

$username = $_REQUEST['username'];
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];

$sql = "insert into userinfo (username, email, password) values ('$username','$email','$password')";

$isSucc = mysql_query($sql);

if($isSucc){
	$arr = array('res_code' => 1);
	echo json_encode($arr);
}else{
	$arr = array('res_code' => 0);
	echo json_encode($arr);
}


?>