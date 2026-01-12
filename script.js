let lang = "kk";

const texts = {
  kk: {
    title: "Чек жасау",
    payer: "Төлеуші",
    receiver: "Алушы",
    amount: "Сома (₸)"
  },
  ru: {
    title: "Создать чек",
    payer: "Плательщик",
    receiver: "Получатель",
    amount: "Сумма (₸)"
  },
  en: {
    title: "Create receipt",
    payer: "Payer",
    receiver: "Receiver",
    amount: "Amount (₸)"
  }
};

function setLang(l) {
  lang = l;
  document.getElementById("title").innerText = texts[l].title;
  payer.placeholder = texts[l].payer;
  receiver.placeholder = texts[l].receiver;
  amount.placeholder = texts[l].amount;
}

function generateCheck() {
  if (!payer.value || !receiver.value || !amount.value) {
    alert("Барлық жолды толтырыңыз");
    return;
  }

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const data = payer.value + receiver.value + amount.value + id;
  const hash = btoa(data).substring(0, 20);

  outPayer.innerText = payer.value;
  outReceiver.innerText = receiver.value;
  outAmount.innerText = amount.value;
  checkId.innerText = id;
  document.getElementById("hash").innerText = hash;

  const link = location.origin + location.pathname.replace("index.html","") +
    "verify.html?id=" + id + "&hash=" + hash;

  qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(link);

  localStorage.setItem(id, hash);

  document.getElementById("check").classList.remove("hidden");
}

function downloadPDF() {
  window.print();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
