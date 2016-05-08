<?php
//SANDBOX
//$token = 'CXD4ZTOTO50KKZBMAB7ZHTT3HVMUNXF2';
//$key = 'I0V07Z0TIMJEESAPMCMQ17V2GE8QNOSMEFMJJIGH';

//PRODUCAO
$token = 'BWTSKYIJFPLD0RCNL6HVAIUX0LNLTFAT';
$key = 'F1MJV6CDI6JQYXIKBV81BQ0TTZAJ0TLTBVQHC2RF';



$auth = $token.':'.$key;

$header = array(
    'Content-Type:application/json',
    "Authorization: Basic " . base64_encode($auth)
);
