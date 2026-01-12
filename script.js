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
  document.getElementById("t_title").innerText = TEXT[l].title;
  document.getElementById("t_desc").innerHTML = TEXT[l].desc;
  document.getElementById("payer").placeholder = TEXT[l].payer;
  document.getElementById("receiver").placeholder = TEXT[l].receiver;
  document.getElementById("amount").placeholder = TEXT[l].amount;
  document.getElementById("t_btn_create").innerText = TEXT[l].create;
  document.getElementById("t_btn_pdf").innerText = TEXT[l].pdf;
  document.getElementById("t_status").innerText = TEXT[l].status;
}

// UTF-8 SAFE HASH
function makeHash(str) {
  return crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str)
  ).then(buf =>
    Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 24)
  );
}

async function generateCheck() {
  const p = payer.value.trim();
  const r = receiver.value.trim();
  const a = amount.value.trim();

  if (!p || !r || !a) {
    alert(TEXT[LANG].alert);
    return;
  }

  outPayer.innerText = p;
  outReceiver.innerText = r;
  outAmount.innerText = a;

  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  checkId.innerText = id;

  const raw = `${p}|${r}|${a}|${id}`;
  hash.innerText = await makeHash(raw);

  qr.innerHTML = `
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(id)}">
  `;

  checkBox.classList.remove("hidden");
}

function downloadPDF() {
  window.print();
}
