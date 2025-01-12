function sendMail() {
  // Gather input values
  const params = {
    from_name: document.getElementById("contact-name").value.trim(),
    email_id: document.getElementById("contact-email").value.trim(),
    phone_number: document.getElementById("contact-phone").value.trim(),
    address: document.getElementById("contact-address").value.trim(),
    message: document.getElementById("contact-message").value.trim(),
  };

  // Validate required fields
  if (!params.from_name || !params.email_id || !params.phone_number || !params.address || !params.message) {
    alert("Please fill in all required fields: Name, Email, Phone Number, Address, and Message.");
    return;
  }

  // Send email using EmailJS
  emailjs
    .send("service_10uylaw", "template_72ay0ab", params)
    .then(function (res) {
      alert("Message sent successfully!");
      // Clear the form
      document.getElementById("contact-name").value = "";
      document.getElementById("contact-email").value = "";
      document.getElementById("contact-phone").value = "";
      document.getElementById("contact-address").value = "";
      document.getElementById("contact-message").value = "";
    })
    .catch(function (err) {
      alert("Failed to send message. Please try again. Error: " + err.text);
    });
}

// Add event listener to the SEND button
document.getElementById("contactSendBtn").addEventListener("click", () => {
  sendMail();
});