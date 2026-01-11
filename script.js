let lastCheckId = null;

function generateCheck() {
  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  lastCheckId = id;

  document.getElementById("checkId").innerText = id;

  const now = new Date();
  document.getElementById("date").innerText =
    now.toLocaleDateString("kk-KZ") + " " +
    now.toLocaleTimeString("kk-KZ");

  document.getElementById("status").classList.remove("hidden");
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
