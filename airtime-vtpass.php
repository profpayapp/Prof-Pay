<?php
header('Content-Type: application/json');

$phone = $_POST['phone'];
$amount = $_POST['amount'];
$network = $_POST['network'];

// VTpass sandbox credentials
$username = "sandbox@vtpass.com";
$password = "sandbox";
$serviceID = strtolower($network) . "_airtime";

$postdata = json_encode([
    'serviceID' => $serviceID,
    'billersCode' => $phone,
    'variation_code' => '',
    'amount' => $amount,
    'phone' => $phone
]);

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://sandbox.vtpass.com/api/pay",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => $postdata,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Basic " . base64_encode("$username:$password")
    ]
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

// Return full response to frontend
if ($err) {
    echo json_encode(['status' => 'error', 'message' => "Curl Error: $err"]);
} else {
    echo $response;
}
