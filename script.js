script.js      function generateCheck() {
  vibrate();

  const payer = payerVal();
  const receiver = receiverVal();
  const amount = amountVal();

  if (!payer || !receiver || !amount) {
    alert("Барлық жолды толтырыңыз!");
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const hash = "H" + Date.now();

  const data = { payer, receiver, amount, id, hash };
  localStorage.setItem(id, JSON.stringify(data));

  out("outPayer", payer);
  out("outReceiver", receiver);
  out("outAmount", amount);
  out("checkId", id);
  out("hash", hash);

  document.getElementById("qr").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(id + "|" + hash)}">`;

  document.getElementById("checkBox").classList.remove("hidden");
}

function verifyCheck() {
  const id = document.getElementById("vid").value.trim();
  const hash = document.getElementById("vhash").value.trim();
  const box = document.getElementById("verifyResult");

  const data = localStorage.getItem(id);
  if (!data) {
    box.innerHTML = "❌ Чек табылмады";
    return;
  }

  const check = JSON.parse(data);
  box.innerHTML =
    check.hash === hash
      ? "✅ Чек расталды"
      : "❌ Hash сәйкес емес";
}

function downloadPDF() {
  window.print();
}

/* helpers */
function out(id, v){ document.getElementById(id).innerText = v; }
function payerVal(){ return document.getElementById("payer").value.trim(); }
function receiverVal(){ return document.getElementById("receiver").value.trim(); }
function amountVal(){ return document.getElementById("amount").value.trim(); }
function vibrate(){ if (navigator.vibrate) navigator.vibrate(30); }
const LANG_DATA = {
  kk: {
    heroTitle: "PayFlow",
    heroText: "Төлем жасалғанын дәлелдейтін цифрлық чек сервисі.",
    makeTitle: "Цифрлық чек жасау",
    btnCreate: "Чек жасау",
    btnPdf: "PDF жүктеу",
    verifyTitle: "Чекті тексеру",
    btnVerify: "Тексеру"
  },
  ru: {
    heroTitle: "PayFlow",
    heroText: "Цифровой чек для подтверждения платежа.",
    makeTitle: "Создание цифрового чека",
    btnCreate: "Создать чек",
    btnPdf: "Скачать PDF",
    verifyTitle: "Проверка чека",
    btnVerify: "Проверить"
  },
  en: {
    heroTitle: "PayFlow",
    heroText: "Digital receipt to confirm payment.",
    makeTitle: "Create digital receipt",
    btnCreate: "Create receipt",
    btnPdf: "Download PDF",
    verifyTitle: "Verify receipt",
    btnVerify: "Verify"
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (LANG_DATA[lang] && LANG_DATA[lang][key]) {
      el.innerText = LANG_DATA[lang][key];
    }
  });
}
