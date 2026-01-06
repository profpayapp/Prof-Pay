// vtpass-api.js
// This file handles VTpass API calls for Prof-Pay

const VT_API_URL = "https://sandbox.vtpass.com/api"; // Sandbox URL
const API_KEY = "6e42765736a76d61f25b1073866f2947"; // Your sandbox API Key
const SECRET_KEY = "SK_613610efe312a14f39c8fe51291320048e39980c7ab"; // Your sandbox Secret Key

/**
 * Purchase a VTpass service
 * @param {string} service - Service type (airtime, data, electricity, tv)
 * @param {string} billersCode - Phone number, meter number, or smartcard number
 * @param {number} amount - Amount to pay
 * @returns {object} - Response from VTpass API
 */
export async function purchaseVT(service, billersCode, amount) {
  try {
    const payload = {
      serviceID: service,
      billersCode: billersCode,
      amount: amount,
      request_id: `profpay_${Date.now()}`,
      phone: billersCode // optional for airtime/data
    };

    const response = await fetch(`${VT_API_URL}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(API_KEY + ":" + SECRET_KEY)}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("VTpass API Response:", data);
    return data;
  } catch (error) {
    console.error("Error calling VTpass API:", error);
    return { response_description: "API Error", error: error.message };
  }
}
