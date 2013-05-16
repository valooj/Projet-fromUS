<?php
	include_once 'HZip.class.php';
	include_once 'Functions.class.php';
	$id_user ='54fv4sdrtgd455yhbd4';
	$nav = '.crx';
	$nomPlugin = 'fomUS';

	//Delete folder function 
	
	//récupération du fichier
	$file = 'from_us.zip';
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
    header('Content-Disposition: attachement; filename='.$nomPlugin.$nav);
    readfile($outZip);

	unlink($outZip);
	Functions::deleteDirectory($url);
?>