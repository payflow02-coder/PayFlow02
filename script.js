function generateCheck() {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!payer || !receiver || !amount) {
    alert("Барлық жолды толтырыңыз!");
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const hash = "H" + Date.now();

  const checkData = {
    payer,
    receiver,
    amount,
    id,
    hash,
    status: "Төлем расталды",
    date: new Date().toISOString()
  };

  // 🔐 "Сервер" (localStorage)
  localStorage.setItem(id, JSON.stringify(checkData));

  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("checkId").innerText = id;
  document.getElementById("hash").innerText = hash;

  // 🔗 QR тексеру бетіне апарады
  const verifyURL =
    location.origin +
    location.pathname.replace("index.html", "") +
    "verify.html?id=" + id + "&hash=" + hash;

  document.getElementById("qr").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(verifyURL)}">`;

  document.getElementById("checkBox").classList.remove("hidden");
}

function downloadPDF() {
  window.print();
}
