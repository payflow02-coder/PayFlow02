// ===== ТІЛ ДЕРЕКТЕРІ =====
let currentLang = "kk";

const TEXT = {
  kk: {
    title: "Чек жасау",
    payer: "Төлеуші",
    receiver: "Алушы",
    amount: "Сома (₸)",
    btn: "Чек жасау",
    alert: "Барлық жолды толтырыңыз",
    status: "Төлем расталды"
  },
  ru: {
    title: "Создать чек",
    payer: "Плательщик",
    receiver: "Получатель",
    amount: "Сумма (₸)",
    btn: "Создать чек",
    alert: "Заполните все поля",
    status: "Платеж подтвержден"
  },
  en: {
    title: "Create receipt",
    payer: "Payer",
    receiver: "Receiver",
    amount: "Amount (₸)",
    btn: "Create receipt",
    alert: "Please fill all fields",
    status: "Payment confirmed"
  }
};

// ===== ТІЛ АУЫСТЫРУ =====
function setLang(lang) {
  currentLang = lang;

  document.getElementById("title").innerText = TEXT[lang].title;
  document.getElementById("payer").placeholder = TEXT[lang].payer;
  document.getElementById("receiver").placeholder = TEXT[lang].receiver;
  document.getElementById("amount").placeholder = TEXT[lang].amount;
  document.getElementById("btn").innerText = TEXT[lang].btn;

  const statusEl = document.getElementById("status");
  if (statusEl) statusEl.innerText = TEXT[lang].status;
}

// ===== ЧЕК ЖАСАУ =====
function generateCheck() {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!payer || !receiver || !amount) {
    alert(TEXT[currentLang].alert);
    return;
  }

  // Check ID
  const checkId = "PF-" + Math.floor(100000 + Math.random() * 900000);

  // Hash (demo)
  const hash = btoa(payer + receiver + amount + checkId).substring(0, 16);

  // Экранға шығару
  document.getElementById("oPayer").innerText = payer;
  document.getElementById("oReceiver").innerText = receiver;
  document.getElementById("oAmount").innerText = amount;
  document.getElementById("checkId").innerText = checkId;
  document.getElementById("hash").innerText = hash;
  document.getElementById("status").innerText = TEXT[currentLang].status;

  // QR
  const qrText = "PayFlow чек | " + checkId + " | " + hash;
  document.getElementById("qr").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(qrText);

  // Чек көрсету
  document.getElementById("receipt").classList.remove("hidden");
}

// ===== PDF =====
function downloadPDF() {
  window.print();
}
