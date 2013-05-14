<?php
	//récupération du fichier
	$file = 'idt.zip'
	$filenameJS = 'idt.js';
	$url = ./tmp/
	
	//création du zip
	$zip = new ZipArchive();
	$open = $zip->open($file, ZIPARCHIVE::CHECKCONS);

	if ($open === TRUE) {
		if (!$zip->extractTO($url)) {
			die('Error during the extracting');
		}
		zip->close();
	}

	$new_archive_name = 'plugin.zip';
	$new_zip = new ZipArchive();
	$new_open = $new_zip->open($new_archive_name,ZIPARCHIVE::CREATE);
	if($new_open === TRUE){
		$dir = opendir($url);
		while ($file = readdir($dir)) {
			if ($file == '.' || $file == '..') {
				if (!$new_zip->addFile($file)) {
					print $file.' was not added! <br />';
				}
			}
		}
	}
	$new_zip->close();

		/*
		echo 'OK';
		//extraction temporaire de l'archive
		$zip->extractTO('./');
		$zip->close();

		//ouverture du fichier idt.js
		$idt = fopen($filenameJS, 'r+');
		//file_get_contents(filename);
		//file_put_contents(filename, data)
		//ecriture de l'identifiant du client dans le fichier.
		fseek($idt, 0);
		fputs($idt, 'var blabla = 10; ');
		fclose($idt);
		$archive = new ZipArchive();
		if ($archive->open($archivename, ZIPARCHIVE::CREATE)!==TRUE) {
			exit('cannot open <$filename>\n');
		}
		$archive->addFile($filenameJS);
		$archive->close();
	}
	else {
		echo 'KO code error :'. $res ;
	}*/

	// entêtes HTTP
    header('Content-Type: application/zip');
    header("Content-Length: " . filesize($archivename));
    // force le téléchargement
    header('Content-Disposition: attachement; filename='.$archivename);
    readfile($file);
?>