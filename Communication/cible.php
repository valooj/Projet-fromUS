<?php
 
header('Content-type: application/json');

/*if(isset($_POST["json"])){
    $json = stripslashes($_POST["json"]);
    $output = json_decode($_POST["json"]);
	echo(json_encode($output));
} 
*/
/*
$post_product = (isset($_POST['products'])) ? $_POST['products'] : NULL;
if($post_product){
	$datas = json_decode($post_product, TRUE);
	$var_libelle=$datas['prd_libelle'];
	$var_site=$datas['prd_site'];
	$var_prix=3.4;
} 
*/
if(isset($_POST["json"])){
    $json = stripslashes($_POST["json"]);
    $output = json_decode($_POST["json"],TRUE);
	$var_libelle=$output['prd_libelle'];
	$var_site=$output['prd_site'];
	$var_prix=str_replace ( '$', '', $output['prd_prix']);
}

if (isset($_POST['user'])) {
    $user = stripslashes($_POST['user']);
    $userOP = json_decode($_POST['user'],true);
    $pseudo = $userOP['pseud'];
    $mdp = $userOP['mot'];
}

/*$jsonData = '{ "user":"John", "age":22, "country":"United States" }';
$phpArray = json_decode($jsonData);
print_r($phpArray);

echo json_encode($jsonData);
*/

//Connection base de données 
try
{
    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
    $bdd = new PDO('mysql:host=localhost;dbname=demo_fromus', 'root', '', $options);
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}

$req = $bdd->prepare('INSERT INTO produits(prd_libelle, prd_site, prd_desc, prd_cat, prd_visu, prd_prix, prd_vis) VALUES(:_libelle, :_site, :_desc, :_cat, :_visu, :_prix, :_vis)');
$req->execute(array(
    '_libelle' => $var_libelle,
    '_site' => $var_site,
    '_desc' => 'dscnico',
    '_cat' => 99,
    '_visu' => 'visunico',
    '_prix' => $var_prix,
    '_vis' => 1
    ));

$req1 = $bdd->exec('UPDATE users SET user_point = 100 WHERE  user_id = 1');


?>