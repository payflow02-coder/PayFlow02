// DOM дайын болғанда іске қосамыз
document.addEventListener("DOMContentLoaded", () => {

  // PAYMENT LOGO DISPLAY
  const logos = {
    Freedom: "assets/freedom.png",
    Kaspi: "assets/kaspi.png",
    Qiwi: "assets/qiwi.png",
    Halyk: "assets/halyk.png"
  };

  const paymentSelect = document.getElementById("paymentMethod");
  const logoDiv = document.getElementById("paymentLogo");

  paymentSelect.addEventListener("change", function() {
    const val = this.value;
    logoDiv.innerHTML = "";
    if (logos[val]) {
      const img = document.createElement("img");
      img.src = logos[val];
      img.style.width = "80px";
      logoDiv.appendChild(img);
    }
  });

  // CHECK LOGIC
  window.generateCheck = function () {
    const payer = document.getElementById("payer").value.trim();
    const receiver = document.getElementById("receiver").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const payment = paymentSelect.value;
    const chat = document.getElementById("chat").value.trim();

    if (!payer || !receiver || !amount || !payment || Number(amount)<=0) {
      alert("Барлық жолды дұрыс толтырыңыз");
      hideCheck();
      return;
    }

    const id = "PF-" + Math.floor(100000 + Math.random()*900000);
    const date = new Date().toLocaleString();
    const raw = `${payer}|${receiver}|${amount}|${payment}|${chat}|${id}|${date}`;

    // UTF-8 қолдауымен hash жасау
    const hash = btoa(unescape(encodeURIComponent(raw))).slice(0,32);

    document.getElementById("outPayer").innerText = payer;
    document.getElementById("outReceiver").innerText = receiver;
    document.getElementById("outAmount").innerText = amount;
    document.getElementById("checkId").innerText = id;
    document.getElementById("hash").innerText = hash;
    document.getElementById("outPayment").innerText = payment;
    document.getElementById("outChat").innerText = chat;

    document.getElementById("checkBox").classList.remove("hidden");

    // QR
    const qrBox = document.getElementById("qr");
    qrBox.innerHTML = "";
    const img = document.createElement("img");
    img.src = "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" + encodeURIComponent(id + "|" + hash);
    qrBox.appendChild(img);

    lastCheck = { id, hash };
  };

  function hideCheck() {
    document.getElementById("checkBox").classList.add("hidden");
    document.getElementById("qr").innerHTML = "";
    lastCheck = null;
  }

  // PDF (қарапайым print)
  window.downloadPDF = function () {
    if (!lastCheck) { alert("Алдымен дұрыс чек жасаңыз"); return; }
    window.print();
  };

});
