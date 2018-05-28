<?php
// temp folder
$temp = 'quotes';

// get all possible pairs
$files = scandir($temp);

// quotes array
$quotes = [];

foreach($files as $file){
    if($file == '.' || $file == '..') continue;
    
    $pair = substr($file, 0, strpos($file, '-'));
    $type = substr($file, strpos($file, '-') + 1, strlen($file) - strpos($file, '-') -  5);
    $value = file_get_contents($temp . '/' . $file);
    
    $quotes[$pair][$type] = $value;
}

/*
использовать в шаблоне как <? echo $quotes['AUDUSD']['pips'] ?>
*/

echo $quotes['AUDUSD']['pips'];
?>