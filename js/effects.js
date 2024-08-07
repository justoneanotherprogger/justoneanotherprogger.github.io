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
    if ($(window).scrollTop() >= distanceNav)
      $('#main-header').classList.add('fixed-on-top');
    else
      $('#main-header').classList.remove('fixed-on-top');
  });
});