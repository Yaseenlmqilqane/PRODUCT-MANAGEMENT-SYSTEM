// Get Elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("createBtn");
let search = document.getElementById("search");
let myAlert = document.querySelector(".myAlert");
let infoText = document.querySelector(".info");
// Global Var 
let mood = "create";
let tmp;


let dataPro;

if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}




// Calc Price
function calcPrice() {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    if(price.value != 0) {
        total.innerHTML = result;
        total.style.background = "#040"
    } else {
        total.innerHTML = "";
        total.style.background = "#910707"
    }
}

// Create Product
createBtn.onclick = function createData() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if(title.value != "" 
    && price.value != "" 
    && category.value != ""
    && newPro.count <= 100) {
        if(mood === "create") {
            if(newPro.count > 1) {
                for(let i = 0; i < count.value; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            count.style.display = "block";
            createBtn.innerHTML = "Create";
        }
        clearData()
    } else {
        myError("Warning: Input did not enter!")
    }


    // Save to Array 
    localStorage.setItem("product", JSON.stringify(dataPro))

    showData()
}

// clear input
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Read Products
function showData() {
    calcPrice()
    let table = "";
    for(let i = 0; i < dataPro.length; i++ ) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
        </tr>
    ` 
    }

    document.getElementById("tab").innerHTML = table

    let btnDeleteAll = document.getElementById("deleteAll-btn");

    if(dataPro.length > 0) {
        btnDeleteAll.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else {
        btnDeleteAll.innerHTML = "";
    }
    
}

// Update Product
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    title.discount = dataPro[i].discount;
    title.category = dataPro[i].category;

    count.style.display = "none";
    createBtn.innerHTML = "Update";
    mood = "update";
    tmp = i;

    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// Delete One's
function deleteItem(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// Delete All
function deleteAll() {
    dataPro.splice(0);
    localStorage.clear();
    showData();
}



// Search All
let searchMood = "Title";
function getSearchMood(id) {
    if(id === "searchByTitle") {
        searchMood = "Title";
    } else {
        searchMood = "Category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData()
}

function searchPro(value) {
    let table = "";
    for(let i = 0; i < dataPro.length; i++) {
        if(searchMood === "Title") {
            if(dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].category}</td>
                        <td>${dataPro[i].total}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
                `  
            }
        } else {
            if(dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].category}</td>
                        <td>${dataPro[i].total}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
                `  
            }
        }
    }
    document.getElementById("tab").innerHTML = table
}



// clear data
function myError(text) {
    myAlert.style.top = "10px"
    infoText.innerHTML = text
}

function hideAlert() {
    myAlert.classList.add("hide");
    window.setTimeout( function() {
        window.location.reload();
      }, 500);
}
