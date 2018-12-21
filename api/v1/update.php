<?php
include("../db.php");

$id = $_POST['id'];
$title = $_POST['title'];
$answer = $_POST["answer"];

//sql语句
$sql = "update questions set title='$title', answer='$answer' where id=$id";

$isSucc = mysql_query($sql);

if($isSucc){
	$arr = array(
		'res_code' => 1, 
		'res_message' => '成功',
		'res_body' => array(
			'id' => $id,
			'title' => $title,
			'answer' => $answer

		)
	);
}else{
	$arr = array(
		'res_code' => 0, 
		'res_message' => "数据库操作失败",
		'res_body' => array(
			'id' => $id,
			'title' => $title,
			'answer' => $answer

		)
	);
}

echo json_encode($arr);



?>