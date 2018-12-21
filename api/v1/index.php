<?php
	include("../db.php");

	$sql = "select * from questions";

	$res = mysql_query($sql);

	$arr = array();
	while($row = mysql_fetch_assoc($res)){
		array_push($arr, $row);
	}

	$response = array('res_code' => 1, "res_body" => $arr);

	echo json_encode($response);


?>