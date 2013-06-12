<?php
$host_db = "localhost:/tmp/mysql5.sock"; // nom de votre serveur
$user_db = "dbo424427993"; // nom d'utilisateur de connexion à votre bdd
$password_db = "fromus68"; // mot de passe de connexion à votre bdd
$bdd_db = "db424427993"; // nom de votre bdd

$connect_db = mysql_connect($host_db,$user_db,$password_db);
mysql_select_db($bdd_db,$connect_db);
	echo "<select name='sscategorie[]' style=\"width:290px;margin-top:3px;\">";
	
	if(isset($_POST["idAuteur"])){
		$res = mysql_query("SELECT * FROM sscategorie 
			WHERE sscat_scat=".$_POST["idAuteur"]." and sscat_lang='".$_POST["langue"]."'");
		while($row = mysql_fetch_assoc($res)){
			echo "<option value='".$row["sscat_code"]."'>".$row["sscat_libelle"]."</option>";
		}
	}
	echo "</select>";
?>