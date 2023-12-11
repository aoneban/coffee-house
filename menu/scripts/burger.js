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