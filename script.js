// ===== ЛОГОТИП =====
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
    return;
  }

  logo.src = logos[payment];
  logo.style.display = "block";
}

// ===== ЭКРАН ЧЕК =====
function generateCheck() {
  const seller = sellerValue();
  const buyer = buyerValue();
  const product = productValue();
  const amount = amountValue();
  const payment = paymentValue();

  if (!seller || !buyer || !product || !amount || !payment) {
    alert("Барлық өрісті толтыр");
    return;
  }

  const check = document.getElementById("check");
  check.style.display = "block";

  check.innerHTML = `
    <div style="text-align:center;font-weight:bold;">PayFlow</div>
    <hr>
    <div>Сатушы: ${seller}</div>
    <div>Сатып алушы: ${buyer}</div>
    <div>Тауар: ${product}</div>
    <div><b>Сома: ${format(amount)}</b></div>
    <div>Төлем: ${payment}</div>
    <div style="text-align:center;margin-top:10px;">
      <img src="logo/${payment.toLowerCase()}.png" width="80">
    </div>
    <hr>
    <div style="font-size:10px;text-align:center;">
      Demo чек
    </div>
  `;
}

// ===== PDF =====
function generatePDF() {
  generateCheck();

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont("Courier");
  pdf.text(document.getElementById("check").innerText, 10, 10);

  pdf.save("payflow-check.pdf");
}

// ===== HELPERS =====
const sellerValue = () => document.getElementById("seller").value.trim();
const buyerValue = () => document.getElementById("buyer").value.trim();
const productValue = () => document.getElementById("product").value.trim();
const amountValue = () => document.getElementById("amount").value.trim();
const paymentValue = () => document.getElementById("payment").value;
const format = v => Number(v).toLocaleString("ru-RU") + " ₸";
