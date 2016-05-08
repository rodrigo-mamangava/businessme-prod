<?php

include 'config.php';


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$code = $request->assinatura->code;

$urlCancelarAssinatura = "https://api.moip.com.br/assinaturas/v1/subscriptions/{$code}/suspend";

$ch = curl_init();

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_USERPWD, $auth);
curl_setopt($ch, CURLOPT_URL, $urlCancelarAssinatura);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");


$response = curl_exec($ch);
curl_close($ch);

echo $response;