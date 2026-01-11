function generateCheck() {
  const id = "PF-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString("kk-KZ");

  document.getElementById("checkId").innerText = id;
  document.getElementById("date").innerText = date;
}
