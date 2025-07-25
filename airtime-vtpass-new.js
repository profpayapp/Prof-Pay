<script>
document.getElementById("airtimeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const network = document.getElementById("network").value.toLowerCase();

  const formData = new FormData();
  formData.append("phone", phone);
  formData.append("amount", amount);
  formData.append("network", network);

  fetch("VTPass-airtime.php", {
    method: "POST",
    body: formData,
  })
  .then(res => res.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      if (data.code === '000') {
        alert("✅ Airtime sent successfully!");
      } else {
        alert("❌ VTpass Error: " + (data.response_description || data.message || "Unknown error"));
        console.log("Full VTpass Response:", data);
      }
    } catch (e) {
      alert("❌ Error parsing VTpass response:\n" + text);
    }
  })
  .catch(err => {
    alert("❌ Network Error: " + err.message);
  });
});
</script>
