let setFavourite = [];

let ipnutSearch = document.querySelector("#inputSearch");
ipnutSearch.value = "";
let nameproducts;

let previeusSearch = ipnutSearch.value;
setInterval(() => {
  if (previeusSearch !== ipnutSearch.value) {
    if (ipnutSearch.value.trim() != "") {
      boxProducts.innerHTML = "";
      let setRequirement = dataProducts.filter((item) => {
        return (
          item.name
            .toLocaleLowerCase()
            .indexOf(ipnutSearch.value.trim().toLocaleLowerCase()) != -1
        );
      });
      boxProducts.innerHTML = "";
      drawProduct(setRequirement);
    } else {
      boxProducts.innerHTML = "";
      drawProduct(dataProducts);

      checkSetOrderAfterReload();
      checkSetFavouriteAfterReload();
      // location.reload();
    }
  }
  previeusSearch = ipnutSearch.value;
  drawProduct(setRequirement);
  checkSetOrderAfterReload();
  checkSetFavouriteAfterReload();
  // location.reload();
}, 100);
// ***********************************************************************

// ///////////////////////////////////////////////

// view panel product when press on cart icon
let cartIcon = document.querySelector(".cart-product");
let padProduct = document.querySelector(".box-product");
let arrowUp = document.querySelector("#arrow-up");
let arrowDown = document.querySelector("#arrow-down");
let listProduct = document.querySelectorAll(".box-product > div");

cartIcon.addEventListener("click", () => {
  if (listProduct.innerHTML == "") {
    alert("You not buy any thing until now !!");
  } else if (padProduct.style.display == "block") {
    padProduct.style.display = "none";

    arrowDown.style.display = "block";
    arrowUp.style.display = "none";
  } else {
    padProduct.style.display = "block";

    arrowDown.style.display = "none";
    arrowUp.style.display = "block";
  }
});

let badgeCart = document.querySelector(".badge-cart");

let setOrder;
if (
  localStorage.getItem("setOrder") == null &&
  localStorage.getItem("setFavourite") == null
) {
  localStorage.setItem("setOrder", "");
  localStorage.setItem("setFavourite", "");
} else if (localStorage.getItem("setOrder") != "") {
  setOrder = JSON.parse(localStorage.getItem("setOrder"));
  drawSetOrder();
} else setOrder = [];

function AddToCart(id) {
  if (
    localStorage.getItem("username") == null ||
    localStorage.getItem("username") == ""
  ) {
    alert("You haven't account !!!");
    window.location.assign("login.html");
  } else {
    let indexRequire;
    let chooseIndex = dataProducts.find((item) => {
      return item.id == id;
    });
    if (setOrder.length === 0) {
      setOrder = [chooseIndex];
      localStorage.setItem("setOrder", JSON.stringify(setOrder));
      drawSetOrder();
    } else {
      indexRequire = setOrder.findIndex((item) => {
        return item.id == chooseIndex.id;
      });
      if (indexRequire == -1) {
        setOrder = [
          ...JSON.parse(localStorage.getItem("setOrder")),
          chooseIndex,
        ];
        localStorage.setItem("setOrder", JSON.stringify(setOrder));

        drawSetOrder();
      } else {
        let setNewOrder = [];
        let count = 0;
        for (let i = 0; i < setOrder.length; i++)
          if (i != indexRequire) {
            setNewOrder[count++] = setOrder[i];
          }
        setOrder = setNewOrder;
        localStorage.setItem("setOrder", JSON.stringify(setOrder));
        drawSetOrder();
      }
    }
  }
}

function checkSetOrderAfterReload() {
  let y = [];
  let set = JSON.parse(localStorage.getItem("setOrder"));
  y = set.map((item) => {
    return dataProducts.findIndex((pro) => {
      return pro.id == item.id;
    });
  });
  y.map((item) => {
    btnAct.forEach((btnItem, btnIndex) => {
      console.log("هووووووووون");
      if (item == btnIndex) {
        btnItem.style.backgroundColor = "red";
        btnItem.innerHTML = "remove from cart";
        btnItem.style.border = "1px solid red";
      }
    });
  });
}
if (
  localStorage.getItem("setOrder") != "" &&
  localStorage.getItem("setOrder") != "[]"
)
  checkSetOrderAfterReload();

// ///////////////////////////////////////////////////////////

function checkSetFavouriteAfterReload() {
  let y = [];
  let count = 0;
  setFavourite = localStorage.getItem("setFavourite");
  let set = [];
  for (let i = 0; i < setFavourite.length; i++)
    if (setFavourite[i] != ",") {
      set[count++] = Number(setFavourite[i]);
    }
  y = set.map((item) => {
    return dataProducts.find((pro, index) => {
      return item == index;
    });
  });
  set.map((item) => {
    heartIcon.forEach((iconItem, iconIndex) => {
      if (item === iconIndex) {
        iconItem.style.color = "red";
      }
    });
  });
}
if (
  localStorage.getItem("setFavourite") != "" &&
  localStorage.getItem("setFavourite") != "[]"
) {
  checkSetFavouriteAfterReload();
}

let linkPageFoeViewProduct = document.querySelector(".box-product > a");
linkPageFoeViewProduct.addEventListener("click", () => {
  setFavourite = dataProducts.filter((item) => {
    return item.favorite == true;
  });
  localStorage.setItem("setFavourite", JSON.stringify(setFavourite));
});

// ******************** icon minus and plus **********************
let iconPlus = document.querySelectorAll("#icon-plus");
let iconMinus = document.querySelectorAll("#icon-minus");
let inputChange = document.querySelectorAll(".count-from-product");

function calcAmount(op, indexBtn) {
  if (op == "+") {
    inputChange[indexBtn].removeAttribute("value");
    inputChange[indexBtn].setAttribute("value", ++setOrder[indexBtn].amount);
    drawSetOrder();
  } else {
    if (setOrder[indexBtn].amount == 1) {
      let newSet = [],
        count = 0;
      for (let i = 0; i < setOrder.length; i++)
        if (i != indexBtn) newSet[count++] = setOrder[i];
      setOrder = newSet;
      localStorage.setItem("setOrder", JSON.stringify(setOrder));
      checkSetOrderAfterReload();
      drawSetOrder();
    } else {
      inputChange[indexBtn].removeAttribute("value");
      inputChange[indexBtn].setAttribute("value", --setOrder[indexBtn].amount);
    }
  }
}

// iconPlus.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     if (inputChange[index].value <= 98)
//       inputChange[index].value = ++setOrder[index].amount;
//     localStorage.setItem("setOrder", JSON.stringify(setOrder));
//   });
// });
// iconMinus.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     if (inputChange[index].value == 1) {
//       AddToCart(setOrder[index].id);
//       // location.reload();
//       // drawSetOrder();
//     } else {
//       inputChange[index].value = --setOrder[index].amount;
//       // localStorage.setItem("setOrder", JSON.stringify(setOrder));
//       // drawSetOrder();
//     }
//   });
// });

function drawSetOrder() {
  let y = setOrder.map((item, index) => {
    return `
    <p>
    <span>${item.name}</span>
    <span class="icons-change">
            <i class="fa-solid fa-plus" onclick="increase(${item.id}, ${index})" id="plus"></i>
            <input type="text" class="mx-1" maxlength="2" value="${item.amount}" id="count-from-product" disabled   />
            <i class="fa-solid fa-minus" onclick="deincrease(${item.id}, ${index})"  id="minus"></i>
            </span>
            </p>
            `;
  });

  if (setOrder.length === 0) {
    padProduct.style.display = "none";

    arrowDown.style.display = "block";
    arrowUp.style.display = "none";
  }

  listProduct.innerHTML = "";
  listProduct.innerHTML = y;
  badgeCart.innerHTML = setOrder.length;
}

let countFromProduct = document.querySelectorAll("#count-from-product");

function increase(id, index) {
  let element = setOrder.find((item) => {
    return id == item.id;
  });
  countFromProduct[index].setAttribute("value", ++element.amount);
  drawSetOrder();
}
function deincrease(id, index) {
  let element = setOrder.find((item) => {
    return id == item.id;
  });
  if (element.amount != 1) {
    countFromProduct[index].setAttribute("value", --element.amount);
  } else {
    AddToCart(element.id);
    btnAct[index].style.backgroundColor = "#0d6efd";
    btnAct[index].innerHTML = "add to cart";
    btnAct[index].style.border = "1px solid #0d6efd";
  }
  drawSetOrder();
}
// setInterval(() => {
// },2000)
