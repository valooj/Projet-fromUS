<?php
	//récupération du fichier
	$file = 'idt.zip';
	$filenameJS = 'idt.js';
	$url = './tmp/';
	
	//création du zip
	$zip = new ZipArchive();
	$open = $zip->open($file, ZIPARCHIVE::CHECKCONS);

	if ($open === TRUE) {
		$zip->extractTO($url);
		//ecriture de l'identifiant du client dans le fichier.
		//file_get_contents($filenameJS);
		file_put_contents($filenameJS, 'var blabla = 10; ');
		$zip->close();
	}

	$new_archive_name = 'plugin.zip';
	$new_zip = new ZipArchive();
	$new_open = $new_zip->open($new_archive_name,ZIPARCHIVE::CREATE);
	if($new_open === TRUE){
		$dir = opendir($url);
		while ($file = readdir($dir)) {
			if ($file != '.' && $file != '..') {
				if (!$new_zip->addFile($file)) {
					print $file.' was not added! <br />';
				}
				//echo $file;
			}
		}
	}
//	$new_zip->addFile($file);
	$new_zip->close();

	// entêtes HTTP
    header('Content-Type: application/zip');
    header("Content-Length: " . filesize($new_archive_name));
    // force le téléchargement
    header('Content-Disposition: attachement; filename='.$new_archive_name);
    readfile($new_archive_name);

		/*
		echo 'OK';
		//extraction temporaire de l'archive
		$zip->extractTO('./');
		$zip->close();

		//ouverture du fichier idt.js
		$idt = fopen($filenameJS, 'r+');
		//file_get_contents(filename);
		//file_put_contents(filename, data)
		
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

	
?>