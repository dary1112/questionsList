<?php
include("../db.php");

$title = $_GET['title'];
$answer = $_GET['answer'];

$sqlAdd = "insert into questions (title, answer) values ('$title','$answer')";

if(mysql_query($sqlAdd)){
	//查询数据库的最后一条
		//查询到总条数 20
		// limit   19, 1
	$arr = array('res_code' => 1, 'res_message' => "添加成功");
}else{
	$arr = array('res_code' => 0, 'res_message' => "数据库操作失败");
}

echo json_encode($arr);

?>