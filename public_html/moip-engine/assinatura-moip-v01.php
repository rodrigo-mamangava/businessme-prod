<?php
//SANDBOX
$token = 'CXD4ZTOTO50KKZBMAB7ZHTT3HVMUNXF2';
$key = 'I0V07Z0TIMJEESAPMCMQ17V2GE8QNOSMEFMJJIGH';

//PRODUCAO
$token = 'BWTSKYIJFPLD0RCNL6HVAIUX0LNLTFAT';
$key = 'F1MJV6CDI6JQYXIKBV81BQ0TTZAJ0TLTBVQHC2RF';


$auth = $token.':'.$key;

$header = array(
    'Content-Type:application/json',
    "Authorization: Basic " . base64_encode($auth)
);


//sandbox
$urlList = 'https://api.moip.com.br/assinaturas/v1/plans';



$curl = curl_init();

//curl_setopt($curl, CURLOPT_HTTPHEADER, $headers); 
curl_setopt($curl, CURLOPT_HTTPHEADER, $header); 

curl_setopt($curl, CURLOPT_USERPWD, $auth);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL,$urlList);

$result=curl_exec($curl);
curl_close($curl);

echo ($result);
