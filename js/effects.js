window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.work__step').forEach(function(step) {
    step.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.work__page').forEach(function(page) {
        page.classList.remove('active-page')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('active-page')

      document.querySelectorAll('.work__step').forEach(function(stepp) {
        stepp.classList.remove('active-step')
      })
      event.currentTarget.classList.add('active-step')
    })
  })
})

window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.header__burger-button').addEventListener('click', function(event) {
    document.querySelector('.header__nav-list').classList.toggle('header__nav-active')
  })
  document.querySelector('.header__nav-cross').addEventListener('click', function(event) {
    document.querySelector('.header__nav-list').classList.toggle('header__nav-active')
  })
})

$( "#accordion" ).accordion({
  collapsible:true,
  active:1000,
});

const swiper = new Swiper('.swiper-container', {

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 10000,
  },

  spaceBetween: 200,
  loop: true,
});
