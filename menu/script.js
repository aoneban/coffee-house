import { data } from '../static/data.js';

//////   start switching product categories /////////

const generateProductCards = (data) => {
  const wrapper = document.querySelector('.product-list');
  data.forEach((el) => {
    const product = document.createElement('div');
    product.classList.add('product-wrapper');
    product.addEventListener('click', modalWindowGenerator);
    product.setAttribute('id', el.id);
    if (data.length > 4) {
      product.classList.add('hidden-class');
      document.querySelector('.reload-product').style.display = 'block';
    } else if (data.length <= 4) {
      document.querySelector('.reload-product').style.display = 'none';
    }
    const wrapperProduct = document.createElement('span');
    wrapperProduct.classList.add('product-wrapper__image');

    const img = document.createElement('img');
    img.src = el.image;
    img.setAttribute('alt', el.image);
    img.classList.add('product-wrapper__img');

    wrapperProduct.append(img);

    const title = document.createElement('h3');
    title.classList.add('product-wrapper__title');
    title.textContent = el.name;

    const description = document.createElement('p');
    description.classList.add('product-wrapper__text');
    description.textContent = el.description;

    const price = document.createElement('p');
    price.classList.add('product-wrapper__price');
    price.textContent = `$${el.price}`;

    product.append(wrapperProduct, title, description, price)
    wrapper.append(product);
  });
};

const coffee = data.filter((el) => el.category === 'coffee');
generateProductCards(coffee); // initial rendering on the page

const handleRadioChange = (event) => {
  const productsForRemove = document.querySelectorAll('.product-wrapper');
  productsForRemove.forEach((element) => element.remove());
  if (event.target.checked) {
    const value = event.target.value;
    const newData = data.filter((element) => {
      if (element.category === value) {
        return element;
      }
    });
    generateProductCards(newData);
  }
};

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radio) => {
  radio.addEventListener('change', handleRadioChange);
});

const addProductsToResponsivePage = () => {
  const windowWidth = window.innerWidth;
  const item = document.querySelectorAll('.product-list .product-wrapper');
  if (windowWidth < 769 && item.length > 4) {
    item.forEach((el) => el.classList.add('hidden-class'));
    document.querySelector('.reload-product').style.display = 'block';
  }
};

window.addEventListener('resize', addProductsToResponsivePage);

const reloadElementToPage = () => {
  const reload = document.querySelector('.reload-product');
  reload.addEventListener('click', () => {
    const s = document.querySelectorAll('.product-list .product-wrapper');
    s.forEach((el) => el.classList.remove('hidden-class'));
    reload.style.display = 'none';
  });
}

reloadElementToPage();
//////   end switching product categories /////////

//////   start burger menu /////////

function changeBurger(item) {
    const slider = document.getElementById('mySidenav');
    slider.style.display = 'block';
    item.classList.toggle('change');
    slider.classList.toggle('slide-over');
    document.body.classList.toggle('hidden-screen');
  }
  
  function changeBurgerToLink(item) {
    const element = document.querySelector('.burger-wrapper');
    if (element.classList.contains('change')) {
      element.classList.remove('change');
    }
    changeBurger(item);
  }
  
  const closeBurger = () => {
    const windowInnerWidth = window.innerWidth;
    const wrapper = document.querySelector('.burger-wrapper');
    const slider = document.getElementById('mySidenav');
    if (windowInnerWidth > 768) {
      slider.classList.remove('slide-over');
      wrapper.classList.remove('change');
      document.body.classList.remove('hidden-screen');
    }
  };
  
  window.addEventListener('resize', closeBurger);
  
  //////  finish burger menu /////////

  /** start modal window */

  const modal = document.createElement('div');

function modalWindowGenerator(event) {
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
      <button type="button" class="close-button">Add to cart</button>
  </div>
  `;

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


/** finish modal window */