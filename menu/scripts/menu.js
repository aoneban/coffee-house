import { data } from "../../static/data.js";
import { func } from "./modal.js";

//////   start switching product categories /////////

const generateProductCards = (data) => {
  const wrapper = document.querySelector('.product-list');
  data.forEach((el) => {
    const product = document.createElement('div');
    product.classList.add('product-wrapper');
    product.addEventListener('click', func)
    product.setAttribute('id', el.id);
    if (data.length > 4) {
      product.classList.add('hidden-class');
      document.querySelector('.reload-product').style.display = 'block';
    } else if (data.length <= 4) {
      document.querySelector('.reload-product').style.display = 'none';
    }
    product.innerHTML = `
      <span class="product-wrapper__image">
          <img src="${el.image}" alt="${el.image}" class="product-wrapper__img">
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

window.addEventListener('resize', () => {
  const windowWidth = window.innerWidth;
  const item = document.querySelectorAll('.product-list .product-wrapper')
  if (windowWidth < 769 && item.length > 4) {
    item.forEach(el => el.classList.add('hidden-class'))
    document.querySelector('.reload-product').style.display = 'block';
  } else {
    // document.querySelector('.reload-product').style.display = 'none';
  }
})

const reload = document.querySelector('.reload-product')
reload.addEventListener('click', () => {
  const s = document.querySelectorAll('.product-list .product-wrapper')
  s.forEach(el => el.classList.remove('hidden-class'))
  reload.style.display = 'none';
})

//////   end switching product categories /////////