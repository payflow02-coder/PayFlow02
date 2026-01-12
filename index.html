function generateCheck() {
  const payerInput = document.getElementById("payer").value.trim();
  const receiverInput = document.getElementById("receiver").value.trim();
  const amountInput = document.getElementById("amount").value.trim();

  // 👉 БОС ҚАЛСА — ( )
  const payer = payerInput === "" ? "( )" : payerInput;
  const receiver = receiverInput === "" ? "( )" : receiverInput;
  const amount = amountInput === "" ? "15000 ₸" : amountInput + " ₸";

  const checkId = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toISOString();

  // HASH
  const rawData = payer + receiver + amount + checkId + date;
  const hash = simpleHash(rawData);

  // ШЫҒАРУ
  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("outId").innerText = checkId;
  document.getElementById("outHash").innerText = hash;

  // QR
  const qrData = `PayFlow чек
Төлеуші: ${payer}
Алушы: ${receiver}
Сома: ${amount}
ID: ${checkId}
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
