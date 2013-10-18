<?php	

	$myFile = "events.txt";
	$fh = fopen($myFile, 'r') or die("can't open file");
 	$contents = "[".fread($fh, filesize($myFile))."]";
	fclose($fh);
	echo($contents);
	
?>