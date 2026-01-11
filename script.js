let lastCheckId = null;

// Бет толық жүктелген соң батырмаларды байлаймыз
document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generateBtn");
  const pdfBtn = document.getElementById("pdfBtn");
  const verifyBtn = document.getElementById("verifyBtn");

  if (generateBtn) generateBtn.onclick = generateCheck;
  if (pdfBtn) pdfBtn.onclick = downloadPDF;
  if (verifyBtn) verifyBtn.onclick = verifyCheck;
});

// Чек генерациялау
function generateCheck() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  lastCheckId = "PF-" + randomNumber;

  const checkIdEl = document.getElementById("checkId");
  const dateEl = document.getElementById("date");
  const verifyResult = document.getElementById("verifyResult");

  if (checkIdEl) checkIdEl.textContent = lastCheckId;
  if (dateEl) dateEl.textContent = new Date().toLocaleString("kk-KZ");
  if (verifyResult) verifyResult.textContent = "";
}

// PDF жүктеу (браузер арқылы)
function downloadPDF() {
  if (!lastCheckId) {
    alert("Алдымен чек жасаңыз!");
    return;
  }
  window.print();
}

// Чек ID тексеру
function verifyCheck() {
  const inputEl = document.getElementById("verifyInput");
  const resultEl = document.getElementById("verifyResult");

  if (!inputEl || !resultEl) return;

  const inputValue = inputEl.value.trim();

  if (inputValue === "") {
    resultEl.textContent = "Чек ID енгізіңіз";
    resultEl.style.color = "red";
    return;
  }

  if (inputValue === lastCheckId) {
    resultEl.textContent = "✅ Чек расталды";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = "❌ Чек табылмады";
    resultEl.style.color = "red";
  }
}
