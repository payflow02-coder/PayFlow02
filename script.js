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
    logo.style.width = "120px";
    logo.style.marginTop = "10px";
  } else {
    logo.style.display = "none";
  }
}

function generatePDF() {
  const seller = document.getElementById("seller").value;
  const sellerBin = document.getElementById("sellerBin").value;
  const buyer = document.getElementById("buyer").value;
  const phone = document.getElementById("phone").value;
  const item = document.getElementById("item").value;
  const amount = document.getElementById("amount").value;
  const payment = document.getElementById("payment").value;

  if (!seller || !sellerBin || !buyer || !phone || !item || !amount || !payment) {
    alert("Барлық жолды толтыр");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("PayFlow Digital Check", 20, 20);

  doc.setFontSize(12);
  doc.text("Сатушы: " + seller, 20, 40);
  doc.text("ИИН / БИН: " + sellerBin, 20, 50);
  doc.text("Сатып алушы: " + buyer, 20, 60);
  doc.text("Телефон: " + phone, 20, 70);
  doc.text("Тауар: " + item, 20, 80);
  doc.text("Сома: " + amount + " ₸", 20, 90);
  doc.text("Төлем түрі: " + payment, 20, 100);

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (logos[payment]) {
    doc.addImage(logos[payment], "PNG", 140, 40, 40, 40);
  }

  doc.save("PayFlow_Check.pdf");
}
