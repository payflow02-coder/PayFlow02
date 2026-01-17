// ===============================
// GLOBAL STATE
// ===============================
let lastCheck = null;

// ===============================
// CHECK GENERATION
// ===============================
window.generateCheck = function () {
  const payer = getValue("payer");
  const receiver = getValue("receiver");
  const amount = getValue("amount");
  const item = getValue("item");

  if (!payer || !receiver || !amount || Number(amount) <= 0) {
    alert("Барлық міндетті өрістерді толтырыңыз!");
    hideCheck();
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString();

  // DEMO HASH
  const raw = `${payer}|${receiver}|${amount}|${item}|${id}|${date}`;
  const hash = btoa(unescape(encodeURIComponent(raw))).slice(0, 32);

  // OUTPUT
  setText("outPayer", payer);
  setText("outReceiver", receiver);
  setText("outAmount", amount);
  setText("outItem", item);
  setText("checkId", id);
  setText("hash", hash);

  toggleCheck(true);
  generateQR(id, hash);

  lastCheck = { id, hash };
};

// ===============================
// CHECK UI HELPERS
// ===============================
function hideCheck() {
  toggleCheck(false);
  clearQR();
  lastCheck = null;
}

function toggleCheck(show) {
  const box = document.getElementById("checkBox");
  if (box) box.classList.toggle("hidden", !show);
}

function generateQR(id, hash) {
  const qrBox = document.getElementById("qr");
  if (!qrBox) return;

  qrBox.innerHTML = "";
  const img = document.createElement("img");
  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" +
    encodeURIComponent(id + "|" + hash);
  qrBox.appendChild(img);
}

function clearQR() {
  const qrBox = document.getElementById("qr");
  if (qrBox) qrBox.innerHTML = "";
}

// ===============================
// VERIFY CHECK
// ===============================
window.verifyCheck = function () {
  const vid = getValue("vid");
  const vhash = getValue("vhash");
  const out = document.getElementById("verifyResult");

  if (!out) return;

  if (!vid || !vhash) {
    out.innerText = "❌ ID және Hash енгізіңіз";
    return;
  }

  if (lastCheck && vid === lastCheck.id && vhash === lastCheck.hash) {
    out.innerText = "✅ Чек расталды";
  } else {
    out.innerText = "❌ Чек табылмады немесе қате";
  }
};

// ===============================
// PDF (DEMO)
// ===============================
window.downloadPDF = function () {
  if (!lastCheck) {
    alert("Алдымен чек жасаңыз");
    return;
  }
  window.print();
};

// ===============================
// LANGUAGE SWITCH
// ===============================
const translations = {
  kk: {
    heroText:
      "Төлем жасалғанын дәлелдейтін цифрлық чек сервисі. ID, Hash және QR арқылы қорғалған.",
    makeCheck: "Чек жасау",
    why: "Неге PayFlow?",
    create: "Цифрлық чек жасау",
    payer: "Төлеуші",
    receiver: "Алушы",
    amount: "Сома",
    item: "Қызмет / тауар",
    pdf: "PDF жүктеу",
    success: "✅ Төлем расталды",
    secure: "Бұл чек PayFlow жүйесінде тіркелген және өзгертілмейді",
    verify: "Чекті тексеру",
    check: "Тексеру",
    demo:
      "Бұл сайт — демонстрациялық прототип. Нақты төлем қабылдамайды."
  },
  ru: {
    heroText:
      "Цифровой сервис подтверждения оплаты. Защищено ID, Hash и QR.",
    makeCheck: "Создать чек",
    why: "Почему PayFlow?",
    create: "Создание цифрового чека",
    payer: "Плательщик",
    receiver: "Получатель",
    amount: "Сумма",
    item: "Услуга / товар",
    pdf: "Скачать PDF",
    success: "✅ Платёж подтверждён",
    secure: "Этот чек зарегистрирован в системе PayFlow",
    verify: "Проверка чека",
    check: "Проверить",
    demo:
      "Это демонстрационный прототип. Реальные платежи не принимаются."
  },
  en: {
    heroText:
      "Digital payment receipt service secured by ID, Hash and QR.",
    makeCheck: "Generate receipt",
    why: "Why PayFlow?",
    create: "Create digital receipt",
    payer: "Payer",
    receiver: "Receiver",
    amount: "Amount",
    item: "Item / Service",
    pdf: "Download PDF",
    success: "✅ Payment confirmed",
    secure: "This receipt is registered and cannot be changed",
    verify: "Verify receipt",
    check: "Verify",
    demo:
      "This is a demo prototype. No real payments are processed."
  }
};

window.setLang = function (lang) {
  applyText("[data-i18n]", "innerText", translations[lang]);
  applyText("[data-i18n-ph]", "placeholder", translations[lang]);
  localStorage.setItem("lang", lang);
};

// ===============================
// HELPERS
// ===============================
function getValue(id) {
  return document.getElementById(id)?.value.trim() || "";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

function applyText(selector, prop, dict) {
  document.querySelectorAll(selector).forEach(el => {
    const key = el.getAttribute(prop === "placeholder" ? "data-i18n-ph" : "data-i18n");
    if (dict && dict[key]) el[prop] = dict[key];
  });
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  window.setLang(localStorage.getItem("lang") || "kk");
});
