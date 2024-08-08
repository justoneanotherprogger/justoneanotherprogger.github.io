$(document).ready(function(){
  var height = document.getElementById('header-main').offsetHeight;

  $("#header-nav-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top  + height;
    $('body,html').animate({scrollTop: top}, 500);
  });
});