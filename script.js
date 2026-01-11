function generateCheck() {
  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("checkId").innerText = id;

  const now = new Date();
  document.getElementById("date").innerText =
    now.toLocaleDateString("kk-KZ") + " " +
    now.toLocaleTimeString("kk-KZ");
}

function downloadPDF() {
  window.print();
}
