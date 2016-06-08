/* stick_relocate.js */

console.log("stick_relocate.js");

function stick_relocate(){
  var scroll = $(window).scrollTop();
  if(scroll > 127){
    $('header').addClass('active');
  }else{
    $('header').removeClass('active');
    $('.submenu ul').hide();
    $('header .menu li').removeClass('active');
  }

  if(scroll > $('.home .lottery-results').offset().top + $('.home .lottery-results').innerHeight()){
    if($('.lottery-slider').parents('header').length == 0 && window.innerWidth > 1100){
      $('header .results-cover').append($('.lottery-slider'));
    }
  }else{
    if($('.lottery-slider').parents('header').length == 1){
      $('.home .lottery-results').append($('.lottery-slider'));
    }
  }
}

$(window).scroll(stick_relocate);

/* end stick_relocate.js */