// main.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "Sending...";
    status.style.color = "#007bff";

    const loader = document.createElement("div");
    loader.textContent = "⏳ Sending...";
    loader.style.color = "#007bff";
    loader.style.fontWeight = "bold";
    loader.style.marginTop = "1rem";
    status.replaceWith(loader);

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        loader.textContent = "✅ Message sent successfully!";
        loader.style.color = "green";
        form.reset();
        
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
      } else {
        loader.textContent = "❌ Something went wrong. Please try again.";
        loader.style.color = "red";
      }
    }).catch(() => {
      loader.textContent = "⚠️ Failed to send. Check your internet.";
      loader.style.color = "orange";
    });
  });
});
