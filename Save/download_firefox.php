<?php

	include_once 'HZip.class.php';
	include_once 'Functions.class.php';

	try
	{
		// connection
	    $options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
	    $options[PDO::MYSQL_ATTR_INIT_COMMAND] = 'SET NAMES UTF8;';
	    $bdd = new PDO('mysql:host=localhost;dbname=fromus', 'root', '', $options);

	    $id_user =  '16dwfvw8567gfw1sdw'; /*$_SESSION['usr_fus']["id"]*/
		$token_app = uniqid();
		$token_user = sha1(md5('lkdqjqoerjf'.time().$id_user)); 
			
		//insertion des token dans la bdd
	
		

		$req = $bdd->prepare('INSERT INTO token(tok_user, tok_token, tok_ext) VALUES (:_user, :_app, :_ext)');
		$req->execute(array(
			'_user' => $id_user,
			'_app' => $token_user,
			'_ext' => $token_app
			));
		$req->closeCursor();

		//echo $token;
		$data = 'var token = ' . $token_app . ';';
		$nav = '.xpi';  //changer en xpi
		$nomPlugin = 'fomUS';

		 
		
		//récupération du fichier
		$file = 'from_us.zip';
		$filenameJS = 'dialog.js';
		$url = './tmp/';
		$outZip = tempnam('', 'zip');

		
		//création du zip
		$zip = new ZipArchive();
		$open = $zip->open($file, ZIPARCHIVE::CHECKCONS);

		if ($open === TRUE) {
			$zip->extractTO($url);
			//ecriture de l'identifiant du client dans le fichier.
			//file_get_contents($filenameJS);
			$zip->close();
			file_put_contents($url.$filenameJS, $data, FILE_APPEND | LOCK_EX);
		}

		HZip::zipDirE($url, $outZip); 

		// entêtes HTTP
	    header('Content-Type: application/zip');
	    header("Content-Length: " . filesize($outZip));
	    // force le téléchargement
	    header('Content-Disposition: attachement; filename='.$nomPlugin.$nav);
	    readfile($outZip);

		unlink($outZip);
		Functions::deleteDirectory($url);
	}

	catch( Exception $error )
	{
		$response['error'] = $error->getMessage();
	}
	echo json_encode($response);
?>