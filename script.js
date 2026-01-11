let lastCheckId = null;

// DOM толық жүктелгенде ғана іске қосылады
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("generateBtn").addEventListener("click", generateCheck);
  document.getElementById("verifyBtn").addEventListener("click", verifyCheck);
  document.getElementById("pdfBtn").addEventListener("click", downloadPDF);

});

function generateCheck() {
  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  lastCheckId = id;

  document.getElementById("checkId").innerText = id;

  const now = new Date();
  document.getElementById("date").innerText =
    now.toLocaleDateString("kk-KZ") + " " +
    now.toLocaleTimeString("kk-KZ");

  document.getElementById("status").classList.remove("hidden");

  const qrData =
    window.location.origin +
    window.location.pathname +
    "?check=" + id;

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(qrData);

  document.getElementById("qrImage").src = qrUrl;
  document.getElementById("qrBox").classList.remove("hidden");
}

function verifyCheck() {
  const input = document.getElementById("verifyInput").value.trim();
  const result = document.getElementById("verifyResult");

  if (!input) {
    result.innerText = "⚠️ Чек ID енгізіңіз";
    result.style.color = "orange";
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

function downloadPDF() {
  window.print();
}
