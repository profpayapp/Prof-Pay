<form id="airtimeForm" method="POST" action="vtpass-airtime.php">
  <input type="text" name="phone" placeholder="Phone Number" required>
  <input type="number" name="amount" placeholder="Amount" required>
  <select name="network" required>
    <option value="mtn">MTN</option>
    <option value="glo">GLO</option>
    <option value="airtel">Airtel</option>
    <option value="etisalat">9mobile</option>
  </select>
  <button type="submit">Send Airtime</button>
</form>
