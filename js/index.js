var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productImage");
var productDscInput = document.getElementById("productDsc");
var addBtn = document.getElementById("addBtn");
var updateBTN = document.getElementById("updateBTN");
var prductSearch = document.getElementById("productSearch");
var updtedIndex;
var productList = [];

if (JSON.parse(localStorage.getItem("allProduct"))) {
  productList = JSON.parse(localStorage.getItem("allProduct"));
  displayProduct(productList);
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    image: `img/${productImageInput.files[0]?.name}`,
    dsc: productDscInput.value,
  };
  clear();
  productList.push(product);
  localStorage.setItem("allProduct", JSON.stringify(productList));
  displayProduct(productList);
}
function clear() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productImageInput.value = "";
  productDscInput.value = "";
}
function displayProduct(arr) {
  var blackBox = "";

  for (var i = 0; i < arr.length; i++) {
    blackBox += `<div class="col-lg-4 col-md-3">
        <div class="product bg-light p-3">
        <img class="w-100" src="${arr[i].image}" alt="">
            <h3>${arr[i].newName ? arr[i].newName : arr[i].name} </h3>
            <div class="d-flex justify-content-between align-items-center pb-3">
                <span>${arr[i].category}</span>
                <span>${arr[i].price}</span>
            </div>
            <p>${arr[i].dsc}</p>
            <button class="btn btn-outline-danger"onclick="deleteProduct(${i})">Delete</button>
            <button class="btn btn-outline-success"onclick="editProduct(${i})">Edit</button>
        </div>
    </div>`;
  }
  document.getElementById("ProductsRow").innerHTML = blackBox;
}

function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  localStorage.setItem("allProduct", JSON.stringify(productList));
  displayProduct(productList);
}

function editProduct(editedIndex) {
  addBtn.classList.add("d-none");
  updateBTN.classList.remove("d-none");
  updtedIndex = editedIndex;
  productNameInput.value = productList[editedIndex].name;
  productPriceInput.value = productList[editedIndex].price;
  productCategoryInput.value = productList[editedIndex].category;
  productDscInput.value = productList[editedIndex].Dsc;
}

function updateProduct() {
  addBtn.classList.remove("d-none");
  updateBTN.classList.add("d-none");
  productList[updtedIndex].name = productNameInput.value;
  productList[updtedIndex].price = productPriceInput.value;
  productList[updtedIndex].category = productCategoryInput.value;
  productList[updtedIndex].Dsc = productDscInput.value;
  localStorage.setItem("allProduct", JSON.stringify(productList));
  displayProduct(productList);
  clear();
}
function productSearch(keyWords) {
  var matched = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(keyWords.toLowerCase())) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(keyWords, `<span class='text-danger'>${keyWords}</span>`);
      matched.push(productList[i]);
      displayProduct(matched);
    }
  }
}

function validateInputs(ele) {
  var regex = {
    productName: /^[A-Z][a-z]{2,8}$/,
    productPrice: /^[1-9][0-9][0-9]/,
    productCategory:/(tv|phone|laptop|watches|electronics)/ ,
    productDsc:/.{6}/ ,
  };

  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.replace("d-block", "d-none");
  } 
  else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    ele.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
