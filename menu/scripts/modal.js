import { data } from '../../static/data.js';

const product = document.querySelectorAll('.product-wrapper');
// export function fun(){
//   product.forEach((el) => {
//     el.addEventListener('click', );
//   });
// }

export function modalWindowGenerator(event) {  
  const currentClickProduct = event.currentTarget;
  const exampleAttr = currentClickProduct.getAttribute('id');
  const result = data.filter((el) => el.id == exampleAttr);
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', 'myModal');
  modal.style.display = 'block';
  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal-wrapper');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const modalImg = document.createElement('img');
  modalImg.classList.add('modal-content');
  
  modalImg.src = result[0].image;
  const h3 = document.createElement('h3');
  h3.classList.add('title-h3');
  h3.textContent = result[0].name;
  const text = document.createElement('p');
  text.classList.add('text-content');
  text.textContent =
    'Fragrant black coffee with Jameson Irish whiskey and whipped milk';
  const span = document.createElement('span');
  span.classList.add('close');
  span.innerHTML = '&times;';
  span.addEventListener('click', function() {
    const modal = document.getElementById('myModal');
    modal.remove();
  });
  const size = document.createElement('p');
  size.classList.add('size');
  size.textContent = 'Size'
  const sizeWrapper = document.createElement('div');
  sizeWrapper.classList.add('size-wrapper');
  const buttons = document.createElement('div');
  buttons.classList.add('buttons-wrapper')
  buttons.innerHTML = `
  <div class="product__tabs-modal">
      <input type="radio" id="S" name="options" value="S" checked >
      <label for="S" class="label-image">
        <span class="tabs__wrapper-modal">
        &nbsp;&nbsp;&nbsp;S
        </span>
        ${result[0].sizes.s.size}
      </label>
      <input type="radio" id="tea" name="options" value="tea" >
      <label for="tea" class="label-image">
        <span class="tabs__wrapper-modal">
        &nbsp;&nbsp;M
        </span>
        ${result[0].sizes.m.size}
      </label>
      <input type="radio" id="dessert" name="options" value="dessert" >
      <label for="dessert" class="label-image">
        <span class="tabs__wrapper-modal">
        &nbsp;&nbsp;&nbsp;L
        </span>
        ${result[0].sizes.l.size}
      </label>
    </div>
  `

  //console.log(result);


  sizeWrapper.append(buttons)
  modalContent.append(h3, text, size, sizeWrapper);
  modalWrapper.append(modalImg, modalContent);
  modal.append(modalWrapper, span);
  document.body.append(modal);


}
