/* ===== ТЕК САН ЕНГІЗУ ===== */
function onlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

/* ===== ТӨЛЕМ ЛОГОТИПТЕР ===== */
const logos = {
  Kaspi: "kaspi.png",
  Freedom: "freedom.png",
  Qiwi: "qiwi.png",
  Halyk: "halyk.png"
};

/* ===== ТӨЛЕМ ТАҢДАЛҒАНДА ЛОГО ===== */
function updateLogo() {
  const payment = document.getElementById("payment").value;
  const logo = document.getElementById("payLogo");

  if (logos[payment]) {
    logo.src = logos[payment];
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }
}

/* ===== ЧЕК ЖАСАУ ===== */
function generate() {
  const seller = document.getElementById("seller").value.trim();
  const buyer = document.getElementById("buyer").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const item = document.getElementById("item").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const payment = document.getElementById("payment").value;

  if (!seller || !buyer || !phone || !item || !amount || !payment) {
    alert("Барлық өрісті толық толтырыңыз!");
    return;
  }

  if (phone.length < 10) {
    alert("Телефон нөмірі дұрыс емес!");
    return;
  }

  /* ===== ЧЕКТІ ЭКРАНҒА ШЫҒАРУ ===== */
  document.getElementById("receipt").style.display = "block";

  document.getElementById("rSeller").innerText = seller;
  document.getElementById("rBuyer").innerText = buyer;
  document.getElementById("rPhone").innerText = phone;
  document.getElementById("rItem").innerText = item;
  document.getElementById("rAmount").innerText = amount;
  document.getElementById("rPayment").innerText = payment;

  const rLogo = document.getElementById("receiptLogo");
  rLogo.src = logos[payment];
  rLogo.style.display = "block";

  /* ===== PDF БАТЫРМАСЫН КӨРСЕТУ ===== */
  const pdfBtn = document.getElementById("pdfBtn");
  if (pdfBtn) {
    pdfBtn.style.display = "block";
  }

  /* ===== QR-КОД ===== */
  const qrBox = document.getElementById("qrcode");
  qrBox.innerHTML = "";

  new QRCode(qrBox, {
    text: `PayFlow чек | Сатушы: ${seller} | Сатып алушы: ${buyer} | ${amount}₸ | ${payment}`,
    width: 128,
    height: 128
  });
}

/* ===== PDF-КЕ ЖҮКТЕУ ===== */
function downloadPDF() {
  const seller = document.getElementById("seller").value.trim();
  const buyer = document.getElementById("buyer").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const item = document.getElementById("item").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const payment = document.getElementById("payment").value;

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(16);
  pdf.text("PayFlow Digital Check", 20, 20);

  pdf.setFontSize(12);
  pdf.text(`Сатушы: ${seller}`, 20, 40);
  pdf.text(`Сатып алушы: ${buyer}`, 20, 50);
  pdf.text(`Телефон: ${phone}`, 20, 60);
  pdf.text(`Тауар: ${item}`, 20, 70);
  pdf.text(`Сома: ${amount} ₸`, 20, 80);
  pdf.text(`Төлем түрі: ${payment}`, 20, 90);

  if (logos[payment]) {
    pdf.addImage(logos[payment], "PNG", 140, 30, 40, 40);
  }

  pdf.save("payflow-check.pdf");
}
