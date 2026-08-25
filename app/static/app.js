// DemoBank AI SDLC — client-side JS
// Handles the transfer form submission via fetch

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("transfer-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      fromAccount: form.fromAccount.value,
      toAccount: form.toAccount.value,
      amount: form.amount.value,
      memo: form.memo.value,
    };

    fetch("/api/transfers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        const resultDiv = document.getElementById("transfer-result");
        if (result.success) {
          // DEMO UX BUG: shows success even for invalid (negative/zero) amounts
          const successDiv = document.createElement("div");
          successDiv.className = "alert alert-success";
          successDiv.setAttribute("style", "font-size:18px;font-weight:800;padding:24px;");
          const amountStrong = document.createElement("strong");
          amountStrong.textContent = "$" + result.amount;
          const tidSpan = document.createElement("span");
          tidSpan.setAttribute("style", "font-size:12px;color:#276749;");
          tidSpan.textContent = "Transaction ID: " + result.transferId;
          successDiv.appendChild(document.createTextNode("✅ Transfer completed successfully!"));
          successDiv.appendChild(document.createElement("br"));
          successDiv.appendChild(document.createTextNode("Amount transferred: "));
          successDiv.appendChild(amountStrong);
          successDiv.appendChild(document.createElement("br"));
          successDiv.appendChild(tidSpan);
          resultDiv.innerHTML = "";
          resultDiv.appendChild(successDiv);
        } else {
          const errorDiv = document.createElement("div");
          errorDiv.className = "alert alert-error";
          errorDiv.textContent = "Error: " + result.error;
          resultDiv.innerHTML = "";
          resultDiv.appendChild(errorDiv);
        }
      })
      .catch(() => {
        document.getElementById("transfer-result").innerHTML =
          '<div class="alert alert-error">Transfer request failed.</div>';
      });
  });
});
