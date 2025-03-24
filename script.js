// Utility to check if time is between 10-11 AM
function isTatkalTime() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 11;
  }
  
  // Enable/disable quota options based on time
  function updateQuotaOptions() {
    const quota = document.getElementById("quota");
    const tatkal = quota.querySelector("option[value='Tatkal']");
    const premium = quota.querySelector("option[value='Premium Tatkal']");
  
    const nowValid = isTatkalTime();
    tatkal.disabled = !nowValid;
    premium.disabled = !nowValid;
  
    if (!nowValid && (quota.value === "Tatkal" || quota.value === "Premium Tatkal")) {
      quota.value = "General";
      alert("Tatkal & Premium Tatkal are only available between 10 AM and 11 AM.");
    }
  }
  
  // Call on page load
  document.addEventListener("DOMContentLoaded", () => {
    updateQuotaOptions();
    setInterval(updateQuotaOptions, 60000); // recheck every 60 seconds
  });
  
  function bookTicket() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const quota = document.getElementById("quota").value;
    const category = document.querySelector('input[name="category"]:checked')?.value || "None";
    const trainClass = document.querySelector('input[name="train-class"]:checked')?.value || "Sleeper";
    const captcha = prompt("Enter Captcha: 2X3K9"); // dummy captcha
    if (captcha !== "2X3K9") {
      alert("Incorrect Captcha. Try again.");
      return;
    }
  
    const payment = prompt("Select Payment Mode (UPI / Card / Netbanking):", "UPI");
    if (!payment) return;
  
    const priceMap = { "Sleeper": 300, "2S": 150, "3AC": 700, "2AC": 1000, "1AC": 1500 };
    let fare = priceMap[trainClass] || 300;
  
    if (quota === "Tatkal") fare += 100;
    else if (quota === "Premium Tatkal") fare += 200;
    if (category === "Senior Citizen") fare *= 0.5;
    else if (category === "Women") fare *= 0.75;
  
    const ticketHtml = `
      <strong>From:</strong> ${from}<br>
      <strong>To:</strong> ${to}<br>
      <strong>Date:</strong> ${date}<br>
      <strong>Class:</strong> ${trainClass}<br>
      <strong>Quota:</strong> ${quota}<br>
      <strong>Category:</strong> ${category}<br>
      <strong>Payment:</strong> ${payment}<br>
      <strong>Fare:</strong> ₹${fare.toFixed(2)}
    `;
  
    document.getElementById("ticketDetails").innerHTML = ticketHtml;
    document.getElementById("ticketModal").style.display = "flex";
  }
  
  // Modal controls
  function closeModal() {
    document.getElementById("ticketModal").style.display = "none";
  }
  
  function downloadTicket() {
    const element = document.getElementById("ticketContent");
    html2pdf().from(element).save("train_ticket.pdf");
  }
  