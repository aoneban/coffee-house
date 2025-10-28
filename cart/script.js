import { data } from '../static/data.js';

function quantityShow() {
  const counter = document.querySelector('.quantity');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  counter.textContent = cart.length;
}
quantityShow();

function generateProducts() {
  const local = localStorage.getItem('accessToken');
  const wrapper = document.querySelector('.cart-wrapper');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  data.forEach((element) => {
    for (let item of cart) {
      if (element.id === item.id) {
        const cart = document.createElement('div');
        cart.classList.add('cart');
        cart.setAttribute('data-id', item.unId);

        const content = document.createElement('div');
        content.classList.add('content');

        const trashImg = document.createElement('img');
        trashImg.src = '../assets/images/trash.png';

        const buttonTrash = document.createElement('button');
        buttonTrash.addEventListener('click', () => deleteOrder(event));
        buttonTrash.classList.add('button-trash');
        buttonTrash.append(trashImg);

        const productName = document.createElement('h4');
        productName.textContent = element.name;

        const img = document.createElement('img');
        img.classList.add('cart-img');
        img.src = element.image;

        const additional = document.createElement('p');
        additional.classList.add('additional');
        additional.textContent = item.values;

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = item.totalPrice;

        const discountPrice = document.createElement('p');
        discountPrice.classList.add('discount-price');
        discountPrice.textContent = discountFunction(item.totalPrice);

        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');

        content.append(buttonTrash, img, titleWrapper);

        titleWrapper.append(productName, additional);

        cart.append(content, price);
        wrapper.append(cart);
      }
    }
  });
  const totalPriceWrapper = document.createElement('div');
  totalPriceWrapper.classList.add('total-wrapper');

  const total = document.createElement('p');
  total.style.marginLeft = '50px';
  total.textContent = 'Total:';

  const totalPrice = document.createElement('p');
  totalPrice.classList.add('total-price');
  totalPrice.textContent = '$15.25';

  totalPriceWrapper.append(total, totalPrice);
  wrapper.append(totalPriceWrapper);

  generateIfNotToLogin(local, wrapper);
  totalPriceToPay();
}

generateProducts();

function discountFunction(price) {
  const newPrice = price.slice(1);
  return `$${(Number(newPrice) * 0.95).toFixed(2)}`;
}

function deleteOrder(event) {
  const elementToDelete = event.currentTarget.parentElement.parentElement;
  const idElementToDelete = elementToDelete.dataset.id;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let newCart = cart.filter(
    (element) => element.unId !== Number(idElementToDelete)
  );
  localStorage.setItem('cart', JSON.stringify(newCart));
  elementToDelete.remove();
  quantityShow();
  totalPriceToPay();
}

function totalPriceToPay() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const price = document.querySelector('.total-price');

  const totalQuantity = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice.slice(1)),
    0
  );
  price.textContent = `$${totalQuantity.toFixed(2)}`;
}

function generateIfNotToLogin(local, wrapper) {
  if (!local) {
    const loginWrap = document.createElement('div');
    loginWrap.classList.add('login-wrapper');

    const signButton = document.createElement('button');
    signButton.textContent = 'Sign in';
    signButton.addEventListener('click', () => {
      window.location.href = '../login/index.html';
    });

    const registerButton = document.createElement('button');
    registerButton.textContent = 'Registration';
    registerButton.addEventListener('click', () => {
      window.location.href = '../registration/index.html';
    });

    loginWrap.append(signButton, registerButton);
    wrapper.append(loginWrap);
  }
}
