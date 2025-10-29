import { data } from '../static/data.js';

function quantityShow() {
  const counter = document.querySelector('.quantity');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  counter.textContent = cart.length;
}
quantityShow();

function getAddress() {
  const userAddress = localStorage.getItem('userData');
  const address = JSON.parse(userAddress);
  const place = address.city;
  const capitalizedPlace = place.charAt(0).toUpperCase() + place.slice(1);
  const street = address.street;
  const capitalizedStreet = street.charAt(0).toUpperCase() + street.slice(1);
  const house = address.houseNumber;
  return `${capitalizedPlace}, ${capitalizedStreet}, ${house}`;
}

function getPayment() {
  const userAddress = localStorage.getItem('userData');
  const address = JSON.parse(userAddress);
  const payment = address.paymentMethod;
  return payment;
}

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

        const priceWrap = document.createElement('div');
        priceWrap.classList.add('price-wrap');

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

        const newPrice = document.createElement('p');
        newPrice.classList.add('new-price');
        newPrice.textContent = discountFunction(item.totalPrice);

        const titleWrapper = document.createElement('div');
        titleWrapper.classList.add('title-wrapper');

        content.append(buttonTrash, img, titleWrapper);

        if (local) {
          priceWrap.append(price, newPrice);
          price.classList.add('discount-color');
        } else {
          priceWrap.append(price);
        }

        titleWrapper.append(productName, additional);

        cart.append(content, priceWrap);
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
  totalPrice.textContent = '$0';

  const totalDiscountPrice = document.createElement('p');
  totalDiscountPrice.classList.add('total-discount');
  totalDiscountPrice.textContent = '%';

  if (local) {
    totalPriceWrapper.append(total, totalPrice, totalDiscountPrice);
  } else {
    totalPriceWrapper.append(total, totalPrice);
  }

  wrapper.append(totalPriceWrapper);

  if (local) {
    totalPrice.classList.add('total-discount_price');
    const totalPriceWrapper = document.createElement('div');
    totalPriceWrapper.classList.add('total-wrapper');

    const totalPriceWrapper2 = document.createElement('div');
    totalPriceWrapper2.classList.add('total-wrapper');

    const addressQ = document.createElement('p');
    addressQ.style.marginLeft = '50px';
    addressQ.textContent = 'Address:';

    const addressA = document.createElement('p');
    addressA.classList.add('total-price');
    addressA.textContent = getAddress();

    const pay = document.createElement('p');
    pay.style.marginLeft = '50px';
    pay.textContent = 'Pay by:';

    const forPay = document.createElement('p');
    forPay.classList.add('total-price');
    forPay.textContent = getPayment();

    const successConfirmOrder = document.createElement('p');
    successConfirmOrder.classList.add('message');
    successConfirmOrder.textContent =
      'Thank you for your order! Our manager will contact you shortly.';

    const confirmButton = document.createElement('button');
    confirmButton.addEventListener('click', () => cleanCart(successConfirmOrder));
    confirmButton.classList.add('confirm');
    confirmButton.textContent = 'Confirm';

    totalPriceWrapper.append(addressQ, addressA);
    totalPriceWrapper2.append(pay, forPay);
    wrapper.append(
      totalPriceWrapper,
      totalPriceWrapper2,
      successConfirmOrder,
      confirmButton
    );
  }

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
  const discount = document.querySelector('.total-discount');

  const totalQuantity = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice.slice(1)),
    0
  );
  price.textContent = `$${totalQuantity.toFixed(2)}`;
  discount.textContent = `$${(totalQuantity * 0.95).toFixed(2)}`;
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

function cleanCart(successConfirmOrder) {
  const carts = document.querySelectorAll('.cart');
  carts.forEach((element) => element.remove());
  localStorage.removeItem('cart');
  successConfirmOrder.classList.remove('message');
  quantityShow();
  totalPriceToPay();
}
