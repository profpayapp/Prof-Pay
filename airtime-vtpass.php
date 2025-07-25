<?php
// Enable CORS for development (optional: remove or restrict in production)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// VTpass credentials (sandbox)
$username = "sandbox@vtpass.com";
$password = "sandbox";
$host = "https://sandbox.vtpass.com/api/pay";

// Collect input from JS fetch POST
$phone = $_POST['phone'] ?? '';
$amount = $_POST['amount'] ?? '';
$network = $_POST['network'] ?? '';
$request_id = uniqid("profpay_", true); // Unique ID for this request

// Basic validation
if (!$phone || !$amount || !$network) {
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Prepare payload
$data = [
    'request_id' => $request_id,
    'serviceID' => strtolower($network), // e.g. 'mtn'
    'billersCode' => $phone,
    'amount' => $amount,
    'phone' => $phone
];

// Initialize CURL
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $host,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Basic " . base64_encode("$username:$password")
    ]
]);

// Execute and capture response
$response = curl_exec($curl);
$error = curl_error($curl);
curl_close($curl);

// Log response for debugging
$logData = "===== " . date("Y-m-d H:i:s") . " =====\n";
$logData .= "Request ID: $request_id\n";
$logData .= "Phone: $phone | Amount: $amount | Network: $network\n";
$logData .= $response ?: "Curl Error: $error";
$logData .= "\n\n";
file_put_contents("vtpass_response_log.txt", $logData, FILE_APPEND);

// Return to frontend
if ($response === false) {
    echo json_encode(['error' => "Connection error: $error"]);
} else {
    echo $response;
}
?>
