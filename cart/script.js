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
        for(let item of cart) {
            if(element.id === item.id) {
              const cart = document.createElement('div');
              cart.classList.add('cart')
              cart.setAttribute("data-id", item.unId);

                const trashImg = document.createElement('img');
                trashImg.src = '../assets/images/trash.png';

                const productName = document.createElement('h4');
                productName.textContent = element.name;

                const img = document.createElement('img');
                img.classList.add('cart-img')
                img.src = element.image;

                const additional = document.createElement('p');
                additional.classList.add('additional')
                additional.textContent = item.values;

                const price = document.createElement('p');
                price.classList.add('price')
                price.textContent = item.totalPrice;

                const discountPrice = document.createElement('p');
                discountPrice.classList.add('discount-price')
                discountPrice.textContent = discountFunction(item.totalPrice);

                const titleWrapper = document.createElement('div');
                titleWrapper.classList.add('title-wrapper');

                titleWrapper.append(productName, additional)
                
                cart.append(trashImg, img, titleWrapper, price)
                wrapper.append(cart)
            }
        }
    })
    const totalPriceWrapper = document.createElement('div');
    totalPriceWrapper.classList.add('login-wrapper')
}

generateProducts()

function discountFunction(price) {
const newPrice = price.slice(1);
  return `$${(Number(newPrice) * 0.95).toFixed(2)}`
}