let LANG = "kk";

const TEXT = {
  kk: {
    title: "Цифрлық чек жасау",
    desc: "Төлем жасалғанын дәлелдейтін цифрлық чек.<br>ID, Hash және QR арқылы қорғалған.",
    payer: "Төлеуші",
    receiver: "Алушы",
    amount: "Сома (₸)",
    create: "Чек жасау",
    pdf: "PDF жүктеу",
    status: "Төлем расталды",
    alert: "Барлық жолды толтырыңыз"
  },
  ru: {
    title: "Создание цифрового чека",
    desc: "Цифровой чек для подтверждения платежа.<br>Защищён ID, Hash и QR.",
    payer: "Плательщик",
    receiver: "Получатель",
    amount: "Сумма (₸)",
    create: "Создать чек",
    pdf: "Скачать PDF",
    status: "Платёж подтверждён",
    alert: "Заполните все поля"
  },
  en: {
    title: "Create digital receipt",
    desc: "Digital receipt to confirm payments.<br>Protected by ID, Hash and QR.",
    payer: "Payer",
    receiver: "Receiver",
    amount: "Amount (₸)",
    create: "Create receipt",
    pdf: "Download PDF",
    status: "Payment confirmed",
    alert: "Please fill all fields"
  }
};

function setLang(l) {
  LANG = l;
  t_title.innerText = TEXT[l].title;
  t_desc.innerHTML = TEXT[l].desc;
  payer.placeholder = TEXT[l].payer;
  receiver.placeholder = TEXT[l].receiver;
  amount.placeholder = TEXT[l].amount;
  t_btn_create.innerText = TEXT[l].create;
  t_btn_pdf.innerText = TEXT[l].pdf;
  t_status.innerText = TEXT[l].status;
}

function generateCheck() {
  if (!payer.value || !receiver.value || !amount.value) {
    alert(TEXT[LANG].alert);
    return;
  }

  outPayer.innerText = payer.value;
  outReceiver.innerText = receiver.value;
  outAmount.innerText = amount.value;

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  checkId.innerText = id;

  const raw = payer.value + receiver.value + amount.value + id;
  hash.innerText = btoa(raw).slice(0, 20);

  qr.innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}">`;

  checkBox.classList.remove("hidden");
}

function downloadPDF() {
  window.print();
}
