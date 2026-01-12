<!DOCTYPE html>
<html lang="kk">
<head>
  <meta charset="UTF-8">
  <title>Чекті тексеру</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <div class="card">

    <h2>Чекті тексеру</h2>

    <input id="vid" placeholder="Чек ID (PF-XXXXXX)">
    <input id="vhash" placeholder="Hash">

    <button class="btn" onclick="verifyCheck()">Тексеру</button>

    <div id="result" class="check hidden"></div>

  </div>
</div>

<script>
function verifyCheck() {
  const id = document.getElementById("vid").value.trim();
  const hash = document.getElementById("vhash").value.trim();
  const box = document.getElementById("result");

  box.classList.add("hidden");
  box.innerHTML = "";

  if (!id || !hash) {
    alert("ID және Hash енгізіңіз");
    return;
  }

  const data = localStorage.getItem(id);

  if (!data) {
    box.innerHTML = "<p style='color:red'>❌ Чек табылмады</p>";
  } else {
    const check = JSON.parse(data);
    if (check.hash !== hash) {
      box.innerHTML = "<p style='color:red'>❌ Hash сәйкес емес</p>";
    } else {
      box.innerHTML = `
        <p><b>Төлеуші:</b> ${check.payer}</p>
        <p><b>Алушы:</b> ${check.receiver}</p>
        <p><b>Сома:</b> ${check.amount} ₸</p>
        <p><b>Чек ID:</b> ${check.id}</p>
        <p><b>Hash:</b> ${check.hash}</p>
        <p style="color:green"><b>✅ ${check.status}</b></p>
      `;
    }
  }

  box.classList.remove("hidden");
}
</script>

</body>
</html>
