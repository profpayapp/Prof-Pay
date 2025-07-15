const form = document.getElementById('airtimeForm');
const msg = document.getElementById('responseMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = 'Processing...';

  const phone = document.getElementById('phone').value.trim();
  const network = document.getElementById('network').value.trim().toLowerCase();
  const amount = document.getElementById('amount').value;

  const timestamp = new Date();
  const request_id = timestamp.getFullYear().toString() +
    String(timestamp.getMonth() + 1).padStart(2, '0') +
    String(timestamp.getDate()).padStart(2, '0') +
    String(timestamp.getHours()).padStart(2, '0') +
    String(timestamp.getMinutes()).padStart(2, '0') +
    Math.floor(Math.random() * 1000);

  const payload = {
    request_id: request_id,
    serviceID: network,
    amount: amount,
    phone: phone
  };

  try {
    const response = await fetch('https://sandbox.vtpass.com/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '6e42765736a76d61f25b1073866f2947',
        'Authorization': 'Basic ' + btoa('PK_6674c3f579be5f6fc7055c53cf949ebaf51c6ab714d:SK_399627c47bc2053d6ec3b36be66e1311277d3643d05')
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('📦 API Response:', data);

    if (data.code === '000') {
      msg.textContent = `✅ Airtime sent to ${phone} on ${network.toUpperCase()} - ₦${amount}`;
    } else {
      msg.textContent = `❌ Error: ${data.response_description || data.responseMessage || data.message || 'Unknown error'}`;
    }
  } catch (err) {
    console.error('❌ Network/API Error:', err);
    msg.textContent = '❌ Network error, please try again.';
  }
});
