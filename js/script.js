let setFavourite;
let setOrder;

// ***********************************************************************
// Repaire Data
function repaireData() {
  if (
    localStorage.getItem("setOrder") != null &&
    localStorage.getItem("setOrder") != ""
  ) {
    setOrder = JSON.parse(localStorage.getItem("setOrder"));
  } else {
    setOrder = [];
  }
  if (
    localStorage.getItem("setFavourite") != null &&
    localStorage.getItem("setFavourite") != ""
  ) {
    setFavourite = JSON.parse(localStorage.getItem("setFavourite"));
  } else {
    setFavourite = [];
  }
}
repaireData();
// ***********************************************************************

// ***********************************************************************
//   check on your user account if exist
function checkExistAccount() {
  if (
    localStorage.getItem("username") == null ||
    localStorage.getItem("username") == ""
  ) {
    alert("You haven't account !!!");
    location = "login.html";
    return false;
  }
  return true;
}
// ***********************************************************************

// ***********************************************************************
// Data
let dataProducts = [
  {
    id: 0,
    price: "160",
    favorite: false,
    name: "Nike Zoom Vomero 5 SE",
    category: "Men's Shoes",
    URLimg: "images/products/Nike Zoom Vomero 5 SE.webp",
    amount: 1,
  },
  {
    id: 1,
    price: "120",
    favorite: false,
    name: "Nike Free Metcon6",
    category: "Men's Workout Shoes",
    URLimg: "images/products/Nike Free Metcon 6.webp",
    amount: 1,
  },
  {
    id: 2,
    price: "60",
    favorite: false,
    name: "Nike Sportswear Club Fleece",
    category: "Men's Pants",
    URLimg: "images/products/Nike Sportswear Club Fleece.webp",
    amount: 1,
  },
  {
    id: 3,
    price: "65",
    favorite: false,
    name: "Nike Sportswear Club Fleece",
    category: "Pullover Hoodie",
    URLimg: "images/products/Nike Sportswear Club Fleece.png",
    amount: 1,
  },
  {
    id: 4,
    price: "75",
    favorite: false,
    name: "Nike Sportswear Phoenix Fleece",
    category: "Women's Over-Oversized Pullover",
    URLimg: "images/products/Nike Sportswear Phoenix Fleece.webp",
    amount: 1,
  },
  {
    id: 5,
    price: "28",
    favorite: false,
    name: "Nike Everyday Plus Cushioned",
    category: "Training Ankle Socks (6 Pairs)",
    URLimg: "images/products/Nike Everyday Plus Cushioned.webp",
    amount: 1,
  },
  {
    id: 6,
    price: "27",
    favorite: false,
    name: "Training Ankle Socks (6 Pairs)",
    category: "Baby Coveralls",
    URLimg: "images/products/Training Ankle Socks (6 Pairs).webp",
    amount: 1,
  },
  {
    id: 7,
    price: "57",
    favorite: false,
    name: "Nike Hayward",
    category: "Backpack (26L)",
    URLimg: "images/products/Nike Hayward.webp",
    amount: 1,
  },
  {
    id: 8,
    price: "28",
    favorite: false,
    name: "Nike Powder Play",
    category: "Big Kids' 2-Piece Beanie Set",
    URLimg: "images/products/Nike Powder Play.webp",
    amount: 1,
  },
];

// ***********************************************************************

let containerProducts = document.querySelector(`main section[id="products"]`);
function drawSetProductsSpecial(setProductSpecial) {
  let y = setProductSpecial.map((item, index) => {
    return `
        <div class="product-cart">
        <img src="${item.URLimg}" alt="" />
        <ul id="caption-img" class="">
                <li>Product : ${item.name}</li>
                <li>Price : ${item.price} $</li>
                <li>Category : ${item.category}</li>
            </ul>
            <div class="btn-act">
            <button class="btn btn-primary text-capitalize" onclick = "AddToCart(${index}, ${JSON.stringify(
      setProductSpecial
    ).replace(/"/g, "&quot;")})" >Add to cart</button>
            <i class="fa-solid fa-heart" id="heart-icon" onclick = "AddToFav(${index}, ${JSON.stringify(
      setProductSpecial
    ).replace(/"/g, "&quot;")})"></i>
            </div>
            </div>
            `;
  });

  for (let i = 0; i < y.length; i++) {
    containerProducts.innerHTML += y[i];
  }
}
drawSetProductsSpecial(dataProducts);

let seBtnBasic = document.querySelectorAll(".btn-act button");
let setheartIconBasic = document.querySelectorAll("#heart-icon");
// ***********************************************************************
let badgeCart = document.querySelector(".badge-cart");
let listProduct = document.querySelector(".box-product > div:first-child");

function drawSetOrderSpecial(setOrderSpecial) {
  let y = setOrderSpecial.map((item, index) => {
    // btnAct[index].style.color = "green"
    return `
        <p>
          <span>${item.name}</span>
            <span class="icons-change">
            <i class="fa-solid fa-plus" onclick="increaseAmount(${index})" id="plus"></i>
            <input type="text" class="mx-1" maxlength="2" value="${item.amount}" id="count-from-product" disabled   />
            <i class="fa-solid fa-minus" name="${item.id}" onclick="decreaseAmount(${index})"  id="minus"></i>
          </span>
        </p>
        `;
  });

  listProduct.innerHTML = "";
  for (let i = 0; i < y.length; i++) {
    listProduct.innerHTML += y[i];
  }

  badgeCart.innerHTML = setOrderSpecial.length;
}
drawSetOrderSpecial(setOrder);
// ***********************************************************************

let iconPlus = document.querySelectorAll("#icon-plus");
let iconMinus = document.querySelectorAll("#icon-minus");
let inputChange = document.querySelectorAll(".count-from-product");

function increaseAmount(index) {
  if (seBtnBasic.length !== dataProducts.length)
    alert("you can't do any change here");
  else {
    setOrder[index].amount += 1;

    if (seBtnBasic[index] === undefined) alert("you can't do any change here");

    localStorage.setItem("setOrder", JSON.stringify(setOrder));
    listProduct.innerHTML = "";
    drawSetOrderSpecial(setOrder);
  }
}

function decreaseAmount(index) {
  if (setOrder[index].amount > 1) setOrder[index].amount -= 1;
  else {
    filter();
    seBtnBasic = document.querySelectorAll(".btn-act button");

    let indexthis = dataProducts.findIndex(
      (item) => item.id == setOrder[index].id
    );

    if (seBtnBasic.length !== dataProducts.length)
      alert("you can't do any change here");
    else {
      seBtnBasic[indexthis].style.backgroundColor = "#0d6efd";
      seBtnBasic[indexthis].innerHTML = "add to cart";
      seBtnBasic[indexthis].style.border = "1px solid #0d6efd";

      setOrder = removeFromSet(index, setOrder);
    }
    // drawSetOrderSpecial(setOrder);
  }

  if (setOrder.length == 0) {
    padProduct.style.display = "none";
    arrowDown.style.display = "block";
    arrowUp.style.display = "none";
  }

  localStorage.setItem("setOrder", JSON.stringify(setOrder));

  listProduct.innerHTML = "";
  drawSetOrderSpecial(setOrder);
}

// ***********************************************************************

let cartIcon = document.querySelector(".cart-product");
let padProduct = document.querySelector(".box-product");
let arrowUp = document.querySelector("#arrow-up");
let arrowDown = document.querySelector("#arrow-down");

cartIcon.addEventListener("click", () => {
  if (listProduct.innerHTML === "") {
    alert("You not buy any thing until now !!");
  } else {
    if (padProduct.style.display === "block") {
      padProduct.style.display = "none";
      arrowDown.style.display = "block";
      arrowUp.style.display = "none";
    } else if (cartIcon.getAttribute("disable") === "") {
      alert("You can't see product via search");
    } else {
      padProduct.style.display = "block";
      arrowDown.style.display = "none";
      arrowUp.style.display = "block";
    }
  }
});

// ***********************************************************************
function animationBtn(setBtn, index, setView) {
  let indexRequire = setOrder.findIndex((item) => setView[index].id == item.id);
  if (indexRequire != -1) {
    setBtn[index].style.backgroundColor = "red";
    setBtn[index].innerHTML = "remove from cart";
    setBtn[index].style.border = "1px solid red";
  } else {
    setBtn[index].style.backgroundColor = "#0d6efd";
    setBtn[index].innerHTML = "add to cart";
    setBtn[index].style.border = "1px solid #0d6efd";
  }
}

function animationHeartIcon(setHeartIcon, index, setView) {
  let indexRequire = setFavourite.findIndex(
    (item) => item.id === setView[index].id
  );
  if (indexRequire != -1) {
    setHeartIcon[index].style.color = "red";
  } else {
    setHeartIcon[index].style.color = "dimgray";
  }
}

// ***********************************************************************

function AddToCart(index, set) {
  if (checkExistAccount()) addToSetOrder(index, set);
}
function AddToFav(index, set) {
  if (checkExistAccount()) addToSetFavourite(index, set);
}

function addToSetOrder(index, setView) {
  let itemFoundByIndex = setOrder.findIndex(
    (item) => item.id == setView[index].id
  );

  if (itemFoundByIndex == -1) {
    setOrder[setOrder.length] = setView[index];
  } else {
    setOrder = removeFromSet(itemFoundByIndex, setOrder);
    localStorage.setItem("setOrder", JSON.stringify(setOrder));

    listProduct.innerHTML = "";
    if (setOrder.length == 0) {
      padProduct.style.display = "none";
      arrowDown.style.display = "block";
      arrowUp.style.display = "none";
    }
    drawSetOrderSpecial(setOrder);
  }
  localStorage.setItem("setOrder", JSON.stringify(setOrder));
  drawSetOrderSpecial(setOrder);
  animationBtn(seBtnBasic, index, setView);
}

function addToSetFavourite(index, setView) {
  let itemFoundByIndex = setFavourite.findIndex(
    (item) => item.id == setView[index].id
  );

  if (itemFoundByIndex == -1) {
    setFavourite[setFavourite.length] = setView[index];
  } else {
    setFavourite = removeFromSet(itemFoundByIndex, setFavourite);
    localStorage.setItem("setFavourite", JSON.stringify(setFavourite));

    listProduct.innerHTML = "";
    if (setFavourite.length == 0) {
      padProduct.style.display = "none";
      arrowDown.style.display = "block";
      arrowUp.style.display = "none";
    }
  }
  localStorage.setItem("setFavourite", JSON.stringify(setFavourite));
  animationHeartIcon(setheartIconBasic, index, setView);
}

function removeFromSet(index, set) {
  let newSet = [];
  let counter = 0;

  for (let i = 0; i < set.length; i++) {
    if (i != index) newSet[counter++] = set[i];
  }

  return newSet;
}

function animationPreview(setBtn, setIcon, setView) {
  setView.forEach((item, index) => {
    if (
      localStorage.getItem("setOrder") !== null &&
      localStorage.getItem("setOrder") !== ""
    ) {
      animationBtn(setBtn, index, setView);
    }
    if (
      localStorage.getItem("setFavourite") !== null &&
      localStorage.getItem("setFavourite") !== ""
    )
      animationHeartIcon(setIcon, index, setView);
  });
}

seBtnBasic = document.querySelectorAll(".btn-act button");
setheartIconBasic = document.querySelectorAll("#heart-icon");
animationPreview(seBtnBasic, setheartIconBasic, dataProducts);

// ***********************************************************************

function filterByType(elementSearch, setSearch, typeSearch) {
  let setResault;
  if (typeSearch == "name")
    setResault = setSearch.filter(
      (item) =>
        item.name.toLowerCase().indexOf(elementSearch.toLowerCase()) !== -1
    );
  else
    setResault = setSearch.filter(
      (item) =>
        item.category.toLowerCase().indexOf(elementSearch.toLowerCase()) !== -1
    );

  containerProducts.innerHTML = "";
  drawSetProductsSpecial(setResault);

  seBtnBasic = document.querySelectorAll(".btn-act button");
  setheartIconBasic = document.querySelectorAll("#heart-icon");
  animationPreview(seBtnBasic, setheartIconBasic, setResault);
}

let inputSearch = document.getElementById("inputSearch");
let inputSearchPrevious;
let containerSelectes;
let typeSearch = "name";
let typeSearchPreviouse;
let counter = false;

let cartBoxProduct = document.querySelector("#user-info > li:first-child");

function filter() {
  containerSelectes = document.getElementById("searchType");

  if (containerSelectes.selectedIndex === 0) {
    inputSearch.setAttribute("disabled", "");
    typeSearchPreviouse = "";
  }

  if (inputSearch.value.trim() != "") {
    if (
      inputSearchPrevious.trim() != inputSearch.value.trim() ||
      typeSearchPreviouse != typeSearch
    ) {
      cartBoxProduct.setAttribute("disabled", "");
      filterByType(inputSearch.value, dataProducts, typeSearch);
      counter = true;
    }
    typeSearchPreviouse = typeSearch;
  }

  if (inputSearch.value.trim() == "" && counter) {
    counter = false;
    containerProducts.innerHTML = "";
    drawSetProductsSpecial(dataProducts);

    seBtnBasic = document.querySelectorAll(".btn-act button");
    setheartIconBasic = document.querySelectorAll("#heart-icon");
    animationPreview(seBtnBasic, setheartIconBasic, dataProducts);
  }

  if (containerSelectes.selectedIndex === 1) {
    cartBoxProduct.setAttribute("enable", "");
    inputSearch.removeAttribute("disabled");
    typeSearch = "name";
  } else if (containerSelectes.selectedIndex === 2) {
    inputSearch.removeAttribute("disabled");
    typeSearch = "category";
  }

  inputSearchPrevious = inputSearch.value;
}

setInterval(filter, 0.5);
