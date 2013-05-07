<?php
 
header("Content-Type: text/plain");
 
$store = (isset($_GET["Store"])) ? $_GET["Store"] : NULL;
$name = (isset($_GET["Name"])) ? $_GET["Name"] : NULL;
$price = (isset($_GET["Price"])) ? $_GET["Price"] : NULL;
 
if ($store && $name && $price) {
    echo "Ok";
} else {
    echo "FAILURE";
}
 
?>