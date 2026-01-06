// vtpass-api.js
const VT_API_KEY = "6e42765736a76d61f25b1073866f2947"; // Sandbox API Key
const VT_SECRET_KEY = "SK_613610efe312a14f39c8fe51291320048e39980c7ab"; // Sandbox Secret Key
const VT_BASE_URL = "https://sandbox.vtpass.com/api";

// Function to make payment via VTpass
export async function purchaseVT(service, billersCode, amount) {
  try {
    const payload = {
      billersCode,
      serviceID: service.toLowerCase(),
      amount,
      request_id: "PP_" + Date.now(),
      apiKey: VT_API_KEY,
      secretKey: VT_SECRET_KEY
    };

    const response = await fetch(`${VT_BASE_URL}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("VTpass API Response:", data);
    return data;
  } catch (error) {
    console.error("VTpass API Error:", error);
    return { response_description: "Transaction failed", error: error.message };
  }
}
