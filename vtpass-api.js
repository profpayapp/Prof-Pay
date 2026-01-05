// vtpass-api.js
// Dummy VTpass API for testing - Replace with real VTpass integration when ready
export async function purchaseVT(service, billersCode, amount) {
    console.log(`VTpass called: ${service}, ${billersCode}, ${amount}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Always return success for testing
    return {
        response_description: "Transaction Successful"
    };
}
