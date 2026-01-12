// ===============================
// GLOBAL STATE
// ===============================
let lastCheck = null;

// ===============================
// CHECK GENERATION
// ===============================
function generateCheck() {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  // VALIDATION
  if (!payer || !receiver || !amount || Number(amount) <= 0) {
    alert("Барлық жолды дұрыс толтырыңыз");
    hideCheck();
    return;
  }

  // GENERATE DATA
  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString();

  const raw = `${payer}|${receiver}|${amount}|${id}|${date}`;
  const hash = btoa(unescape(encodeURIComponent(raw))).slice(0, 32);

  // OUTPUT
  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("checkId").innerText = id;
  document.getElementById("hash").innerText = hash;

  // SHOW CHECK
  document.getElementById("checkBox").classList.remove("hidden");

  // QR
  const qrBox = document.getElementById("qr");
  qrBox.innerHTML = "";
  const qrImg = document.createElement("img");
  qrImg.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" +
    encodeURIComponent(id + "|" + hash);
  qrBox.appendChild(qrImg);

  // SAVE STATE
  lastCheck = { id, hash };
}

// ===============================
// HIDE CHECK
// ===============================
function hideCheck() {
  document.getElementById("checkBox").classList.add("hidden");
  document.getElementById("qr").innerHTML = "";
  lastCheck = null;
}

// ===============================
// VERIFY
// ===============================
function verifyCheck() {
  const vid = document.getElementById("vid").value.trim();
  const vhash = document.getElementById("vhash").value.trim();
  const out = document.getElementById("verifyResult");

  if (!vid || !vhash) {
    out.innerText = "❌ ID және Hash енгізіңіз";
    return;
  }

  if (lastCheck && vid === lastCheck.id && vhash === lastCheck.hash) {
    out.innerText = "✅ Чек расталды";
  } else {
    out.innerText = "❌ Чек табылмады немесе қате";
  }
}

// ===============================
// PDF
// ===============================
function downloadPDF() {
  if (!lastCheck) {
    alert("Алдымен дұрыс чек жасаңыз");
    return;
  }
  window.print();
}
