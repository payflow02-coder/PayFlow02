# PayFlow

---

## 🇰🇿 Қазақша

**PayFlow** — цифрлық чек генерациялайтын демонстрациялық веб-сайт.

### Мүмкіндіктері
- Чек жасау
- Check ID автоматты түрде құрылады
- QR-код генерациясы
- PDF жүктеу
- Чек тексеру (verify бет)

⚠️ Бұл жоба тек **демонстрациялық мақсатта** жасалған.  
Нақты төлем жүйесі емес.

© 2026 PayFlow. Барлық құқықтар қорғалған.

---

## 🇷🇺 Русский

**PayFlow** — демонстрационный веб-сайт для генерации цифровых чеков.

### Возможности
- Создание чека
- Автоматический Check ID
- Генерация QR-кода
- Скачивание PDF
- Проверка чека (страница verify)

⚠️ Проект является **демонстрационным**.  
Не является банковской системой.

© 2026 PayFlow. Все права защищены.

---

## 🇬🇧 English

**PayFlow** is a demo web application for generating digital receipts.

### Features
- Receipt generation
- Automatic Check ID
- QR code generation
- PDF download
- Receipt verification page

⚠️ This project is for **demonstration purposes only**.  
It is not a real payment system.

© 2026 PayFlow. All rights reserved.
<!DOCTYPE html>
<html lang="kk">
<head>
  <meta charset="UTF-8">
  <title>PayFlow</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 100px;
      background: #f4f4f4;
    }
    .card {
      background: white;
      padding: 30px;
      width: 320px;
      margin: auto;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    button {
      padding: 12px 20px;
      font-size: 16px;
      margin-top: 20px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <div class="card">
    <h1>PayFlow MVP</h1>
    <p>Сатып алушы құқығын қорғайтын цифрлық чек жүйесі</p>

    <button onclick="createReceipt()">
      Чек жасау
    </button>

  </div>

  <script>
    function createReceipt() {
      alert(
        "✅ Чек жасалды\n" +
        "✅ Аты, номер, сома, тауар\n" +
        "✅ Төлем қосымшасын таңдау (логотиппен)\n" +
        "✅ PDF чек\n" +
        "✅ QR-код\n" +
        "✅ Қолмен жазылатын ИПС\n" +
        "✅ PDF-ті жіберуге дайын формат"
      );
    }
  </script>

</body>
</html>
