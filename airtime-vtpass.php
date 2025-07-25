<?php
header('Content-Type: application/json');

$phone = $_POST['phone'];
$amount = $_POST['amount'];
$network = strtolower($_POST['network']); // Ensure it's lowercase

$curl = curl_init();

$post_fields = [
    "request_id" => uniqid(), // Unique ID for each request
    "serviceID" => $network,  // 'mtn', 'glo', 'airtel', 'etisalat'
    "amount" => $amount,
    "phone" => $phone,
];

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://sandbox.vtpass.com/api/pay",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($post_fields),
    CURLOPT_HTTPHEADER => array(
        "Content-Type: application/json",
        "api-key: sandbox",             // VTPass Sandbox Key
        "secret-key: sandbox",          // VTPass Sandbox Secret
        "public-key: sandbox",          // VTPass Sandbox Public Key
    ),
));

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

// Return detailed feedback
if ($error) {
    echo json_encode(["status" => "error", "message" => $error]);
} else {
    echo $response; // Send raw VTpass response
}
?>
