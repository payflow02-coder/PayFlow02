// ===============================
// GLOBAL STATE
// ===============================
let lastCheck = null;

// ===============================
// CHECK LOGIC
// ===============================
window.generateCheck = function () {
  const payer = document.getElementById("payer").value.trim();
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!payer || !receiver || !amount || Number(amount) <= 0) {
    alert("Барлық жолды дұрыс толтырыңыз");
    hideCheck();
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString();

  const raw = `${payer}|${receiver}|${amount}|${id}|${date}`;
  const hash = btoa(unescape(encodeURIComponent(raw))).slice(0, 32);

  document.getElementById("outPayer").innerText = payer;
  document.getElementById("outReceiver").innerText = receiver;
  document.getElementById("outAmount").innerText = amount;
  document.getElementById("checkId").innerText = id;
  document.getElementById("hash").innerText = hash;

  document.getElementById("checkBox").classList.remove("hidden");

  const qrBox = document.getElementById("qr");
  qrBox.innerHTML = "";
  const img = document.createElement("img");
  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=" +
    encodeURIComponent(id + "|" + hash);
  qrBox.appendChild(img);

  lastCheck = { id, hash };
};

function hideCheck() {
  document.getElementById("checkBox").classList.add("hidden");
  document.getElementById("qr").innerHTML = "";
  lastCheck = null;
}

// ===============================
// VERIFY
// ===============================
window.verifyCheck = function () {
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
};

// ===============================
// PDF
// ===============================
window.downloadPDF = function () {
  if (!lastCheck) {
    alert("Алдымен дұрыс чек жасаңыз");
    return;
  }
  window.print(); // демо ретінде print функциясын қолданамыз
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

  localStorage.setItem("lang", lang);
};

// DEFAULT LANGUAGE
document.addEventListener("DOMContentLoaded", () => {
  setLang(localStorage.getItem("lang") || "kk");
});
