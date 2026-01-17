function updateLogo() {
  const p = document.getElementById("payment").value;
  const box = document.getElementById("logoBox");
  const img = document.getElementById("paymentLogo");

  if (!p) {
    box.style.display = "none";
    return;
  }

  img.src = "./logo/" + p + ".png";
  box.style.display = "block";
}

function formatKZT(v) {
  return Number(v).toLocaleString("ru-RU") + " ₸";
}

function generateCheck() {
  const seller = sellerVal();
  const iin = iinVal();
  const buyer = buyerVal();
  const phone = phoneVal();
  const product = productVal();
  const amount = amountVal();
  const payment = paymentVal();

  if (!seller || !iin || !buyer || !phone || !product || !amount || !payment) {
    alert("Барлық өрісті толтырыңыз");
    return;
  }

  const r = document.getElementById("receipt");
  r.style.display = "block";
  r.innerHTML = `
    <h2>PayFlow</h2>
    <p>Сатушы: ${seller}</p>
    <p>ИИН/БИН: ${iin}</p>
    <p>Сатып алушы: ${buyer}</p>
    <p>Телефон: ${phone}</p>
    <p>Тауар: ${product}</p>
    <p class="amount">Сома: ${formatKZT(amount)}</p>
    <p>Төлем: ${payment.toUpperCase()}</p>

    <div style="text-align:center;">
      <img src="./logo/${payment}.png" width="90">
    </div>

    <div class="qr" id="qr"></div>
    <div class="demo">Demo чек • Scan to verify</div>
  `;

  document.getElementById("qr").innerHTML = "";
  new QRCode(document.getElementById("qr"), {
    text: "./verify.html",
    width: 80,
    height: 80
  });
}

function generatePDF() {
  generateCheck();
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.setFont("Courier");
  pdf.text(document.getElementById("receipt").innerText, 10, 10);
  pdf.save("payflow-check.pdf");
}

/* helpers */
const sellerVal = () => seller.value.trim();
const iinVal = () => iin.value.trim();
const buyerVal = () => buyer.value.trim();
const phoneVal = () => phone.value.trim();
const productVal = () => product.value.trim();
const amountVal = () => amount.value.trim();
const paymentVal = () => payment.value;
