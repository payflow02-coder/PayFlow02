function updateLogo() {
  const payment = document.getElementById("payment").value;
  const logo = document.getElementById("paymentLogo");

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (!payment) {
    logo.style.display = "none";
    logo.src = "";
    return;
  }

  logo.src = logos[payment];
  logo.style.display = "block";
}

// ЧЕК (экран логикасы)
function generateCheck() {
  alert("Чек дайын болды");
}

// PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const seller = document.getElementById("seller").value;
  const iin = document.getElementById("iin").value;
  const buyer = document.getElementById("buyer").value;
  const phone = document.getElementById("phone").value;
  const product = document.getElementById("product").value;
  const amount = document.getElementById("amount").value;
  const payment = document.getElementById("payment").value;

  pdf.setFont("Courier");
  pdf.setFontSize(14);

  pdf.text("PayFlow Digital Check", 20, 20);

  pdf.setFontSize(11);
  pdf.text(`Сатушы: ${seller}`, 20, 35);
  pdf.text(`ИИН/БИН: ${iin}`, 20, 43);
  pdf.text(`Сатып алушы: ${buyer}`, 20, 51);
  pdf.text(`Телефон: ${phone}`, 20, 59);
  pdf.text(`Тауар: ${product}`, 20, 67);

  pdf.setFontSize(13);
  pdf.text(`Сома: ${Number(amount).toLocaleString("ru-RU")} ₸`, 20, 80);

  pdf.setFontSize(11);
  pdf.text(`Төлем түрі: ${payment}`, 20, 92);

  // ЛОГО PDF-ке
  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  if (payment && logos[payment]) {
    pdf.addImage(logos[payment], "PNG", 140, 30, 40, 40);
  }

  pdf.text("Demo check. Not a real payment.", 20, 130);

  pdf.save("payflow-check.pdf");
}
