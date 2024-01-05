import { data } from '../../static/data.js';

const modal = document.createElement('div');

export function modalWindowGenerator(event) {
  setTimeout(calculationOptions, 0);
  document.body.style.position = 'fixed';
  const currentClickProduct = event.currentTarget;
  const exampleAttr = currentClickProduct.getAttribute('id');
  const result = data.filter((el) => el.id == exampleAttr);
  modal.setAttribute('id', 'myModal');
  modal.classList.add('modal');
  modal.style.display = 'flex';
  modal.addEventListener('click', function (event) {
    deleteWrap(event);
  });
  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal-wrapper');
  modalWrapper.innerHTML = `
  <div class="modal-content-left">
    <div class="modal-img-wrapper">
      <img src="${result[0].image}" class="modal-img">
    </div>
  </div>
  <div class="modal-content-right">
        <h3 class="title-h3">${result[0].name}</h3>
      <p class="modal-description">${result[0].description}</p>
      <p class="modal-size">Size</p>
      <div class="buttons-size">
          <div class="button-container">
              <input type="button" class="btn-size active-button" value="${result[0].sizes.s.size}" checked>
              <span class="size-inside">S</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-size" value="${result[0].sizes.m.size}">
              <span class="size-inside">M</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-size" value="${result[0].sizes.l.size}">
              <span class="size-inside">L</span>
          </div>
      </div>
      <p class="additives">Additives</p>
      <div class="buttons-add">
          <div class="button-container">
              <input type="button" class="btn-add" value="${result[0].additives[0].name}">
              <span class="size-inside">1</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-add" value="${result[0].additives[1].name}">
              <span class="size-inside">2</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-add" value="${result[0].additives[2].name}">
              <span class="size-inside">3</span>
          </div>
      </div>
      <div class="modal-price-wrap">
          <p>Total:</p>
          <p class="total-price">$${result[0].price}</p>
      </div>
      <p class="empty"><img src="../assets/images/info-empty.png" alt="img-empty" class="img-empty">&nbsp;&nbsp;&nbsp;&nbsp;The cost is not final. Download our mobile app to see the final price and place your order.
           Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
      </p>
      <button type="button" class="close-button">Close</button>
  </div>
  `;
  console.log(result);

  modal.append(modalWrapper);
  document.body.append(modal);
}

const deleteModal = () => {
  const modalWrap = document.querySelector('.modal-wrapper');
  document.querySelector('.modal').style.display = 'none';
  document.body.style.position = '';
  modalWrap.remove();
};

const deleteWrap = (event) => {
  if (event.target == modal) {
    deleteModal();
  }
};

const closeModal = () => {
  const close = document.querySelector('.close-button');
  close.addEventListener('click', () => {
    deleteModal();
  });
};

const calculationOptions = () => {
  const price = document.querySelector('.total-price');
  let basePrice = Number(price.innerText.replace('$', ''));
  let newPrice = Number(price.innerText.replace('$', ''));
  let addPrice = 0;
  const buttons = document.querySelectorAll('.btn-size');
  const buttonsAdd = document.querySelectorAll('.btn-add');
  buttons.forEach((el) =>
    el.addEventListener('click', (event) => {
      const buttons2 = document.querySelectorAll('.btn-size');
      buttons2.forEach((el) => el.classList.remove('active-button'));
      const current = event.currentTarget;
      current.classList.toggle('active-button');
       if (current.value == '300 ml' || current.value == '100 g') {
        newPrice = +basePrice + addPrice + 0.5;
        newPrice = newPrice.toFixed(2);
      } else if (current.value == '400 ml' || current.value == '200 g') {
        newPrice = +basePrice + addPrice + 1.0;
        newPrice = newPrice.toFixed(2);
      } else {
        newPrice = +basePrice + addPrice;
        newPrice = newPrice.toFixed(2);
      }
      price.innerHTML = `$${newPrice}`;
    })
  );
  buttonsAdd.forEach((el) =>
    el.addEventListener('click', (event) => {
      const currentAdd = event.currentTarget;
      currentAdd.classList.toggle('active-button');
      if (currentAdd.classList.contains('active-button')) {
        addPrice += 0.5;
        newPrice = +newPrice + 0.5;
        newPrice = newPrice.toFixed(2);
      } else {
        addPrice -= 0.5;
        newPrice = +newPrice - 0.5;
        newPrice = newPrice.toFixed(2);
      }
      price.innerHTML = `$${newPrice}`;
    })
  );
  closeModal();
};

