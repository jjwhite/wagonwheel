<?php

// first we want to save the data
writeToFile();

function writeToFile()
{
	$myFile = "events.txt";
	$fh = fopen($myFile, 'a') or die("can't open file");
	$stringData = ",\n".json_encode($_POST);
	fwrite($fh, $stringData);
	fclose($fh);
}

?>

