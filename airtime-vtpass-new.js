document.getElementById('sendAirtimeBtn').addEventListener('click', function () {
    const phone = document.getElementById('airtime-phone').value;
    const amount = document.getElementById('airtime-amount').value;
    const network = document.querySelector('input[name="airtime-network"]:checked').value;

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('amount', amount);
    formData.append('network', network);

    fetch('VTPass-airtime.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Log full response to browser console
        console.log("VTpass API Response:", data);

        // Display response message
        const resultBox = document.getElementById('airtime-result');
        if (data.code === '000') {
            resultBox.innerHTML = `<span style="color: green;">✅ Success: ${data.response_description}</span>`;
        } else {
            resultBox.innerHTML = `<span style="color: red;">❌ Failed: ${data.response_description || data.message}</span>`;
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        document.getElementById('airtime-result').innerHTML = `<span style="color: red;">❌ Request Failed</span>`;
    });
});
