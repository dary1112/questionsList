<?php

$dbInfo = array(
	'host' => 'localhost:3306',
	'username' => 'root',
	'password' => '',
	'dbname' => 'questions'
);

mysql_connect($dbInfo['host'], $dbInfo['username'], $dbInfo['password']);

mysql_select_db($dbInfo['dbname']);

mysql_query("set charset 'utf-8'");
mysql_query("set character set 'utf8'");

?>