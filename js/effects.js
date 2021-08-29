$(document).ready(function(){
  $("#header-nav-menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 500);
  });
});

$(document).ready(function(){
  document.querySelector('.about__diploma').addEventListener('click', function (event) {
    document.querySelector('.about__modal-diploma').classList.toggle('visible');
  });
  document.querySelector('.about__modal-diploma-background').addEventListener('click', function (event) {
    document.querySelector('.about__modal-diploma').classList.toggle('visible');
  });
  document.querySelector('.about__modal-close').addEventListener('click', function (event) {
    document.querySelector('.about__modal-diploma').classList.toggle('visible');
  });
});
