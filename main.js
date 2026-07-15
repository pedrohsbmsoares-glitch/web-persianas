function slideImg(id, dir) {
  var s = document.getElementById(id);
  var slides = s.querySelectorAll('.slide');
  var dots = s.querySelectorAll('.dot');
  var cur = Array.from(slides).findIndex(el => el.classList.contains('active'));
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  var next = (cur + dir + slides.length) % slides.length;
  slides[next].classList.add('active');
  dots[next].classList.add('active');
}
function goSlide(id, idx) {
  var s = document.getElementById(id);
  var slides = s.querySelectorAll('.slide');
  var dots = s.querySelectorAll('.dot');
  slides.forEach(function(el,i){ el.classList.toggle('active', i===idx); });
  dots.forEach(function(el,i){ el.classList.toggle('active', i===idx); });
}

// Swipe support for mobile
(function() {
  var sliders = document.querySelectorAll('.product-img-slider');
  sliders.forEach(function(slider) {
    var startX = 0;
    var startY = 0;
    slider.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    slider.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        slideImg(slider.id, dx > 0 ? -1 : 1);
      }
    }, { passive: true });
  });

  // Keyboard navigation when slider is focused
  sliders.forEach(function(slider) {
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') { slideImg(slider.id, -1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { slideImg(slider.id, 1); e.preventDefault(); }
    });
  });
})();
