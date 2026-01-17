// 🔢 тек сан
["iin","phone","amount"].forEach(id=>{
  document.getElementById(id).addEventListener("input",e=>{
    e.target.value = e.target.value.replace(/\D/g,"");
  });
});

// 💳 ЛОГОТИП ДҰРЫС ШЫҒУЫ ҮШІН (FIX)
function updateLogo(){
  const select = document.getElementById("payment");
  const img = document.getElementById("paymentLogo");

  const map = {
    Kaspi: "logo/kaspi.png",
    Freedom: "logo/freedom.png",
    Qiwi: "logo/qiwi.png",
    Halyk: "logo/halyk.png"
  };

  const value = select.value;

  if(map[value]){
    img.src = map[value];
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }
}

// ₸ формат
function formatKZT(v){
  return v.replace(/\B(?=(\d{3})+(?!\d))/g," ")+" ₸";
}

// 🧾 ЧЕК = PDF (БҰЛ ДҰРЫС, АЖЫРАТУ КЕРЕК ЕМЕС)
function generatePDF(){

  const data={
    seller:document.getElementById("seller").value,
    iin:document.getElementById("iin").value,
    buyer:document.getElementById("buyer").value,
    phone:document.getElementById("phone").value,
    item:document.getElementById("item").value,
    amount:document.getElementById("amount").value,
    payment:document.getElementById("payment").value
  };

  for(let k in data){
    if(!data[k]){
      alert("Барлық жолды толтыр");
      return;
    }
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:"mm", format:[80,220] });
  let y = 10;

  doc.setFont("courier","bold");
  doc.setFontSize(14);
  doc.text("PAYFLOW",40,y,{align:"center"});
  y+=6;

  doc.setFont("courier","normal");
  doc.setFontSize(9);
  doc.text("DIGITAL PAYMENT RECEIPT",40,y,{align:"center"});
  y+=6;

  doc.line(5,y,75,y); y+=6;

  const logos = {
    Kaspi:"logo/kaspi.png",
    Freedom:"logo/freedom.png",
    Qiwi:"logo/qiwi.png",
    Halyk:"logo/halyk.png"
  };

  if(logos[data.payment]){
    doc.addImage(logos[data.payment],"PNG",25,y,30,12);
    y+=16;
  }

  const row=(l,v)=>{
    doc.text(l,5,y);
    doc.text(v,75,y,{align:"right"});
    y+=6;
  };

  row("SELLER",data.seller);
  row("IIN / BIN",data.iin);
  row("BUYER",data.buyer);
  row("PHONE",data.phone);
  row("ITEM",data.item);

  doc.line(5,y,75,y); y+=6;

  doc.setFont("courier","bold");
  doc.setFontSize(12);
  row("AMOUNT",formatKZT(data.amount));

  doc.setFont("courier","normal");
  doc.setFontSize(9);
  row("PAYMENT",data.payment);

  doc.line(5,y,75,y); y+=6;

  row("CHECK ID","PF-"+Date.now());
  row("DATE",new Date().toLocaleString());

  doc.line(5,y,75,y); y+=6;

  const qrDiv=document.createElement("div");
  new QRCode(qrDiv,{
    text: location.origin + location.pathname.replace("index.html","verify.html"),
    width:100,
    height:100
  });

  setTimeout(()=>{
    const img=qrDiv.querySelector("img");
    doc.addImage(img.src,"PNG",22,y,36,36);
    y+=40;

    doc.setFontSize(8);
    doc.text("Scan to verify receipt",40,y,{align:"center"});
    y+=4;
    doc.text("Demo only. Not a real payment.",40,y,{align:"center"});

    doc.save("PayFlow_Check.pdf");
  },300);
}
