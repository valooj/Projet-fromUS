<?php
	include_once 'HZip.class.php';
	include_once 'Functions.class.php';
	//$id_user = $_SESSION['usr_fus']['id'];

	//Delete folder function 
	
	//récupération du fichier
	$file = 'favelets.zip';
	$filenameJS = 'idt.js';
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
		file_put_contents($url.$filenameJS, $id_user);
	}

	HZip::zipDirE($url, $outZip); 

	// entêtes HTTP
    header('Content-Type: application/zip');
    header("Content-Length: " . filesize($outZip));
    // force le téléchargement
    header('Content-Disposition: attachement; filename=plugin.zip');
    readfile($outZip);

	unlink($outZip);
	Functions::deleteDirectory($url);
?>