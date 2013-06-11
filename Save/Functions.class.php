<?php 
class Functions 
{
	public static function deleteDirectory($dir) 
	{ 
		if (!file_exists($dir)) return true; 
		if (!is_dir($dir) || is_link($dir)) return unlink($dir); 
			foreach (scandir($dir) as $item) { 
				if ($item == '.' || $item == '..') continue; 
				if (!Functions::deleteDirectory($dir . "/" . $item)) { 
					chmod($dir . "/" . $item, 0777); 
					if (!Functions::deleteDirectory($dir . "/" . $item)) 
						return false; 
				}; 
			} 
		return rmdir($dir);  
	} 
}
?>