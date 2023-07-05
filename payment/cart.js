const cartButton = document.getElementById('cart-button');
const cart = document.getElementById('cart');

cartButton.addEventListener('click', () => {
  cart.classList.toggle('open');
});

let datta = [
    {
    name: "Product A",
    price: 19,
    quantity :1
  },
  {
    name: "Product B",
    price: 24,
    quantity :1
  },
  {
    name: "Product C",
    price: 9,
    quantity :1
  },
  {
    name: "Product A",
    price: 19,
    quantity :1
  },
  {
    name: "Product B",
    price: 24,
    quantity :1
  }
]

localStorage.setItem("cart",JSON.stringify(datta));

let items =JSON.parse(localStorage.getItem("cart"));

cartButton.addEventListener(`click`, () => {
    displaycart(items);
});

let cont = document.getElementById("cart-items")
function displaycart(data){
    cont.textContent = "";
    let totalp = 0;
    data.map(function(ele,ind){
        let li = document.createElement("li");
        li.setAttribute("class","item-list")

        let imgdiv = document.createElement("div");

        let img = document.createElement("img");
        img.setAttribute("class","cart-img")
        img.src = `https://assets.nflxext.com/ffe/siteui/vlv3/d282a426-b01a-424c-9b83-2c2445e4b61a/f7eb3bc2-2867-4c7e-94f8-e62ec11175cd/IN-en-20230626-popsignuptwoweeks-perspective_alpha_website_medium.jpg`;
        imgdiv.append(img);

        let detaildiv = document.createElement("div");
        
        let name = document.createElement("h3");
        name.textContent = ele.name;

        let price = document.createElement("p");
        price.textContent = (Number(ele.price)*Number(ele.quantity)).toFixed(2);

        let btndiv = document.createElement("p");
        btndiv.setAttribute("class","quan-btn")

        let addbtn = document.createElement("button");
        addbtn.addEventListener("click",function(){
            plus(ele)
        })
        addbtn.textContent = "+";

        let quantity = document.createElement("p");
        quantity.textContent = ele.quantity;

        let subbtn = document.createElement("button");
        subbtn.addEventListener("click",function(){
            minus(ele);
        });
        subbtn.textContent = "-";

        totalp = (Number(totalp)+ Number(price));
        console.log(totalp);

        let del = document.createElement("button");
        del.textContent = "Remove"
        del.setAttribute("class","remove-item");
        del.addEventListener("click",function(){
          removefromcart(ele,ind);
        })

        btndiv.append(addbtn,quantity,subbtn);
        detaildiv.append(name,price,btndiv,del);

        li.append(imgdiv,detaildiv);
        cont.append(li);
    })
    document.getElementById("total-price").textContent = totalp;
}

function plus(ele){
    if(ele.quantity==10){
        alert("More then 10 items cannot be added")
    }
    else{
       ele.quantity++;
       console.log(ele.name+" "+ele.quantity)
       localStorage.setItem("cart",JSON.stringify(datta));
        displaycart(items)
    }
}

function minus(ele){
    if(ele.quantity==1){
        alert("Quantity cannot be less then 1")
    }
    else{
      ele.quantity--;
      console.log(ele.name+" "+ele.quantity)
      localStorage.setItem("cart",JSON.stringify(datta));
       displaycart(items)
    }
}

function removefromcart(ele,ind){
  items.splice(ind,1);
  localStorage.setItem("cart",JSON.stringify(items));
  displaycart(items)
}