<?php

cutline("events.txt", $_GET["lineNum"]);


function cutline($filename,$line_no=-1) { 

$strip_return=FALSE; 

$data=file($filename); 
$pipe=fopen($filename,'w'); 
$size=count($data); 
	

if($line_no==-1) $skip=$size-1; 
else $skip=$line_no-1; 

for($line=0;$line<$size;$line++) 
if($line!=$skip) 
fputs($pipe,$data[$line]); 
else 
$strip_return=TRUE; 

fclose($pipe);
if ($line_no == $size)
{
	striplastchar();
	
}

return $strip_return; 
} 

function striplastchar()
{
	$fh = fopen("events.txt", 'r+') or die("can't open file");
	
	$stat = fstat($fh);
	ftruncate($fh, $stat['size']-2);
	fclose($fh); 
}

?>