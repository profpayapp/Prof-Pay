<script>
document.getElementById("airtimeForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const phone = document.getElementById("phone").value;
    const amount = document.getElementById("amount").value;
    const network = document.getElementById("network").value;
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "⏳ Sending request...";

    try {
        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("amount", amount);
        formData.append("network", network);

        const response = await fetch("VTPass-airtime.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.error) {
            statusDiv.innerHTML = `❌ <strong>${result.error}</strong>`;
        } else if (result.code === "000") {
            statusDiv.innerHTML = `✅ Airtime Sent Successfully! <br>Transaction ID: ${result.requestId}`;
        } else {
            statusDiv.innerHTML = `⚠️ ${result.response_description || "Transaction failed."}`;
        }

    } catch (err) {
        statusDiv.innerHTML = `❌ Unexpected error: ${err.message}`;
    }
});
</script>
