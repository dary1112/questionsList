<?php
include('../db.php');
$id = $_GET['id'];

$sql = "delete from questions where id=$id";
//echo $sql;
$isSucc = mysql_query($sql);

if($isSucc){
	$arr = array('res_code' => 1, "res_message" => "删除成功" );
}else{
	$arr = array('res_code' => 0, 'res_message' => "数据库操作失败");
}

echo json_encode($arr);

?>