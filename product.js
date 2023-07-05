
    let filterText = document.getElementById("ans-filter-text");
    filterText.addEventListener("click", function () {
        let filterDiv = document.getElementById("ans-filter-div");
        let computedStyle = window.getComputedStyle(filterDiv);

        if (computedStyle.display === "none") {
            filterDiv.style.display = "block";
        } else {
            filterDiv.style.display = "none";
        }
    });

    let sortText = document.getElementById("ans-sort-text");
    sortText.addEventListener("click", function () {
        let sortDiv = document.getElementById("ans-sort-div");
        let computedStyle = window.getComputedStyle(sortDiv);
        if (computedStyle.display === "none") {
            sortDiv.style.display = "block";
        } else {
            sortDiv.style.display = "none";
        }
    });

    // -----------------------------------------------------------------------------------------

    let totalPages = null;
    let pageLimit = 12;
    let pageNumber = 1
    let fetchedData = null;
    const fetchProducts = async (pageNum) => {
        try {
            let result = await fetch(`http://localhost:3000/products`);
            fetchedData = await result.json();
          

            let res = await fetch(`http://localhost:3000/products?_limit=${pageLimit}&_page=${pageNum}`);
            let data = await res.json();
            // fetchedData = data;
            console.log(data)
            // let totalItems = data.length;
            let totalItems = res.headers.get("X-Total-Count")
            console.log("total items : " + totalItems)
            totalPages = Math.ceil(totalItems / pageLimit)
            console.log("total-pages : " + totalPages)
            // console.log(totalItems);
            displayData(data);
        } catch (error) {
            console.log(error)
        }
    }
    fetchProducts(pageNumber)

    //filtering part

    // category
    let filteredData = null;
    let hanChk = document.getElementById("c-handsanitizer")
    let caseChk = document.getElementById("c-case");
    let comboPack = document.getElementById("p-combo");
    hanChk.addEventListener("change", function(){
        if(hanChk.checked){
            caseChk.disabled = true;
            comboPack.disabled = true;
            filteredData = fetchedData.filter((el) => {
                return el.category === "sanitizer"
            })
           
            // console.log(filteredData)
        } else{
            caseChk.disabled = false;
            comboPack.disabled = false;
            filteredData = null;
        }
    })
    caseChk.addEventListener("change", function(){
        if(caseChk.checked){
            hanChk.disabled = true;
            comboPack.disabled = true;
            if(filteredData != null){
                filteredData = filteredData.filter((el) => {
                    return el.category === "case"
                })
            } else {
                filteredData = fetchedData.filter((el) => {
                    return el.category === "case"
                })
            }
            

        } else{
            hanChk.disabled = false;
            comboPack.disabled = false;
            filteredData = null;
        }
    })
    comboPack.addEventListener("change", function(){
        if(comboPack.checked){
            hanChk.disabled = true;
            caseChk.disabled = true;
            filteredData = fetchedData.filter((el) => {
                return el.pack === 2 || el.pack === 3
            })

        } else{
            hanChk.disabled = false;
            caseChk.disabled = false;
            filteredData = null;
        }

        
    })


    // price
    let inpPrice = document.getElementById("product-price");
    inpPrice.addEventListener("input", function(){
        inpPriceValue = inpPrice.value
        if(filteredData != null){
            filteredData = filteredData.filter((el) => {
                return el.discounted_price > inpPriceValue;
            });
        } else{
            filteredData = fetchedData.filter((el) => {
                return el.discounted_price > inpPriceValue;
            });
        }

        filteredData = filteredData.sort((x,y)=>{
            return x.discounted_price - y.discounted_price
        })
    })


    let filterBtn = document.getElementById("ans-filter-btn")
    filterBtn.addEventListener("click", function(){
        if(filteredData !== null){
            displayData(filteredData)
            document.getElementById("ans-filter-div").style.display = "none"
            document.getElementById("ans-pagination-btns").style.display = "none"
        }
    })


    // sorting part
    let sortedData = null;
    let sortBtn = document.getElementById("ans-sort-btn")
    let ascendingChk = document.getElementById("p-ascending");
    let descendingChk = document.getElementById("p-descending");
    let az = document.getElementById("a-z");
    let za = document.getElementById("z-a");

    ascendingChk.addEventListener("change", function(){
        if(ascendingChk.checked){
            descendingChk.disabled = true;
            az.disabled = true;
            za.disabled = true;
            sortedData = fetchedData.sort( (x,y) => {
                return x.discounted_price - y.discounted_price;
            } )
            console.log(sortedData)

        } else {
            descendingChk.disabled = false; 
            az.disabled = false;
            za.disabled = false;
            sortedData = null;
        }
    })

    descendingChk.addEventListener("change", function(){
        if(descendingChk.checked){
            ascendingChk.disabled = true;
            az.disabled = true;
            za.disabled = true;
            sortedData = fetchedData.sort( (x,y) => {
                return y.discounted_price-x.discounted_price;
            } )
            console.log(sortedData)
        } else {
            ascendingChk.disabled = false; 
            az.disabled = false;
            za.disabled = false;
            sortedData = null;
        }
    })

    az.addEventListener("change", function(){
        if(az.checked){
            ascendingChk.disabled = true;
            descendingChk.disabled = true;
            za.disabled = true;
            sortedData = fetchedData.sort( (x,y) => {
                if(x.name > y.name) return 1
                if(x.name < y.name) return -1
                return 0
            })
            console.log(sortedData)
        } else {
            ascendingChk.disabled = false; 
            descendingChk.disabled = false;
            za.disabled = false;
            sortedData = null;
        }
    })

    za.addEventListener("change", function(){
        if(za.checked){
            ascendingChk.disabled = true;
            descendingChk.disabled = true;
            az.disabled = true;
            sortedData = fetchedData.sort( (x,y) => {
                if(x.name > y.name) return -1
                if(x.name < y.name) return 1
                return 0
            })
            console.log(sortedData)
        } else {
            ascendingChk.disabled = false; 
            descendingChk.disabled = false;
            az.disabled = false;
            sortedData = null;
        }
    })
    sortBtn.addEventListener("click", function(){
        if(sortedData !== null){
            displayData(sortedData)
            document.getElementById("ans-sort-div").style.display = "none"
            document.getElementById("ans-pagination-btns").style.display = "none"
        
        }
    })




    // pagination part
    let pageNumberText = document.getElementById("ans-page-num");
    pageNumberText.textContent = pageNumber;
    let prevBtn = document.getElementById("ans-previous-btn");
    prevBtn.disabled = true;

    let nextBtn = document.getElementById("ans-next-btn");
    nextBtn.addEventListener("click", function(){
        pageNumber++;
        prevBtn.disabled = false;
        if(pageNumber === totalPages){
            nextBtn.disabled = true;
        }
        pageNumberText.textContent = pageNumber;
        window.location.href = "#ans-main-product-container";
        fetchProducts(pageNumber)
    });
    
    prevBtn.addEventListener("click", function(){
        pageNumber--;
        nextBtn.disabled = false;
        if(pageNumber === 1){
            prevBtn.disabled = true;
        }
        pageNumberText.textContent = pageNumber;
        window.location.href = "#ans-main-product-container";
        fetchProducts(pageNumber)
    })



    let lsArr = JSON.parse(localStorage.getItem("card-product-db")) || [];
    const displayData = (data) => {
        let pMainContainer = document.getElementById("ans-main-product-container");
        pMainContainer.innerHTML = null;

        let productsList = document.createElement("div");
        productsList.setAttribute("class", "ans-product-list");

        data.forEach((element) => {
            let productCard = document.createElement("div");
            productCard.setAttribute("class", "ans-product-card");
            let productImg = document.createElement("div");
            productImg.setAttribute("class", "prodct-img-cont")
            let img = document.createElement("img");

            let productBody = document.createElement("div");
            productBody.setAttribute("class", "prodct-body")
            let h3 = document.createElement("h3");
            h3.setAttribute("class", "product-name")
            let dp = document.createElement("p");
            let op = document.createElement("p");
            let cardBtn = document.createElement("button");
            cardBtn.setAttribute("class", "ans-btn")
            cardBtn.textContent = "Add to Cart";
         

            img.src = element.img;
            h3.textContent = element.name;
            dp.textContent = "₹" + element.discounted_price;
            op.textContent = "₹" + element.price;
            op.setAttribute("id", "p-or-price")
            productImg.append(img);
            productBody.append(h3, dp, op, cardBtn);
            productCard.append(productImg, productBody);
            productsList.append(productCard);

            h3.style.cursor = "pointer"
            h3.addEventListener("click", function(){
                localStorage.setItem("product-det", JSON.stringify(element))
                window.location.href = "product-description.html"
            })

            img.style.cursor = "pointer"
            img.addEventListener("click", function(){
                localStorage.setItem("product-det", JSON.stringify(element))
                window.location.href = "product-description.html"
            })


            cardBtn.addEventListener("click", function(){
                lsArr.push(element);
                localStorage.setItem("card-product-db", JSON.stringify(lsArr));
            })
            cardBtn.style.cursor = "pointer";
        });

        pMainContainer.append(productsList);
    };


