<?php
include 'config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


class Plano {

	public $code = 'mvp-001';

}

class Endereco{

	public $street;
	public $number;
	public $complement;
	public $district;
	public $city;
	public $state;
	public $country;
	public $zipcode;

	public function __construct($request){
		$this->street 		= $request->address_params->street;
		$this->number 		= $request->address_params->number;
		$this->complement 	= $request->address_params->street;
		$this->district 	= $request->address_params->district;
		$this->city 		= $request->address_params->city;
		$this->state 		= $request->address_params->state;
		$this->country 		= $request->address_params->country;
		$this->zipcode 		= $request->address_params->zipcode;
	}

}

class CartaoCredito{
	
	public $holder_name;
	public $number;
	public $expiration_month;
	public $expiration_year;
	
	public function __construct($request){
		$this->holder_name 		= $request->cartao->fullname;
		$this->number 			= $request->cartao->credit_card_number;
		$this->expiration_month = $request->cartao->expiration_month;
		$this->expiration_year 	= $request->cartao->expiration_year;
	}
	
}

class BillingInfo{
	public $credit_card;

	public function __construct($request){
		$this->credit_card = new CartaoCredito($request);
	}
}

class Custumer{
	public $code;
	public $email;
	public $fullname;
	public $cpf;
	public $phone_number;
	public $phone_area_code;
	public $birthdate_day;
	public $birthdate_month;
	public $birthdate_year;
	public $address;
	public $billing_info;

	public function __construct($request){
		$this->address = new Endereco($request);
		$this->billing_info = new BillingInfo($request);
		
		$code = substr($request->customer->phone_number,0, 2);
		$phone = substr($request->customer->phone_number,2);
		
		$this->code 			= $request->customer->cpf;
		
		$this->email 			= $request->user->email;
		$this->fullname 		= $request->user->name;
		$this->cpf 				= $request->customer->cpf;
		$this->phone_number 	= $phone;
		$this->phone_area_code 	= $code;
		$this->birthdate_day 	= $request->customer->birthdate_day;
		$this->birthdate_month 	= $request->customer->birthdate_month;
		$this->birthdate_year 	= $request->customer->birthdate_year;

	}

}

class Assinante {

	public $code;
	public $amount = '1990';
	public $payment_method = 'CREDIT_CARD';
	public $plan;
	public $customer;

	public function __construct($request){
		
		$date = new DateTime();
		
		$this->code = $date->getTimestamp();
		
		$this->plan = new Plano();
		$this->customer = new Custumer($request);
	}

}



$assinte = new Assinante($request);
$postData = json_encode($assinte);

// //sandbox
$urlNovaAssinatua = 'https://api.moip.com.br/assinaturas/v1/subscriptions?new_customer=true';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $urlNovaAssinatua);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_USERPWD, $auth);

curl_setopt($ch, CURLOPT_TIMEOUT, 40);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

$response = curl_exec($ch);


curl_close($ch);



echo $response;
