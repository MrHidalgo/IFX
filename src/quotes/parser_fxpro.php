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
$source = curlGet('https://pricing.fxdevpro.com/api/Quotes/GetQuotesForCategory?category=LandingPage');

// get data from json
$json = json_decode($source);
foreach($json as $element){
    $pair = $element->Name;
    $ask = $element->Ask;
    $bid = $element->Bid;
    $spread = $element->Spread;
    
    $pair = str_replace('#', '', $pair);
    
    file_put_contents($temp . '/' . $pair . '-pips' . '.txt', $spread);
    file_put_contents($temp . '/' . $pair . '-bid' . '.txt', $bid);
    file_put_contents($temp . '/' . $pair . '-ask' . '.txt', $ask);
}
?>