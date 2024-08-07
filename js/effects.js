$(document).ready(function(){
  $("#header-nav-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 500);
  });
  $("#fixed-nav-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 500);
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    var distanceNav = $('#about-start').offset().top;
    var fixedelem = document.getElementById('main-header')
    if ($(window).scrollTop() >= distanceNav)
      fixedelem.classList.add('fixed-on-top');
    else
      fixedelem.classList.remove('fixed-on-top');
  });
});