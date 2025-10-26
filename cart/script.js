import { data } from '../static/data.js';

function quantityShow() {
  let totalProductsInCart = 0
  const counter = document.querySelector('.quantity')
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  for(let count of cart) {
    totalProductsInCart += count.quantity;
  }
  console.log(totalProductsInCart)
  counter.textContent = totalProductsInCart;
}
quantityShow()

function generateProducts() {
    const wrapper = document.querySelector('.cart-wrapper')
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    data.forEach(element => {
        for(let count of cart) {
            if(element.id === count.id) {
                const productName = document.createElement('h4');
                productName.textContent = element.name;

                const img = document.createElement('img');
                img.src = element.image;

                const quantity = document.createElement('p');
                quantity.textContent = count.quantity

                wrapper.append(productName, img, quantity)
            }
        }
    })
}

generateProducts()