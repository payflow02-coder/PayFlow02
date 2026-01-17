function onlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

// Төлем логотипін ауыстыру
function updateLogo() {
  const payment = document.getElementById("payment").value;
  const logo = document.getElementById("payLogo");

  const logos = {
    Kaspi: "kaspi.png",
    Freedom: "freedom.png",
    Qiwi: "qiwi.png",
    Halyk: "halyk.png"
  };

  if (logos[payment]) {
    logo.src = logos[payment];
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }
}

function generate() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const item = document.getElementById("item").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !item || !amount || !payment) {
    alert("Барлық өрісті толық толтырыңыз!");
    return;
  }

  if (phone.length < 10) {
    alert("Телефон нөмірі дұрыс емес!");
    return;
  }

  // QR
  const qrBox = document.getElementById("qrcode");
  qrBox.innerHTML = "";

  new QRCode(qrBox, {
    text: `PayFlow чек | ${name} | ${amount}₸ | ${payment}`,
    width: 128,
    height: 128
  });

  // PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("PayFlow Digital Check", 20, 20);
  pdf.text(`Аты: ${name}`, 20, 40);
  pdf.text(`Телефон: ${phone}`, 20, 50);
  pdf.text(`Тауар: ${item}`, 20, 60);
  pdf.text(`Сома: ${amount} ₸`, 20, 70);
  pdf.text(`Төлем: ${payment}`, 20, 80);

  pdf.save("payflow-check.pdf");
}
