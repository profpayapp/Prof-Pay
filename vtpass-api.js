// vtpass-api.js
/**
 * VTpass API integration for Prof-Pay
 * Handles online payment transactions (airtime, data, electricity, TV)
 */

export async function purchaseVT(service, billersCode, amount) {
  try {
    // 🔹 Replace these with your real VTpass credentials
    const apiKey = "YOUR_VTPASS_API_KEY";
    const secretKey = "YOUR_VTPASS_SECRET_KEY";

    const payload = {
      serviceID: service,       // airtime, data, electricity, tv
      billersCode: billersCode, // phone, meter, or smartcard
      amount: amount,
      request_id: `PP-${Date.now()}` // Unique request ID for traceability
    };

    const response = await fetch("https://vtpass.com/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(apiKey + ":" + secretKey)
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("VTpass response:", data);

    return data; // Contains response_description, etc.
  } catch (err) {
    console.error("VTpass API error:", err);
    return { response_description: "Transaction Failed", error: err.message };
  }
}
