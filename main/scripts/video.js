const video = document.getElementById('myVideo');
  
  video.addEventListener('click', function(event) {
    event.preventDefault();
    if (video.paused) {
      video.play();
    } 
  });
  
  video.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });