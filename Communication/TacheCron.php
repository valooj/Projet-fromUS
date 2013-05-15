<?php

try{

	// connection
    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
    $bdd = new PDO('mysql:host=localhost;dbname=fromus', 'root', '', $options);

    //Requete a faire
    $req = $bdd->prepare('SELECT prd_id ,prd_site FROM produits');
	$rep = $req->execute();
	$donnees = $req->fetchAll();

	foreach($donnees as $row)
	{
    	//echo $row['prd_id'];
    	//echo $row['prd_site'];
    	$file = @file_get_contents($row['prd_site']);
		if (!$file) 
		{
			$file = @file_get_contents('www.'.$row['prd_site']);
			if (!$file) 
			{
				$file = @file_get_contents('http://www.'.$row['prd_site']);
				if (!$file) 
				{
					$file = @file_get_contents('https://www.'.$row['prd_site']);
					if (!$file) 
					{
						echo 'URL non valide !';
						$req = $bdd->prepare('DELETE FROM produits WHERE prd_id= :_id');
						$req->bindParam('_id', $row['prd_id'], PDO::PARAM_INT);
						$req->execute();
					}
				}
			}
		}
		//Code pour vérifier le prix

	}
}

catch (PDOException $e) {
    print $e->getMessage();
 }


?>