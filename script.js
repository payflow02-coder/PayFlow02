function generateCheck() {
  const randomId = "PF-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("checkId").innerText = randomId;

  const now = new Date();
  document.getElementById("date").innerText =
    now.toLocaleDateString("kk-KZ") + ", " +
    now.toLocaleTimeString("kk-KZ");
}
