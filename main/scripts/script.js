import { dataSlider } from '../../static/dataSlider.js';

const wrapperSlider = document.querySelector('.slider-line');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const slider = document.querySelector('.slider');

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

(function () {
  let startX;
  let startY;
  let count = 0;
  let borderCount = 0;
  const slideWidth = 30;
  const maxCount = slideWidth * 2;

  const sliderMoveToLeft = () => {
    borderCount = 0;
    count += slideWidth;
    if (count > maxCount) {
      count = 0;
    }
    wrapperSlider.style.transform = `translateX(-${count}em)`;
  };

  const sliderMoveToRight = () => {
    borderCount = 0;
    count -= slideWidth;
    if (count < 0) {
      count = maxCount;
    }
    wrapperSlider.style.transform = `translateX(-${count}em)`;
  };

  let intervalId;

  function pauseInterval() {
    clearInterval(intervalId);
  }

  slider.addEventListener('mouseover', function () {
    pauseInterval();
  });

  slider.addEventListener('mouseout', function () {
    startInterval();
  });

  slider.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });
  
  slider.addEventListener('touchmove', function(event) {
    if (!startX || !startY) {
      return;
    }
  
    let currentX = event.touches[0].clientX;
    let currentY = event.touches[0].clientY;
  
    let diffX = startX - currentX;
    let diffY = startY - currentY;
  
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        borderCount = 0;
        sliderMoveToLeft()
      } else {
        // Свайп вправ
        borderCount = 0;
        sliderMoveToRight()
      }
    }
  
    startX = null;
    startY = null;
  });

  const generateWith = () => {
    const border = document.getElementsByClassName('borders__one-in');
    let currentBorder;
    if (count == 0) {
      currentBorder = 0;
    } else if (count == 30) {
      currentBorder = 1;
    } else {
      currentBorder = 2;
    }
    for (let i = 0; i <= 2; i++) {
      border[i].style.display = 'none';
      border[i].style.width = 0;
    }
    border[currentBorder].style.display = 'block';
    border[currentBorder].style.width = borderCount + '%';
    if (borderCount == 100) {
      borderCount = 0;
      sliderMoveToLeft();
    }
    borderCount += 1;
  };

  function startInterval() {
    intervalId = setInterval(generateWith, 50);
  }

  pauseInterval();
  startInterval();

  arrowRight.addEventListener('click', sliderMoveToLeft);
  arrowLeft.addEventListener('click', sliderMoveToRight);
})();
