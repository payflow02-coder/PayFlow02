function generateCheck() {
  const payerInput = document.getElementById("payer").value.trim();
  const receiverInput = document.getElementById("receiver").value.trim();
  const amountInput = document.getElementById("amount").value.trim();

  // Егер аты бос болса — ( ) көрсетіледі
  const payer = payerInput === "" ? "( )" : payerInput;
  const receiver = receiverInput === "" ? "( )" : receiverInput;
  const amount = amountInput === "" ? "0 ₸" : amountInput + " ₸";

  const checkId = "PF-" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("outId").innerText = checkId;
}
