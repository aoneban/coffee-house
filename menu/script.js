import { data } from '../static/data.js';

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

//////   end burger menu /////////

//////   start switching product categories /////////

const generateProductCards = (data) => {
  const wrapper = document.querySelector('.product-list');
  data.forEach((el) => {
    const product = document.createElement('div');
    product.classList.add('product-wrapper');
    product.innerHTML = `
      <span class="product-wrapper__image">
          <img src="${el.image}" class="product-wrapper__img">
      </span>
      <h3 class="product-wrapper__title">${el.name}</h3>
      <p class="product-wrapper__text">${el.description}</p>
      <p class="product-wrapper__price">${el.price}</p>
    `;
    wrapper.append(product);
  });
};

const coffee = data.filter(el => el.category === 'coffee');
generateProductCards(coffee);

const handleRadioChange = (event) => {
  const productsForRemove = document.querySelectorAll('.product-wrapper')
  productsForRemove.forEach(element => element.remove())
  if (event.target.checked) {
    const value = event.target.value;
    const newData = data.filter((element) => {
      if (element.category === value) {
        return element
      }
    })
    generateProductCards(newData)
  }
}

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radio) => {
  radio.addEventListener('change', handleRadioChange);
});

//////   end switching product categories /////////
