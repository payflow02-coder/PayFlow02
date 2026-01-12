// ===== CHECK LOGIC =====
let lastCheck = null;

function generateCheck() {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  // ❌ VALIDATION
  if (!payer || !receiver || !amount || Number(amount) <= 0) {
    alert("Барлық жолды дұрыс толтырыңыз");
    document.getElementById("checkBox").classList.add("hidden");
    lastCheck = null;
    return;
  }

  // ✅ DATA
  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toISOString();

  const raw = payer + receiver + amount + id + date;
  const hash = btoa(raw).slice(0, 32);

  // OUTPUT
  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("checkId").innerText = id;
  document.getElementById("hash").innerText = hash;

  // QR (demo)
  const qr = document.getElementById("qr");
  qr.innerHTML = "";
  const img = document.createElement("img");
  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(id + "|" + hash);
  qr.appendChild(img);

  document.getElementById("checkBox").classList.remove("hidden");

  // SAVE FOR VERIFY + PDF
  lastCheck = { id, hash };
}

// ===== VERIFY =====
function verifyCheck() {
  const vid = document.getElementById("vid").value.trim();
  const vhash = document.getElementById("vhash").value.trim();
  const out = document.getElementById("verifyResult");

  if (!vid || !vhash) {
    out.innerHTML = "❌ ID және Hash енгізіңіз";
    return;
  }

  if (lastCheck && vid === lastCheck.id && vhash === lastCheck.hash) {
    out.innerHTML = "✅ Чек расталды";
  } else {
    out.innerHTML = "❌ Чек табылмады немесе жалған";
  }
}

// ===== PDF =====
function downloadPDF() {
  if (!lastCheck) {
    alert("Алдымен дұрыс чек жасаңыз");
    return;
  }
  window.print();
}
