<?php
// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method is allowed']);
    exit;
}

// Get input from POST
$phone = $_POST['phone'] ?? '';
$amount = $_POST['amount'] ?? '';
$network = $_POST['network'] ?? ''; // Example: 'mtn', 'glo', 'airtel', 'etisalat'

// Basic validation
if (empty($phone) || empty($amount) || empty($network)) {
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

// VTpass sandbox credentials
$username = "sandbox@vtpass.com";
$password = "sandbox";

// Unique request ID (for testing you can randomize)
$request_id = uniqid();

// VTpass API payload
$payload = [
    "request_id"    => $request_id,
    "serviceID"     => $network,
    "billersCode"   => $phone,
    "variation_code"=> "",
    "amount"        => $amount,
    "phone"         => $phone
];

// Setup cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://sandbox.vtpass.com/api/pay");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

// Execute
$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

// Handle result
if ($error) {
    echo json_encode(['error' => 'Connection error: ' . $error]);
} else {
    echo $response;
}
