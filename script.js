// ONLY NUMBER INPUT
document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

document.getElementById("amount").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

// PAYMENT LOGO
function updateLogo() {
  const payment = document.getElementById("payment").value;
  const logo = document.getElementById("paymentLogo");

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (logos[payment]) {
    logo.src = logos[payment];
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }
}

// CHECK VALIDATION
function generateCheck() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const product = document.getElementById("product").value;
  const amount = document.getElementById("amount").value;
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !product || !amount || !payment) {
    alert("❗ Барлық жолды толтыр");
    return;
  }

  alert("✅ Чек дайын! PDF жүктей аласың");
}

// PDF GENERATION
function downloadPDF() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const product = document.getElementById("product").value;
  const amount = document.getElementById("amount").value;
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !product || !amount || !payment) {
    alert("❗ Алдымен барлық жолды толтыр");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const id = "PF-" + Date.now();
  const date = new Date().toLocaleString();

  doc.setFontSize(18);
  doc.text("PayFlow Digital Check", 20, 20);
  doc.line(20, 25, 190, 25);

  doc.setFontSize(12);
  doc.text(`Check ID: ${id}`, 20, 40);
  doc.text(`Date: ${date}`, 20, 50);
  doc.text(`Buyer: ${name}`, 20, 65);
  doc.text(`Phone: ${phone}`, 20, 75);
  doc.text(`Product: ${product}`, 20, 85);
  doc.text(`Amount: ${amount} ₸`, 20, 95);
  doc.text(`Payment: ${payment}`, 20, 105);

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (logos[payment]) {
    doc.addImage(logos[payment], "PNG", 140, 60, 40, 40);
  }

  doc.setFontSize(10);
  doc.text("Demo check. Not a real payment document.", 20, 280);

  doc.save(`PayFlow_${id}.pdf`);
}
