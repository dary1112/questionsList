<?php
	include("../db.php");

	$pageIndex = $_GET['pageIndex'];
	$pageCount = $_GET['pageCount'];

	//获取所有数据的条数
	$sqlAll = "select * from questions";
	$resAll = mysql_query($sqlAll);
	$rows = mysql_num_rows($resAll);

	$pages = ceil($rows/4);

	//判断页码是否越界
	if($pageIndex > $pages) $pageIndex = $pages;

	//1  4        2 4 
	//limit 0,4   4,4

	$start = ($pageIndex-1) * 4;

	$sql = "select * from questions limit $start, $pageCount";

	$res = mysql_query($sql);

	$arr = array();
	while($row = mysql_fetch_assoc($res)){
		array_push($arr, $row);
	}

	$response = array('res_code' => 1, "res_body" => $arr, "pages" => $pages, "pageIndex" => $pageIndex);

	echo json_encode($response);


?>