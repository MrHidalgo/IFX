<?php
// dom library
include_once('simple_html_dom.php');

// temp folder
$temp = 'quotes';

// curl GET query
function curlGet($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_REFERER, getHost($url));
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
    $contents = curl_exec ($ch);
    curl_close ($ch);
    return $contents;
}

// get host referer
function getHost($url) { 
    $parseUrl = parse_url(trim($url)); 
    
    return 'https://' . trim($parseUrl['host'] ? $parseUrl['host'] : array_shift(explode('/', $parseUrl['path'], 2))); 
}

// get quotes data
$source = curlGet('https://pepperstone.com/ru/quotes');

// parse HTML data
$html = str_get_html($source);

foreach($html->find('li.p-asset-curr') as $li){
    $pair = $li->find('p', 0)->innertext;
    $pips = $li->find('li.p-spread', 0)->find('p.p-lrgNumber', 0)->innertext;
    $bid = $li->find('li.p-bid', 0)->find('p.p-mdmNumber', 0)->innertext;
    $ask = $li->find('li.p-ask', 0)->find('p.p-mdmNumber', 0)->innertext;
    
    // 
    if(!empty($paid) && !empty($pips) && !empty($bid) && !empty($ask)){
        file_put_contents($temp . '/' . $pair . '-pips' . '.txt', $pips);
        file_put_contents($temp . '/' . $pair . '-bid' . '.txt', $bid);
        file_put_contents($temp . '/' . $pair . '-ask' . '.txt', $ask);
    }
} 
?>