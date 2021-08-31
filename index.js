let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Product1",
    tag: "product1",
    price: 15, 
    inCart: 0
  },
  {
  name: "Product2",
  tag: "product2",
  price: 20, 
  inCart: 0
  },
  {
  name: "Product3",
  tag: "product3",
  price: 27, 
  inCart: 0
  },
  {
  name: "Product4",
  tag: "product4",
  price: 15, 
  inCart: 0
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLordCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {

  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems (product);
}

function setItems (product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("My cart is", cartItems);

  if(cartItems != null) {
    if(cartItems[product.tag] == undefined) {
      cartItems = {
      ...cartItems,
      [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
    [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

//カート表示
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  //ローカルストレージ入っているものを取り出すときは必ずJSONにする
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");
  if(cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      
    <div class="product">
      <div class="item-product">
        <ion-icon name="close-circle"></ion-icon>
        <img src="img/${item.tag}.jpg" class="cartImg">
        <span class="item-name">${item.name}</span>
      </div>  
      <div class="price">$${item.price}</div>
      <div class="quantity">
        <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
      </div>
      <div>$${item.inCart * item.price}</div>
    </div>
      
      `
    });
  } else {

  }
}


onLordCartNumbers();
displayCart()