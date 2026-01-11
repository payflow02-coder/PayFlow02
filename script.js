let lastCheckId = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generateBtn").addEventListener("click", generateCheck);
  document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
  document.getElementById("verifyBtn").addEventListener("click", verifyCheck);
});

function generateCheck() {
  const random = Math.floor(100000 + Math.random() * 900000);
  lastCheckId = "PF-" + random;

  document.getElementById("checkId").innerText = lastCheckId;
  document.getElementById("date").innerText =
    new Date().toLocaleString("kk-KZ");

  document.getElementById("verifyResult").innerText = "";
}

function downloadPDF() {
  if (!lastCheckId) {
    alert("Алдымен чек жасаңыз!");
    return;
  }
  window.print();
}

function verifyCheck() {
  const input = document.getElementById("verifyInput").value.trim();
  const result = document.getElementById("verifyResult");

  if (!input) {
    result.innerText = "Чек ID енгізіңіз";
    result.style.color = "red";
    return;
  }

  if (input === lastCheckId) {
    result.innerText = "✅ Чек расталды";
    result.style.color = "green";
  } else {
    result.innerText = "❌ Чек табылмады";
    result.style.color = "red";
  }
}
