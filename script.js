const text = {
  kk: {
    slogan: "Чек жоқ = сенім жоқ",
    payer: "Төлеуші",
    receiver: "Алушы",
    amount: "Сома (₸)",
    create: "Чек жасау",
    pdf: "PDF жүктеу",
    status: "✔ Төлем расталды",
    author: "© 2026 PayFlow — Авторлық жоба<br>Чек жоқ = сенім жоқ",
    alert: "Барлық жолды толтырыңыз"
  },
  ru: {
    slogan: "Нет чека — нет доверия",
    payer: "Плательщик",
    receiver: "Получатель",
    amount: "Сумма (₸)",
    create: "Создать чек",
    pdf: "Скачать PDF",
    status: "✔ Платеж подтвержден",
    author: "© 2026 PayFlow — Авторский проект",
    alert: "Заполните все поля"
  },
  en: {
    slogan: "No receipt — no trust",
    payer: "Payer",
    receiver: "Receiver",
    amount: "Amount (₸)",
    create: "Generate receipt",
    pdf: "Download PDF",
    status: "✔ Payment confirmed",
    author: "© 2026 PayFlow — Original project",
    alert: "Please fill all fields"
  }
};

let currentLang = "kk";

function setLang(lang) {
  currentLang = lang;
  document.getElementById("slogan").innerHTML = text[lang].slogan;
  payer.placeholder = text[lang].payer;
  receiver.placeholder = text[lang].receiver;
  amount.placeholder = text[lang].amount;
  btnCreate.innerText = text[lang].create;
  btnPdf.innerText = text[lang].pdf;
  status.innerText = text[lang].status;
  author.innerHTML = text[lang].author;
}

function generateCheck() {
  if (!payer.value || !receiver.value || !amount.value) {
    alert(text[currentLang].alert);
    return;
  }

  const id = "PF-" + Math.floor(Math.random() * 900000);
  const hash = "H" + Date.now();

  rPayer.innerText = payer.value;
  rReceiver.innerText = receiver.value;
  rAmount.innerText = amount.value;
  rId.innerText = id;
  rHash.innerText = hash;

  localStorage.setItem(id, JSON.stringify({ id, hash }));

  qr.innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${id}">`;

  receipt.style.display = "block";
}

function downloadPDF() {
  window.print();
}
