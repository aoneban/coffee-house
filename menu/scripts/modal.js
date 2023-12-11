import { data } from '../../static/data.js';

const modal = document.querySelector('.modal')

export function modalWindowGenerator(event) {
  document.body.style.position = 'fixed';
  const currentClickProduct = event.currentTarget;
  const exampleAttr = currentClickProduct.getAttribute('id');
  const result = data.filter((el) => el.id == exampleAttr);
  modal.setAttribute('id', 'myModal');
  modal.style.display = 'flex';
  modal.addEventListener('click', function(event) {
    deleteWrap(event);
  })
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
              <input type="button" class="btn-size" onclick="alert('Hello World!')" value="200 ml">
              <span class="size-inside">S</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-size" onclick="alert('Hello World!')" value="300 ml">
              <span class="size-inside">M</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-size" onclick="alert('Hello World!')" value="400 ml">
              <span class="size-inside">L</span>
          </div>
      </div>
      <p class="additives">Additives</p>
      <div class="buttons-add">
          <div class="button-container">
              <input type="button" class="btn-size" onclick="alert('Hello World!')" value="Sugar">
              <span class="size-inside">1</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-size" onclick="alert('Hello World!')" value="Cinnamon">
              <span class="size-inside">2</span>
          </div>
          <div class="button-container">
              <input type="button" class="btn-size" onclick="alert('Hello World!')" value="Syrup">
              <span class="size-inside">3</span>
          </div>
      </div>
      <div class="modal-price-wrap">
          <p>Total:</p>
          <p>$7.00</p>
      </div>
      <p class="empty"><img src="../assets/images/info-empty.png" alt="img-empty" class="img-empty">&nbsp;&nbsp;&nbsp;&nbsp;The cost is not final. Download our mobile app to see the final price and place your order.
           Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
      </p>
      <button type="button" class="close-button">Close</button>
  </div>
  `
  console.log(result);

  modal.append(modalWrapper);
  document.body.append(modal);
}

function deleteWrap(event) {
  if (event.target == modal) {
    const modalWrap = document.querySelector('.modal-wrapper');
    document.querySelector('.modal').style.display = 'none';
    document.body.style.position = '';
    modalWrap.remove()
  }
}