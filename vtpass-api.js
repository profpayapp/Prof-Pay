// vtpass-api.js
const VT_API_KEY = "6e42765736a76d61f25b1073866f2947"; // Sandbox API Key
const VT_SECRET_KEY = "SK_613610efe312a14f39c8fe51291320048e39980c7ab"; // Sandbox Secret
const SANDBOX = true; // true for sandbox environment

export async function purchaseVT(service, billersCode, amount) {
  const url = SANDBOX 
    ? "https://sandbox.vtpass.com/api/pay" 
    : "https://vtpass.com/api/pay";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(`${VT_API_KEY}:${VT_SECRET_KEY}`)
      },
      body: JSON.stringify({
        service: service,
        billersCode: billersCode,
        amount: amount,
        request_id: `PP-${Date.now()}` // unique transaction ID
      })
    });

    const data = await response.json();
    console.log("Sandbox response:", data); // check request_id here
    return data;
  } catch (err) {
    console.error("VTpass API error:", err);
    return { response_description: "Transaction failed: API error" };
  }
}
