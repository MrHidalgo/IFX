<?php
// temp folder
$temp = 'quotes';

// get all possible pairs
$files = scandir($temp);

// quotes array
$quotes = [];

foreach($files as $file){
    if($file == '.' || $file == '..' || $file == '.DS_Store') continue;
    
    $pair = substr($file, 0, strpos($file, '-'));
    $type = substr($file, strpos($file, '-') + 1, strlen($file) - strpos($file, '-') -  5);
    $value = file_get_contents($temp . '/' . $file);
    
    $quotes[$pair][$type] = $value;
}

$categories = [
    [
        'EURUSD',
        'GBPUSD',
        'USDJPY',
        'AUDUSD',
        'EURJPY'
    ],
    [
        'NAS100',
        'S&P500',
        'DJ30',
        'US$indx',  
    ],
    [
        'Germany30',
        'ChinaA50',
        'UK100',
        'US30',
        'USNDAQ100',
    ],
    [
        'TeslaMotor',
        'Amazon',
        'Alibaba',
        'Baidu',
        'Apple', 
    ],
    [
        'GOLD',
        'GOLDEURO',
        'SILVER',
        'SILVEREURO',
        'GOLDgr',
    ],
    [
        'BRENT',
        'Nat.Gas',
        'WTI',
        'US_Oil',
        'UK_Oil',  
    ]
];

$response = [
    [],[],[],[],[],[]
];

foreach($quotes as $key => $quote){
    foreach($categories as $i => $category){
        if(in_array($key, $category)) {
            $response[$i][] = [
                'name' => $key,
                'bid' => round($quote['bid'], 6),
                'ask' => round($quote['ask'], 6),
                'pips' => round($quote['pips'], 2)
            ];
        }
    }
}

echo json_encode($response);
?>