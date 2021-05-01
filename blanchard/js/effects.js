$(document).ready(function(){
  $("#header-nav-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });
});

$(document).ready(function(){
  document.querySelectorAll('.header__dropdown-menu-name').forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      const menu = event.currentTarget.dataset.menu

      if (document.querySelector(`[data-list="${menu}"]`).classList.contains('header__dropdown-visible')) {
        document.querySelector('.header__dropdown-visible').classList.remove('header__dropdown-visible');
      } else {
        document.querySelectorAll('.header__dropdown-item').forEach(function (hdi) {
          hdi.classList.remove('header__dropdown-visible');
        });
        document.querySelector(`[data-list="${menu}"]`).classList.add('header__dropdown-visible');
      }
    })
  })
});

$( ".catalogue__accordion-active" ).accordion({autoHeight: false});

$(document).ready(function(){
  document.querySelectorAll('.catalogue__country-button').forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      const country = event.currentTarget.dataset.country

      document.querySelectorAll('.catalogue__country-button').forEach(function (button) {
        button.classList.remove('catalogue__country-button-active')
      })
      event.currentTarget.classList.add('catalogue__country-button-active')

      document.querySelectorAll('.catalogue__accordion-active').forEach(function (accordion1) {
        accordion1.classList.remove('catalogue__accordion-active')
      })
      document.querySelector(`[data-accord="${country}"]`).classList.add('catalogue__accordion-active')

      $( ".catalogue__accordion-active" ).accordion({autoHeight: false});

      document.querySelectorAll('.catalogue__accordion-list-item').forEach(function (listitem) {
        listitem.classList.remove('catalogue__accordion-list-item-active')
      })
      document.querySelectorAll('.catalogue__artist-page').forEach(function (artistpage) {
        artistpage.classList.remove('catalogue__artist-page-active')
      })
      document.querySelector('.catalogue__artist-page-blank').classList.add('catalogue__artist-page-active')
    })
  })
  document.querySelectorAll('.catalogue__accordion-list-item').forEach(function (artistpage) {
    artistpage.addEventListener('click', function (event) {
      const number = event.currentTarget.dataset.artistlink

      document.querySelectorAll('.catalogue__accordion-list-item').forEach(function (listitem) {
        listitem.classList.remove('catalogue__accordion-list-item-active')
      })
      event.currentTarget.classList.add('catalogue__accordion-list-item-active')

      document.querySelectorAll('.catalogue__artist-page').forEach(function (artistpage) {
        artistpage.classList.remove('catalogue__artist-page-active')
      })
      document.querySelector(`[data-artistpage="${number}"]`).classList.add('catalogue__artist-page-active')
    })
  })
});

const swiper_hero = new Swiper('.swiper-container-hero', {
  speed: 2000,
  allowTouchMove: false,
  effect: 'fade',
  loop:true,
  autoplay: {
    delay: 3500,
  },
});

var screen1500 = window.matchMedia('(max-width: 1500px)');
var screen1501 = window.matchMedia('(min-width: 1501px)');

function screen1500match (scr) {
  if (scr.matches) {
    var swiper_gallery = new Swiper('.swiper-container-gallery', {
      speed: 500,
      spaceBetween: 35,
      allowTouchMove: true,
      effect: 'slide',
      slidesPerView: 2,
      slidesPerGroup: 2,
      slidesPerColumn: 2,
      navigation: {
        nextEl: '.gallery__swiper-button-next',
        prevEl: '.gallery__swiper-button-prev',
      },
      pagination: {
        el: '.gallery__swiper-pagination',
        type: 'fraction',
      },
    });

    var swiper_books = new Swiper('.swiper-container-books', {
      speed: 500,
      spaceBetween: 48,
      allowTouchMove: true,
      effect: 'slide',
      slidesPerView: 2,
      slidesPerGroup: 2,
      navigation: {
        nextEl: '.books__swiper-button-next',
        prevEl: '.books__swiper-button-prev',
      },
      pagination: {
        el: '.books__swiper-pagination',
        type: 'fraction',
      },
    });

    var swiper_projects = new Swiper('.swiper-container-projects', {
      speed: 500,
      spaceBetween: 50,
      allowTouchMove: true,
      loop: true,
      effect: 'slide',
      slidesPerView: 2,
      navigation: {
        nextEl: '.projects__swiper-button-next',
        prevEl: '.projects__swiper-button-prev',
      },
    });
  }
}

function screen1501match (scr) {
  if (scr.matches) {
    var swiper_gallery = new Swiper('.swiper-container-gallery', {
      speed: 500,
      spaceBetween: 50,
      allowTouchMove: false,
      effect: 'slide',
      slidesPerView: 3,
      slidesPerGroup: 3,
      slidesPerColumn: 2,
      navigation: {
        nextEl: '.gallery__swiper-button-next',
        prevEl: '.gallery__swiper-button-prev',
      },
      pagination: {
        el: '.gallery__swiper-pagination',
        type: 'fraction',
      },
    });

    var swiper_books = new Swiper('.swiper-container-books', {
      speed: 500,
      spaceBetween: 48,
      allowTouchMove: false,
      effect: 'slide',
      slidesPerView: 3,
      slidesPerGroup: 3,
      navigation: {
        nextEl: '.books__swiper-button-next',
        prevEl: '.books__swiper-button-prev',
      },
      pagination: {
        el: '.books__swiper-pagination',
        type: 'fraction',
      },
    });

    var swiper_projects = new Swiper('.swiper-container-projects', {
      speed: 500,
      spaceBetween: 50,
      allowTouchMove: false,
      loop: true,
      effect: 'slide',
      slidesPerView: 3,
      navigation: {
        nextEl: '.projects__swiper-button-next',
        prevEl: '.projects__swiper-button-prev',
      },
    });
  }
}

screen1500.addEventListener("change", screen1500match(screen1500));
screen1501.addEventListener("change", screen1501match(screen1501));
window.onresize = function () {
  screen1500match(screen1500);
  screen1501match(screen1501);
};

ymaps.ready(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [55.76, 37.6],
        controls: ['geolocationControl', 'zoomControl'],
        zoom: 15
    }, {
        searchControlProvider: 'yandex#search'
    });
    var myPlacemark = new ymaps.Placemark([55.758458,37.600995], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/blanchard/img/map-pin.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -10]
    });
    myMap.geoObjects.add(myPlacemark);
};

function opencards () {
  document.querySelectorAll('.events__card').forEach(function(card) {
    card.classList.add('events__card-visible');
  });
  document.querySelector('.events__more-button').classList.add('events__more-button-hidden');
  document.querySelector('.events__more-button-hidden').remove();
};

function inputfocus () {
  $(".header__search").focus()
}

function slidetomap () {
  $('body,html').animate({scrollTop: top = $("#contacts-section").offset().top}, 1000);
}

function opencloseheadernav() {
  document.querySelector(".header__nav").classList.toggle('header__nav-visible');
  document.querySelector(".header__burger-button").classList.toggle('header__burger-cross');
}

var selector1 = document.querySelector(".phone-input");

var im1 = new Inputmask("+7(999) 999-99-99");
im1.mask(selector1);

const choices = new Choices('.gallery__filters', {
  shouldSort: false,
  itemSelectText: '',
  searchEnabled: false,
  position: 'bottom',
});

new window.JustValidate('.contacts__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    phone: {
      required: true,
      function: (name, value) => {
        const phone = selector1.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      }
    }
  },
  messages: {
    phone: {
      required: 'Укажите ваш телефон',
      function: 'Укажите ваш телефон',
    },
    name: {
      required: 'Как вас зовут?',
      minLength: 'Слишком коротко',
      maxLength: 'Слишком длинное',
    }
  },
});
