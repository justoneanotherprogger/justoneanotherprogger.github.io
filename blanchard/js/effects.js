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

$(document).ready(function(){
  document.querySelectorAll('.gallery__swiper-slide').forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      const img = event.currentTarget.dataset.img
      const author = event.currentTarget.dataset.author
      const name = event.currentTarget.dataset.name
      const dates = event.currentTarget.dataset.dates
      const desc = event.currentTarget.dataset.desc

      document.querySelector('.gallery__modal-picture').setAttribute('src', img)
      document.querySelector('.gallery__modal-text-author').textContent = author
      document.querySelector('.gallery__modal-text-name').textContent = name
      document.querySelector('.gallery__modal-text-dates').textContent = dates
      document.querySelector('.gallery__modal-text-desc').textContent = desc
      document.querySelector('.gallery__modal-window').classList.add('gallery__modal-window-active')
    })
  })
});

$(document).ready(function(){
  document.querySelector('.books__cat-filter').addEventListener('click', function (event) {
    event.currentTarget.classList.toggle('books__cat-filter-opened');
    document.querySelectorAll('.books__cat-filter-label').forEach(function (elem) {
      elem.classList.toggle('books__cat-filter-label-visible');
    });
  });
});

$(document).ready(function(){
  document.querySelectorAll('.books__cat-filter-item').forEach(function (elem) {
    elem.addEventListener('change', function (event) {
      elem.closest('.books__cat-filter-label').classList.toggle('books__cat-filter-label-visible-always')
    })
  });
});

$(document).ready(function(){
  document.querySelectorAll('.books__unselect-button').forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      elem.closest('.books__cat-filter-label').classList.toggle('books__cat-filter-label-visible-always')
    })
  });
});

$( ".catalogue__accordion-active" ).accordion({
  heightStyle: "content"
});

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

      $( ".catalogue__accordion-active" ).accordion({
        heightStyle: "content"
      });

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

      $('body,html').animate({scrollTop: top = $(".catalogue__artist-page-place").offset().top}, 1000);
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

function screen500match () {
  const swiper_gallery = new Swiper('.swiper-container-gallery', {
    speed: 500,
    spaceBetween: 5,
    allowTouchMove: true,
    effect: 'slide',
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    navigation: {
      nextEl: '.gallery__swiper-button-next',
      prevEl: '.gallery__swiper-button-prev',
    },
    pagination: {
      el: '.gallery__swiper-pagination',
      type: 'fraction',
    },
  });

  const swiper_events = new Swiper('.swiper-container-events', {
    speed: 500,
    spaceBetween: 10,
    allowTouchMove: true,
    effect: 'slide',
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerColumn: 1,
    pagination: {
      el: '.events__swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  })

  const swiper_projects = new Swiper('.swiper-container-projects', {
    speed: 500,
    spaceBetween: 15,
    allowTouchMove: true,
    loop: true,
    effect: 'slide',
    slidesPerView: 1,
    navigation: {
      nextEl: '.projects__swiper-button-next',
      prevEl: '.projects__swiper-button-prev',
    },
  });
}

function screen800match () {
  const swiper_gallery = new Swiper('.swiper-container-gallery', {
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

  const swiper_books = new Swiper('.swiper-container-books', {
    speed: 500,
    spaceBetween: 33,
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

  const swiper_projects = new Swiper('.swiper-container-projects', {
    speed: 500,
    spaceBetween: 35,
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

function screen1500match () {
  const swiper_gallery = new Swiper('.swiper-container-gallery', {
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

  const swiper_books = new Swiper('.swiper-container-books', {
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

  const swiper_projects = new Swiper('.swiper-container-projects', {
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

function screen1501match () {
  const swiper_gallery = new Swiper('.swiper-container-gallery', {
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

  const swiper_books = new Swiper('.swiper-container-books', {
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

  const swiper_projects = new Swiper('.swiper-container-projects', {
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

window.onresize = function () {
  if (window.matchMedia("(min-width: 1501px)").matches) {
    screen1501match();
  }
  else {
    if (window.matchMedia("(min-width: 801px)").matches) {
      screen1500match();
    }
    else {
      if (window.matchMedia("(min-width: 577px)").matches) {
        screen800match();
      }
      else {
        screen500match();
      }
    }
  }
};


if (window.matchMedia("(min-width: 1501px)").matches) {
  screen1501match();
}
else {
  if (window.matchMedia("(min-width: 801px)").matches) {
    screen1500match();
  }
  else {
    if (window.matchMedia("(min-width: 577px)").matches) {
      screen800match();
    }
    else {
      screen500match();
    }
  }
}

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
      iconImageHref: "/blanchard/img/map-pin.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -10]
    });
    myMap.geoObjects.add(myPlacemark);
};

ymaps.ready(init);

function opencards () {
  document.querySelectorAll('.events__card').forEach(function(card) {
    card.classList.add('events__card-visible');
  });
  document.querySelector('.events__more-button').classList.add('events__more-button-hidden');
  document.querySelector('.events__more-button-hidden').remove();
};

function inputfocus () {
  $(".header__search").focus();
  document.querySelector(".header__search-field").classList.add('header__search-visible');
}

function searchclose() {
  document.querySelector(".header__search-visible").classList.remove('header__search-visible');
}

function closemodal() {
  document.querySelector(".gallery__modal-window-active").classList.remove('gallery__modal-window-active');
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

const choices_gallery = new Choices('.gallery__filters', {
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
