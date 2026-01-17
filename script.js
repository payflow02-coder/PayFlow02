function showLogo() {
  document.querySelectorAll(".pay-logo img")
    .forEach(img => img.style.display = "none");

  const val = document.getElementById("payment").value;
  if (val) document.getElementById(val).style.display = "block";
}

function generate() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const item = document.getElementById("item").value;
  const amount = document.getElementById("amount").value;
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !item || !amount || !payment) {
    alert("Барлық өрісті толтыр!");
    return;
  }

  const qrText = `PayFlow чек | ${name} | ${amount}₸ | ${payment}`;
  const qrBox = document.getElementById("qrcode");
  qrBox.innerHTML = "";

  new QRCode(qrBox, {
    text: qrText,
    width: 128,
    height: 128
  });

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("PayFlow Demo Check", 20, 20);
  pdf.text(`Аты: ${name}`, 20, 40);
  pdf.text(`Телефон: ${phone}`, 20, 50);
  pdf.text(`Тауар: ${item}`, 20, 60);
  pdf.text(`Сома: ${amount} ₸`, 20, 70);
  pdf.text(`Төлем: ${payment}`, 20, 80);

  pdf.save("payflow-check.pdf");
}
