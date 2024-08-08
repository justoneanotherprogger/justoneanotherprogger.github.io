$(document).ready(function(){
  let height = document.getElementById('main-header').offsetHeight;

  $("#header-nav-menu").on("click","a", function (event) {
    event.preventDefault();
    let id  = $(this).attr('href'),
    top = $(id).offset().top,
    total = top - height + 20;
    $('body,html').animate({scrollTop: total}, 500);
  });
});