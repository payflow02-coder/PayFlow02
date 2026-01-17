// ONLY NUMBER
["phone", "amount"].forEach(id => {
  document.getElementById(id).addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
});

// PAYMENT LOGO
function updateLogo() {
  const p = payment.value;
  const logo = document.getElementById("paymentLogo");

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (logos[p]) {
    logo.src = logos[p];
    logo.style.display = "block";
  } else logo.style.display = "none";
}

// CHECK
function generateCheck() {
  if (![name, phone, product, amount, payment].every(i => i.value)) {
    alert("❗ Барлық жолды толтыр");
    return;
  }
  alert("✅ Чек дайын! PDF жүктеуге болады");
}

// PDF + QR
function downloadPDF() {
  if (![name, phone, product, amount, payment].every(i => i.value)) {
    alert("❗ Барлық жолды толтыр");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const checkId = "PF-" + Date.now();
  const verifyURL = `${location.origin}${location.pathname.replace("index.html","")}verify.html?id=${checkId}`;

  doc.setFontSize(18);
  doc.text("PayFlow Digital Check", 20, 20);
  doc.line(20, 25, 190, 25);

  doc.setFontSize(12);
  doc.text(`Check ID: ${checkId}`, 20, 40);
  doc.text(`Buyer: ${name.value}`, 20, 55);
  doc.text(`Phone: ${phone.value}`, 20, 65);
  doc.text(`Product: ${product.value}`, 20, 75);
  doc.text(`Amount: ${amount.value} ₸`, 20, 85);
  doc.text(`Payment: ${payment.value}`, 20, 95);

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (logos[payment.value]) {
    doc.addImage(logos[payment.value], "PNG", 140, 50, 40, 40);
  }

  QRCode.toDataURL(verifyURL, function (err, url) {
    if (!err) {
      doc.addImage(url, "PNG", 20, 110, 50, 50);
      doc.text("Scan to verify", 20, 165);
      doc.save(`PayFlow_${checkId}.pdf`);
    }
  });
}
