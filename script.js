let lang = "kk";

const T = {
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
    alert: "Fill all fields",
    status: "Payment confirmed"
  }
};

function setLang(l) {
  lang = l;
  title.innerText = T[l].title;
  payer.placeholder = T[l].payer;
  receiver.placeholder = T[l].receiver;
  amount.placeholder = T[l].amount;
  btn.innerText = T[l].btn;
  status.innerText = T[l].status;
}

function generateCheck() {
  if (!payer.value || !receiver.value || !amount.value) {
    alert(T[lang].alert);
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const hash = btoa(payer.value + receiver.value + amount.value + id).slice(0, 16);

  oPayer.innerText = payer.value;
  oReceiver.innerText = receiver.value;
  oAmount.innerText = amount.value;
  checkId.innerText = id;
  document.getElementById("hash").innerText = hash;

  qr.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent("PayFlow чек " + id);

  receipt.classList.remove("hidden");
}

function downloadPDF() {
  window.print();
}
