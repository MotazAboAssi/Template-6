let setOrder = [...JSON.parse(localStorage.getItem("setOrder"))];
let setFavourite =
  localStorage.getItem("setFavourite") == null ||
  localStorage.getItem("setFavourite") == ""
    ? []
    : [...JSON.parse(localStorage.getItem("setFavourite"))];
let totalprice = 0;
let totalPriceShow = document.querySelector(".price-all");
let containerProductRequire = document.getElementById("products-requirement");
let containerProductFavourite = document.querySelector(".swiper-wrapper");

function drawSetOrder(setRequirement) {
  totalPriceShow.innerHTML = "";
  if (setRequirement.length == 0)
    containerProductRequire.innerHTML = `<img src = "images/404.jpg" alt = "404" class="w-25 m-auto" />`;
  let totalpriceCurrent = 0;
  let products = setRequirement.map((item, index) => {
    totalpriceCurrent += item.price * item.amount;
    return `
        
      <div class="product-item">
        <img src="${item.URLimg}" alt="">
        <div class="">
            <li>Product : ${item.name}</li>
            <li>Category : ${item.category}</li>
            <li>Price : ${item.price} $</li>
            <li id="count-product">
              <span class="icons-change">
                  <i class="fa-solid fa-plus text-success" onClick = "increase(${index})" id="icon-plus"></i>
                  <input type="text" id="count-from-product" class = "mx-1" maxlength="2" value="${item.amount}" disabled />
                  <i class="fa-solid fa-minus text-danger" onClick = "deincrease(${index})" id="icon-minus"></i>
              </span>
              <button onClick =" removeProductFromAdd(${index}) ">remove</button>
            </li>
        </div>
      </div>                
          `;
  });

  for (let i = 0; i < setRequirement.length; i++) {
    containerProductRequire.innerHTML += products[i];
  }
  totalPriceShow.innerHTML = totalpriceCurrent;
}
drawSetOrder(setOrder);
// **************************************************************************
// **************************************************************************
function increase(index, price) {
  setOrder[index].amount += 1;
  localStorage.setItem("setOrder", JSON.stringify(setOrder));
  containerProductRequire.innerHTML = " ";
  drawSetOrder(setOrder);

  //   totalPriceShow.innerHTML = totalpriceCurrent + price;
}
function deincrease(index) {
  let boxViewPrice = document.querySelectorAll("#count-from-product");
  if (boxViewPrice[index].value > 1) {
    setOrder[index].amount -= 1;
    localStorage.setItem("setOrder", JSON.stringify(setOrder));
    containerProductRequire.innerHTML = " ";
    drawSetOrder(setOrder);
  } else {
    console.log("here");
    setOrder[index].amount = 1;
    setOrder = removeElement(index, setOrder);
    localStorage.setItem("setOrder", JSON.stringify(setOrder));

    containerProductRequire.innerHTML = "";
    drawSetOrder(setOrder);
  }
}
function removeProductFromAdd(index) {
  setOrder = removeElement(index, setOrder);
  localStorage.setItem("setOrder", JSON.stringify(setOrder));

  containerProductRequire.innerHTML = "";
  drawSetOrder(setOrder);
}

function removeElement(indexRequire, setRequire) {
  let newSet = [];
  let counter = 0;
  for (let i = 0; i < setRequire.length; i++)
    if (i != indexRequire) newSet[counter++] = setRequire[i];

  return newSet;
}

// **************************************************************************
// **************************************************************************

function drawSetFavourite(setRequirement) {
  if (setRequirement.length != 0) {
    let products = setRequirement.map((item, index) => {
      return `
    
    <div class="swiper-slide">
        <img src="${item.URLimg}" alt="">
        <div id="prod-info">
        <ul class="pro-name-category">
            <li title = "${item.name}">Product : ${item.name.slice(0, item.name.length - 10)}...</li>
                <li title = "${item.category}">Category : ${item.category.slice(
                  0,
                  item.category.length - 10
                )}...</li>
            </ul>
            <i class="fa-solid fa-heart" onClick = "removeProductFavourite(${index})" id="heart-icon"></i>
        </div>
    </div>

    `;
    });

    for (let i = 0; i < setRequirement.length; i++) {
      containerProductFavourite.innerHTML += products[i];
    }
  } else
    containerProductFavourite.innerHTML = `<img src="./images/403.png" alt="you don't Choice" class="w-50 m-auto" />`;
}
// console.log(setFavourite)
drawSetFavourite(setFavourite);

function removeProductFavourite(index) {
  setFavourite = removeElement(index, setFavourite);
  localStorage.setItem("setFavourite", JSON.stringify(setFavourite));

  location.reload();
}
