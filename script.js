function generateCheck() {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!payer || !receiver || !amount) {
    alert("Барлық жолды толтырыңыз");
    return;
  }

  const checkId = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toISOString();

  const rawData = payer + receiver + amount + checkId + date;
  const hash = simpleHash(rawData);

  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount + " ₸";
  document.getElementById("outId").innerText = checkId;
  document.getElementById("outHash").innerText = hash;

  // QR (чек + төлемге өту demo)
  const qrData = `PayFlow чек
ID: ${checkId}
Сома: ${amount} ₸
Hash: ${hash}`;

  document.getElementById("qrImg").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(qrData);
}

// Қарапайым hash (авторлық логика)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return "H" + Math.abs(hash);
}

// PDF
function downloadPDF() {
  window.print();
}
