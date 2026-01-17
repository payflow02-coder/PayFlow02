// ====== ТӨЛЕМ ЛОГОТИПІН ЖАҢАРТУ ======
function updateLogo() {
  const select = document.getElementById("payment");
  const img = document.getElementById("paymentLogo");

  const logos = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  const value = select.value;

  if (logos[value]) {
    img.src = logos[value];
    img.style.display = "block";
  } else {
    img.src = "";
    img.style.display = "none";
  }
}

// ====== ТЕК САН ЕНГІЗУ ======
function allowOnlyNumbers(id) {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
}

allowOnlyNumbers("iin");
allowOnlyNumbers("phone");
allowOnlyNumbers("amount");

// ====== СОМАНЫ ₸ ФОРМАТТАУ ======
function formatKZT(value) {
  return Number(value).toLocaleString("ru-RU") + " ₸";
}

// ====== PDF + QR ГЕНЕРАЦИЯ ======
function generatePDF() {
  const seller = document.getElementById("seller").value.trim();
  const iin = document.getElementById("iin").value.trim();
  const buyer = document.getElementById("buyer").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const item = document.getElementById("item").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const payment = document.getElementById("payment").value;

  if (!seller || !iin || !buyer || !phone || !item || !amount || !payment) {
    alert("Барлық өрістерді толық толтырыңыз");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 180]
  });

  let y = 10;

  doc.setFont("courier", "bold");
  doc.setFontSize(14);
  doc.text("PayFlow", 40, y, { align: "center" });

  y += 6;
  doc.setFontSize(8);
  doc.setFont("courier", "normal");
  doc.text("DEMO CHECK", 40, y, { align: "center" });

  y += 8;
  doc.text(`Сатушы: ${seller}`, 5, y); y += 5;
  doc.text(`ИИН/БИН: ${iin}`, 5, y); y += 5;
  doc.text(`Сатып алушы: ${buyer}`, 5, y); y += 5;
  doc.text(`Телефон: ${phone}`, 5, y); y += 5;
  doc.text(`Тауар: ${item}`, 5, y); y += 6;

  doc.setFont("courier", "bold");
  doc.text(`Сома: ${formatKZT(amount)}`, 5, y);
  y += 8;

  doc.setFont("courier", "normal");
  doc.text(`Төлем: ${payment}`, 5, y);
  y += 8;

  // ====== ТӨЛЕМ ЛОГОТИПІ PDF ======
  const logoMap = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  const img = new Image();
  img.src = logoMap[payment];

  img.onload = function () {
    doc.addImage(img, "PNG", 25, y, 30, 12);
    y += 18;

    // ====== QR ======
    const qrData = window.location.origin + window.location.pathname.replace("index.html", "") + "verify.html";

    const qr = new QRCode(document.createElement("div"), {
      text: qrData,
      width: 100,
      height: 100
    });

    setTimeout(() => {
      const qrImg = qr._el.querySelector("img");
      doc.addImage(qrImg.src, "PNG", 20, y, 40, 40);
      y += 45;

      doc.setFontSize(7);
      doc.text("Scan to verify", 40, y, { align: "center" });

      y += 5;
      doc.text("Бұл чек PayFlow демо жүйесінде жасалған", 40, y, { align: "center" });

      doc.save("payflow-check.pdf");
    }, 300);
  };
}
