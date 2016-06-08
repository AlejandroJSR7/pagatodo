/* pagatodo.js */

console.log('pagatodo.js');

jQuery(document).ready(function($) {
/*global vars*/
  var menuInterval = [];
/*header add links to movil*/
  $.each($('.submenu ul'), function(index, val) {
    var focus = $(val).attr('data-focus');
    if(focus != "" && focus != undefined){
      $('.menu li[data-focus="'+focus+'"]').append('<ol class="internal-menu"></ol>');
      $.each($(val).find('li'), function(index, val) {
        var cloneLi = $(val).clone(true);
        $('.menu li[data-focus="'+focus+'"]').find('.internal-menu').append(cloneLi);
      });
    }
  });
/*header control nav*/
  $('header .ctrl-nav').on('click', function(event) {
    event.preventDefault();
    var ww = window.innerWidth,
    resultTime = '';

    $(this).toggleClass('active');

    clearTimeout(resultTime);

    $.each(menuInterval, function(index, val) {
      clearTimeout(val);
    });

    if($(this).is('.active')){
      $('.results-cover').hide();
      $.each($('header .menu ul > li').get().reverse(), function(index, val) {
        menuInterval[index] = setTimeout(function(){
          $(val).removeAttr('style').addClass('show');
        },index*100);
      });

      var wh = window.innerHeight-$('.menu-cover').outerHeight();
      $('header .menu').addClass('active').css('max-height', wh);
    }
    else if(!$(this).is('.active')){
      $('header .menu ul > li').addClass('show').removeClass('active').css('opacity', 1);
      $.each($('header .menu ul > li.show'), function(index, val) {
        menuInterval[index] = setTimeout(function(){
          $(val).removeAttr('style0').removeClass('show');
        },index*100);
      });
      resultTime = setTimeout(function(){
        $('.results-cover').show();
      },600)

      $('.submenu ul').hide();
      $('.submenu-cover').removeClass('fadeInDown');
      if($(window).scrollTop() <= 127){
        $('header').removeClass('active');
      }

      $('header .menu').removeClass('active');
    }
  });
/*header menu actions*/
  $('header .menu ul > li > span').on('click', function(event) {
    event.preventDefault();
    if($(this).parents('li').attr('data-link') != "" && $(this).parents('li').attr('data-link') != undefined)
      window.location.href= $(this).parents('li').attr('data-link');
    var isActive = $(this).parents('header').is('.active');

    $(this).parents('header').addClass('active');
    $('header .menu ul > li').addClass('show').removeClass('active');
    $('header .ctrl-nav').addClass('active');
    $(this).parents('li').addClass('active');

    var focus = $(this).parents('li').attr('data-focus');
    $('.submenu-cover').removeClass('fadeInDown');
    $('.submenu ul').hide();
    if(!isActive){
      setTimeout(function(){
        $('.submenu ul[data-focus="'+focus+'"]').show();
        $('.submenu-cover').addClass('fadeInDown');
      },500);
    }else if(isActive){
      $('.submenu ul[data-focus="'+focus+'"]').show();
      $('.submenu-cover').addClass('fadeInDown');
      
    }
    
    if(window.innerWidth <= 1100){
      $('header .menu .internal-menu').stop().slideUp(300);
      $(this).next('.internal-menu').stop().slideToggle(300);
    }

  });
/*scroll action*/
  function stick_relocate(){
    var scroll = $(window).scrollTop();
    if(scroll > 127){
      $('header').addClass('active');
    }else{
      $('header').removeClass('active');
      $('.submenu ul').hide();
      $('header .menu li').removeClass('active');
    }

    if(scroll > $('.lottery-results').offset().top + $('.lottery-results').innerHeight()){
      if($('.lottery-slider').parents('header').length == 0 && window.innerWidth > 1100){
        $('header .results-cover').append($('.lottery-slider'));
      }
    }else{
      if($('.lottery-slider').parents('header').length == 1){
        $('.lottery-results').append($('.lottery-slider'));
      }
    }
  }

  $(window).scroll(stick_relocate);
/*background on slides*/
  $('.slider .slide img').each(function(index, val) {
    var bgcolor  = $(val).attr('data-bgcolor');
    if(bgcolor != undefined){
      $(val).parents('.slide').addClass('bgcolor').css('background', bgcolor);
    }
  });
  $('.slider .slide img.full-slide').each(function(index, val) {
    var uri = $(val).attr('src');
    $(val).parents('.slide').css({
      "background": "url("+uri+") no-repeat 50% 50%",
      "background-size": "cover",
      "color": "red"
    });
    $(val).remove();
  });
/*home slider*/
  $('.home-slider .gallery-slider').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 6000
  });
/*news slider*/
  $('.news-slider .gallery-slider').slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 6000
  });
/*results lottery*/
  //funcion de animación
  function counterPlay(element,time,number) {
    var interval = setInterval(function () {
      var focus = $(element).find('li.active');

      if (focus.html() == undefined) {
        focus = $(element).find('li').eq(0);
        focus.addClass("before")
          .removeClass("active")
          .next("li")
          .addClass("active");
      }

      if($(element).find('li.active').attr('data-number') < number){
        if (focus.is(":last-child")) {
          $(element).find('li').removeClass("before");
          focus.addClass("before").removeClass("active");
          focus = $(element).find('li').eq(0);
          focus.addClass("active");
        }
        else {
          $(element).find('li').removeClass("before");
          focus.addClass("before")
            .removeClass("active")
            .next("li")
            .addClass("active");
        }
      }else{
        clearInterval(interval);
      }
    },time);

  }
  //armar html
  $.each($('.lottery-slider .counter'), function(index, val) {
    var counter = $(val).attr('data-count');
    counter = counter.split(' ');
    for (var i = 0; i < counter.length; i++) {
      var html = '<ul class="flip" data-numberLength="'+counter[i]+'">';
      for (var j = counter[i]-20; j <= counter[i]; j++) {
        j.toString().length == 1 ? j = '0'+j : j = j;
        if(j < 0){
          html += '<li data-number="'+j+'"><a href="#"><div class="up"><div class="shadow"></div><div class="inn">'+Number(j+100)+'</div></div><div class="down"><div class="shadow"></div><div class="inn">'+Number(j+100)+'</div></div></a></li>';
        }
        else{
          html += '<li data-number="'+j+'"><a href="#"><div class="up"><div class="shadow"></div><div class="inn">'+j+'</div></div><div class="down"><div class="shadow"></div><div class="inn">'+j+'</div></div></a></li>';
        }
      }
      switch(counter[i]) {
        case "Aries":
        case "aries":
          html += '<li class="zodiac Aries"></li>'
          break;
        case "taurus":
        case "tauro":
        case "Taurus":
        case "Tauro":
          html += '<li class="zodiac Taurus"></li>'
          break;
        case "gemini":
        case "geminis":
        case "Gemini":
        case "Geminis":
          html += '<li class="zodiac Gemini"></li>'
          break;
        case "cancer":
        case "Cancer":
          html += '<li class="zodiac Cancer"></li>'
          break;
        case "leo":
        case "Leo":
          html += '<li class="zodiac Leo"></li>'
          break;
        case "virgo":
        case "Virgo":
          html += '<li class="zodiac Virgo"></li>'
          break;
        case "libra":
        case "Libra":
          html += '<li class="zodiac Libra"></li>'
          break;
        case "scorpio":
        case "escorpion":
        case "Scorpio":
        case "Escorpion":
          html += '<li class="zodiac Scorpio"></li>'
          break;
        case "sagittarius":
        case "sagitario":
        case "Sagittarius":
        case "Sagitario":
          html += '<li class="zodiac Sagittarius"></li>'
          break;
        case "capricorn":
        case "capricornio":
        case "Capricorn":
        case "Capricornio":
          html += '<li class="zodiac Capricorn"></li>'
          break;
        case "aquarius":
        case "aquario":
        case "Aquarius":
        case "Aquario":
          html += '<li class="zodiac Aquarius"></li>'
          break;
        case "pisces":
        case "picis":
        case "Pisces":
        case "Picis":
          html += '<li class="zodiac Pisces"></li>'
          break;
      }
      html +='</ul>'
      $(val).append(html);
    }
  });
  //animar numeros
  //inicio
  var len_results = $('.lottery-slider .slide').length;
  $('.lottery-slider .slide:eq(0)').addClass('active');
  //funciones
  function galleryResults(){
    $.each($('.lottery-slider .slide.active .flip').get().reverse(),function(index, el) {
      setTimeout(function(){
        $(el).addClass('animated zoomIn');
      },index*200);
    });
    $.each($('.lottery-slider .slide.active .counter .flip'), function(index, val) {
      $(val).find('li').removeClass('before').removeClass('active');
      var number = $(val).attr('data-numberLength');
      counterPlay(val,100,number);
    });
  }

  galleryResults();
  //intervalo de aparición
  setInterval(function(){
    $('.lottery-slider .slide.active').fadeOut(500, function() {
      $(this).find('.flip').removeClass('animated zoomIn');
      var ind = $(this).index()+1;
      if(ind < len_results){
        $(this).removeClass('active');
        $(this).next('.slide').fadeIn(500,function(){
          $(this).addClass('active');
          galleryResults();
        });
      }else if(ind == len_results){
        $(this).removeClass('active');
        $('.lottery-slider .slide:eq(0)').fadeIn(500,function(){
          $(this).addClass('active');
          galleryResults();
        });
      }
    });
  },15000);
  //resultados en cabecera
  // $('header .results-cover').append($('.lottery-slider'));

});

$(window).on('resize', function(event) {
  event.preventDefault();
  var ww = window.innerWidth;
  
  if(ww > 1100){
    $('header .menu .internal-menu').stop().removeAttr('style');
  } 
});

$(window).load(function(){
        
  $(".content-scroll").mCustomScrollbar({
    theme:"minimal"
  });
  
});

/* end pagatodo.js */

/* Google Map API */

var map = null;
var markers = [];
var bounds = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 4.695608, lng: -74.089125}
  });

  getMarkers();
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function getMarkers(){
  $.ajax({
    method: 'GET',
    url: 'json/puntos.json'
  }).success(function( response ) {
    clearMarkers();

    $('.puntos-aside').empty();

    bounds = new google.maps.LatLngBounds();

    var checkbox = $('input:checked[name="locations[]"]');

    checkbox.each(function(){
      var points = $(this).val();
      setMarkers( response[points] );
    });

    if ( checkbox.length ) map.fitBounds(bounds);

  });
}

function setMarkers( data ) {
  var image = {
    path: 'M50,14.064c-13.23,0-23.957,10.726-23.957,23.957C26.043,51.25,50,85.936,50,85.936S73.957,51.25,73.957,38.021   C73.957,24.79,63.229,14.064,50,14.064z M50,50.497c-6.617,0-11.979-5.359-11.979-11.977c0-6.616,5.361-11.978,11.979-11.978   c6.613,0,11.979,5.362,11.979,11.978C61.979,45.138,56.613,50.497,50,50.497z',
    fillColor: data.color,
    fillOpacity: 0.8,
    anchor: new google.maps.Point(12,35),
    scale: .5,
    strokeWeight: 0
  };

  var container = $('<div class="puntos-location">');

  container.append([
    '<h4 class="title-line c_', data.color, '">',
    '<i class="icon-location icon-location-', data.color,'"></i>',
    data.name,
    '</h4>'
  ].join(''));

  var list = $('<ul>');
  
  for (var i = 0; i < data.locations.length; i++) {
    var location = data.locations[i];
    
    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      map: map,
      icon: image,
      title: location.name,
      animation: google.maps.Animation.DROP
    });


    var content = [
      '<strong>', location.name,  '</strong>',
      '<br>',
      'Direción: ', location.address,
      '<br>',
      location.city
    ].join('');

    
    var infowindow = new google.maps.InfoWindow()

    google.maps.event.addListener(marker, 'click', (function(marker,content,infowindow){ 
      return function() {
        infowindow.setContent(content);
        infowindow.open(map,marker);
      };
    })(marker, content, infowindow)); 

    bounds.extend(marker.getPosition());
    markers.push(marker);

    list.append([
      '<li>',
        '<p><strong>', location.name, '</strong></p>',
        '<p>', location.address, '</p>',
        '<p>', location.city, '</p>',
      '</li>'
    ].join(''));
  }

  container.append( list );

  $('.puntos-aside').append( container );
}

function geoFindMe(){
  if (!navigator.geolocation){
    alert("Su navegador no soporta la Geolocalización");
    return;
  }

  function success(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(latLng);
  };

  function error() {
    alert("No es posible encontrar su localización");
  };

  navigator.geolocation.getCurrentPosition(success, error);
}


/*
  *** Accordion Results
*/


$(function() {
  $( "#accordion-results" ).accordion({
    collapsible: true,
    heightStyle: "content"
  });
});


/*
  *** Accordion Results
*/

$(function() {
  $( "#tabs-seccion-completa-juegos" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );

  $( "#tabs-seccion-completa-juegos ul li a" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
});

$('.site-map-link-temporal .icon-cancel').on('click', function(){
  $('.site-map-link-temporal').hide();
});


