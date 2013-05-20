<?php

try{

	// connection
    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
    $bdd = new PDO('mysql:host=localhost;dbname=fromus', 'root', '', $options);

    //unlink ("./traceTacheCron.txt");

    //Requete a faire
    $req = $bdd->prepare('SELECT prd_id ,prd_site, prd_prix FROM produits');
	$rep = $req->execute();
	$donnees = $req->fetchAll();

	foreach($donnees as $row)
	{
		$bResult = false;
		foreach( array(null, 'wwww.', 'http://', 'http://www.', 'https://', 'https://www.') as $prefix )
		{
			$content = @file_get_contents($prefix .  $row['prd_site']);
			if( !$content )
				continue; // passe au suivant

			// search website price
			$result = strpos($content,$row['prd_prix']);
			if(!$result){
				$req = $bdd->prepare('UPDATE produits SET prd_vis = 0 WHERE  prd_id = :_id');
				$req->bindParam('_id', $row['prd_id'], PDO::PARAM_INT);
				$rep =$req->execute();
				$req->closeCursor();

				file_put_contents('./traceTacheCron.txt', print_r($row['prd_id'].' : prix introuvable', 1) . PHP_EOL . '===========================================' . PHP_EOL, FILE_APPEND);
			}

			$bResult = true;
			break; // quitte la boucle
		}

		if( !$bResult ) {
			$req = $bdd->prepare('UPDATE produits SET prd_vis = 0 WHERE  prd_id = :_id');
			$req->bindParam('_id', $row['prd_id'], PDO::PARAM_INT);
			$rep =$req->execute();
			$req->closeCursor();

			file_put_contents('./traceTacheCron.txt', print_r($row['prd_id'].' : site introuvable', 1) . PHP_EOL . '===========================================' . PHP_EOL, FILE_APPEND);
		}
	}


}

catch (PDOException $e) {
    print $e->getMessage();
 }


?>