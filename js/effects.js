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
    var distanceNav = $('#header-nav-menu').offset().top;
    if ($(window).scrollTop() >= distanceNav)
      $('#fixed-nav-menu').show();
    else
      $('#fixed-nav-menu').hide();
  });
});