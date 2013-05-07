<?php 

header("Content-Type: text/plain");

$nick = (isset($_GET["Nick"]) ? $_GET["Nick"] : NULL);
$name = (isset($_GET["Name"]) ? $_GET["Name"] : NULL);

if ($name && $nick) {
	echo "Bonjour ". $name . " ! Votre pseudo est " . $nick;
}
else{
	echo "FAIL";
}
?>	