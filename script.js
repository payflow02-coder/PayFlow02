let lastCheckId = null;

// Чек жасау
function generateCheck() {
  const randomId = Math.floor(100000 + Math.random() * 900000);
  lastCheckId = "PF-" + randomId;

  document.getElementById("checkId").innerText = lastCheckId;
  document.getElementById("date").innerText =
    new Date().toLocaleString("kk-KZ");

  document.getElementById("verifyResult").innerText = "";
}

// PDF жүктеу
function downloadPDF() {
  if (!lastCheckId) {
    alert("Алдымен чек жасаңыз!");
    return;
  }
  window.print();
}

// Чек тексеру
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
