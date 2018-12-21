<?php
//CORS服务器端允许跨域访问
header("Access-Control-Allow-Origin:http://localhost");
include("../db.php");

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select * from userinfo where username='$username' and password='$password'";

$res = mysql_query($sql);

//如果$res有结果，那么只有一条
if($row = mysql_fetch_assoc($res)){
	$arr = array('res_code' => 1, 'res_body' => $row);
}else{
	$arr = array('res_code' => 0, 'res_body' => '');
}

echo json_encode($arr);


	
?>