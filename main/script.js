import { data } from '../static/data.js';

function getImage(idx) {
  let img = '';
  data.map((elem, _) => {
    if (elem.id === idx) {
      img = elem.image;
    }
  });
  return img;
}

async function fetchProducts() {
  try {
    const response = await fetch(
      'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

const wrapperSlider = document.querySelector('.slider-line');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const slider = document.querySelector('.slider');

function renderProducts(products) {
  products.data.forEach((element, ind) => {
    const slider = document.createElement('div');
    slider.classList.add('slider-base');
    slider.classList.add(`base-${ind}`);
    slider.innerHTML = `
          <img src="${getImage(element.id)}" alt="coffee" class="coffee-slider">
          <h4>${element.name}</h4>
          <p class="favorites__text">${element.description}</p>
          <p class="favorites__price">${element.price}</p>
  `;
    wrapperSlider.append(slider);
  });
}

async function init() {
  try {
    const products = await fetchProducts(); 
    renderProducts(products);
    sliders(); 
  } catch (err) {
    console.error('Error getting data:', err);
  }
}

init();
/** start slider */

function sliders() {
  let startX;
  let startY;
  let count = 0;
  let borderCount = 0;
  const slideWidth = 20;
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

  slider.addEventListener('touchstart', function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });

  slider.addEventListener('touchmove', function (event) {
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
        sliderMoveToLeft();
      } else {
        borderCount = 0;
        sliderMoveToRight();
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
    } else if (count == 20) {
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
}

//** finish slider *//

//** finish burger *//

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

//** finish burger *//

//** start video *//

const video = document.getElementById('myVideo');

video.addEventListener('click', function (event) {
  event.preventDefault();
  if (video.paused) {
    video.play();
  }
});

video.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

//** finish video *//
