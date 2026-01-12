/* =========================
   LANGUAGE SYSTEM
========================= */

const translations = {
  kk: {
    heroTitle: "PayFlow",
    heroText: "Төлем жасалғанын дәлелдейтін цифрлық чек сервисі. ID, Hash және QR арқылы қорғалған.",
    heroBtn: "Чек жасау",

    featuresTitle: "Неге PayFlow?",
    f1: "✔ Өзгертілмейтін чек",
    f2: "✔ Бірегей ID + Hash",
    f3: "✔ QR арқылы тексеру",
    f4: "✔ Қағаз чек қажет емес",

    makeTitle: "Цифрлық чек жасау",
    payer: "Төлеуші",
    receiver: "Алушы",
    amount: "Сома (₸)",

    btnCreate: "Чек жасау",
    btnPdf: "PDF жүктеу",

    status: "✅ Төлем расталды",
    secure: "Бұл чек PayFlow жүйесінде тіркелген және өзгертілмейді",

    verifyTitle: "Чекті тексеру",
    btnVerify: "Тексеру",

    footerAuthor: "© 2026 PayFlow — Авторлық жоба",
    footerDemo: "Бұл сайт — демонстрациялық прототип. Нақты төлем қабылдамайды.",

    alertFill: "Барлық жолды толтырыңыз"
  },

  ru: {
    heroTitle: "PayFlow",
    heroText: "Цифровой чек, подтверждающий оплату. Защищён ID, Hash и QR.",
    heroBtn: "Создать чек",

    featuresTitle: "Почему PayFlow?",
    f1: "✔ Нельзя подделать",
    f2: "✔ Уникальный ID + Hash",
    f3: "✔ Проверка через QR",
    f4: "✔ Без бумажных чеков",

    makeTitle: "Создание цифрового чека",
    payer: "Плательщик",
    receiver: "Получатель",
    amount: "Сумма (₸)",

    btnCreate: "Создать чек",
    btnPdf: "Скачать PDF",

    status: "✅ Платёж подтверждён",
    secure: "Чек зарегистрирован в системе PayFlow",

    verifyTitle: "Проверка чека",
    btnVerify: "Проверить",

    footerAuthor: "© 2026 PayFlow — Авторский проект",
    footerDemo: "Это демонстрационный прототип. Реальные платежи не принимаются.",

    alertFill: "Заполните все поля"
  },

  en: {
    heroTitle: "PayFlow",
    heroText: "Digital receipt service proving payment. Protected by ID, Hash and QR.",
    heroBtn: "Create receipt",

    featuresTitle: "Why PayFlow?",
    f1: "✔ Tamper-proof receipt",
    f2: "✔ Unique ID + Hash",
    f3: "✔ QR verification",
    f4: "✔ No paper receipts",

    makeTitle: "Create digital receipt",
    payer: "Payer",
    receiver: "Receiver",
    amount: "Amount (₸)",

    btnCreate: "Create receipt",
    btnPdf: "Download PDF",

    status: "✅ Payment confirmed",
    secure: "This receipt is registered in PayFlow system",

    verifyTitle: "Verify receipt",
    btnVerify: "Verify",

    footerAuthor: "© 2026 PayFlow — Original project",
    footerDemo: "This is a demo prototype. No real payments accepted.",

    alertFill: "Please fill in all fields"
  }
};

let currentLang = "kk";

function setLang(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

// default language
setLang("kk");

/* =========================
   CHECK LOGIC
========================= */

function generateCheck() {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!payer || !receiver || !amount) {
    alert(translations[currentLang].alertFill);
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const hash = btoa(payer + receiver + amount + Date.now());

  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("checkId").innerText = id;
  document.getElementById("hash").innerText = hash;

  document.getElementById("checkBox").classList.remove("hidden");

  // QR (Google Chart API)
  const qrData = `${id}|${hash}`;
  document.getElementById("qr").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}">`;
}

function downloadPDF() {
  window.print();
}

function verifyCheck() {
  const vid = document.getElementById("vid").value;
  const vhash = document.getElementById("vhash").value;
  const result = document.getElementById("verifyResult");

  if (!vid || !vhash) {
    result.innerText = "ID және Hash енгізіңіз";
    return;
  }

  result.innerHTML = "✅ Чек деректері жарамды (demo)";
}
