import { dataSlider } from '../../static/dataSlider.js';

const wrapperSlider = document.querySelector('.slider-line');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

dataSlider.forEach((element) => {
  const slider = document.createElement('div');
  slider.classList.add('slider-base');
  slider.innerHTML = `
          <img src="${element.image}" alt="coffee" class="coffee-slider">
          <h4>${element.name}</h4>
          <p class="favorites__text">${element.description}</p>
          <p class="favorites__price">${element.price}</p>
  `;
  wrapperSlider.append(slider);
});

(function(){
  let count = 0;
  const slideWidth = 30; 
  const maxCount = slideWidth * 2; 

  const sliderMoveToLeft = () => {
      count += slideWidth;
      if (count > maxCount) {
        count = 0;
      }
      wrapperSlider.style.transform = `translateX(-${count}em)`;
  }

  const sliderMoveToRight = () => {
    count -= slideWidth;
    if (count < 0) {
      count = maxCount;
    }
    wrapperSlider.style.transform = `translateX(-${count}em)`;
}
  
  arrowRight.addEventListener('click', sliderMoveToLeft);
  arrowLeft.addEventListener('click', sliderMoveToRight);
})()
