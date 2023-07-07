import navbar from "./components/navbar.js";
import footer from "./components.footer.js";

let nav = document.getElementById("navbar");
nav.innerHTML = navbar();

let foot = document.getElementById("footer");
foot.innerHTML = footer();







// let dummy = [
//     {
//         "id" : 1,
//         "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pack3_SA_MF.jpg?v=1678874635",
//         "name" : "3 Hand Sanitizers Mystic Foliage",
//         "discounted_price" : 1350,
//         "price" : 1650,
//         "pack" : 3,
//         "category" : "sanitizer",
//         "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. This Mystic Foliage collection will leave your hands delicately scented and remind you of the warmness of the tropics and the exotic flora."
//     },
//     {
//         "id" : 2,
//         "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pocket_SA_MF_TalesLotus_1.jpg?v=1678356415",
//         "name" : "Hand Sanitizer Tales of Lotus",
//         "discounted_price" : 590,
//         "price" : 600,
//         "pack" : 1,
//         "category" : "sanitizer",
//         "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Tales of Lotus fragrance will leave your skin a delicate scent of delicate water petals with white figs and dry fruit notes." 
//     },
//     {
//         "id" : 3,
//         "img" :"https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pocket_SA_MF_ForestGrace.jpg?v=1678356444",
//         "name" : "Hand Sanitizer Forest Grace",
//         "discounted_price" : 480,
//         "price" : 590,
//         "pack" : 1,
//         "category" : "sanitizer",
//         "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Forest Grace fragrance will leave your skin a delicate fresh and fruity scent that will remind you of a tropical rainforest."
//     },
//     {
//         "id" : 4,
//         "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Refill_SA_MF_ForestGrace.jpg?v=1678356460",
//         "name" : "Hand Sanitizer Refill Forest Grace",
//         "discounted_price" : 790,
//         "price" : 1490,
//         "pack" : 1,
//         "category" : "sanitizer",
//         "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Forest Grace fragrance will leave your skin a delicate fresh and fruity scent that will remind you of a tropical rainforest."
//     },
//     {
//         "id" : 5,
//         "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/Pocket_SA_MF_WildOrchid_5052f880-3d50-4442-82d2-e3c4eebc8159.jpg?v=1678356511",
//         "name" : "Hand Sanitizer Wild Orchid",
//         "discounted_price" : 480,
//         "price" : 590,
//         "pack" : 1, 
//         "category" : "sanitizer",
//         "description" : "Cleanse and moisturize your hands with this formula with Aloe Vera that eliminates 99.99% of bacteria. The Wild Orchid fragrance will leave your skin a delicate scent of wild orchids, vanilla and Indian Sandalwood." 
//     },
//     {
//         "id" : 6,
//         "img" : "https://cdn.shopify.com/s/files/1/0511/9066/1293/products/082.jpg?v=1651510073",
//         "name" : "Hydrating Hand Sanitizer - 3 Pack",
//         "discounted_price" : 1350,
//         "price" : 1590,
//         "pack" : 3,
//         "category" : "sanitizer",
//         "description" : "In ancient times, medicinal flowers and herbs were commonly used to achieve great advantages for the body and the mind. This is why we have packed them together to bring you only the best of the best. Our tested formula is full of natural ingredients to leave your hands soft and healthy while killing 99.99% of virus and bacteria."
//     }
// ]

// localStorage.setItem("wishlistItems",JSON.stringify(dummy));



let items = JSON.parse(localStorage.getItem("wishlistItems")) || [];
displayData(items)
function displayData(data){
let maindiv = document.getElementById("box1");
maindiv.textContent = "";
let productsList = document.createElement("div");
productsList.setAttribute("class", "ans-product-list");

data.forEach((element,ind) => {
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "ans-product-card");
    let productImg = document.createElement("div");
    productImg.setAttribute("class", "prodct-img-cont");
    let img = document.createElement("img");

    let productBody = document.createElement("div");
    productBody.setAttribute("class", "product-body");
    let h3 = document.createElement("h3");
    h3.setAttribute("class", "product-name");
    let dp = document.createElement("p");
    let op = document.createElement("p");
    let cardBtn = document.createElement("button");
    cardBtn.setAttribute("class", "ans-btn");
    cardBtn.textContent = "Add to Cart";

    let removebtn = document.createElement("button");
    removebtn.textContent = "Remove from Wish-list"
    removebtn.setAttribute("class", "remove-btn");
    removebtn.addEventListener("click",function(){
        items.splice(ind,1)
        localStorage.setItem("wishlistItems",JSON.stringify(items));
        displayData(items)
    })

    img.src = element.img;
    h3.textContent = element.name;
    dp.textContent = "₹" + element.discounted_price;
    op.textContent = "₹" + element.price;
    op.setAttribute("id", "p-or-price");
    productImg.append(img);
    productBody.append(h3, dp, op, cardBtn,removebtn);
    productCard.append(productImg, productBody);
    productsList.append(productCard);
    maindiv.append(productsList);

    h3.style.cursor = "pointer";
    h3.addEventListener("click", function () {
        localStorage.setItem("product-det", JSON.stringify(element));
        window.location.href = "product-description.html";

        let filteredSimilarProducts = fetchedData.filter((el) => {
            return el.category === element.category && el.pack === element.pack;
        });
        localStorage.setItem(
            "similar-products-db",
            JSON.stringify(filteredSimilarProducts)
        );
    });

    cardBtn.addEventListener("click", function () {
        let isProductAlreadyPresent = false;
        if (items.length > 0) {
            items.forEach((item) => {
                if (item.id === element.id) {
                    isProductAlreadyPresent = true;
                    return; 
                }
            });
        }
        if (isProductAlreadyPresent) {
            alert("Product is already present in the cart.");
        } else {
            items.push(element);
            localStorage.setItem("cardItems", JSON.stringify(items));
            alert("Product added to cart successfully.");
        }
    })

});
}
