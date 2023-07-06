showData();
subTotal(0);
Total();
function showData() {
  let ProductList = document.querySelector("#productList");
  ProductList.innerHTML = "";
  let items = JSON.parse(localStorage.getItem("cart-product-db")) || [];
  items.map(function (e) {
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let price = document.createElement("h2");
    let img = document.createElement("img");
    let product = document.createElement("h2");

    img.src = e.img;
    product.innerText = e.name;
    // div2.innerText=e.pack;
    // div2.classList="quantity";
    div1.append(div2,img, product);
    price.innerText = e.price;
    div.append(div1, price);
    ProductList.append(div);
  });
}
function subTotal(Discount){
   let subTotal = document.querySelector("#subTotal"); 
   subTotal.innerText=null;
   let items = JSON.parse(localStorage.getItem("cart-Item-List")) || [];
   let sum=0;
   items.map(function(e){
       sum+=e.price;
   })
   let DiscountAmount = sum*Discount;
   sum= sum-DiscountAmount;
   subTotal.innerText=sum;
}
function Total(){
    let subTotal=Number(document.querySelector("#subTotal").innerText);
    let shipping = Number(document.querySelector("#shipping").innerText);
   let Total= document.querySelector("#Total");
   Total.innerText=null;
    Total.innerText = subTotal+shipping;
    localStorage.setItem("TotalAmount",subTotal+shipping);
}
localStorage.setItem("Haan10",0.1);
document.getElementById("DiscountButton").addEventListener("click",Discount);
function Discount(){
    let coupon = document.getElementById("Coupon").value;
    let discountVal = Number(localStorage.getItem(coupon));
    subTotal(discountVal);
    Total();
}