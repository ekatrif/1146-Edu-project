//меняем картинки фона при перезагрузке
$(function randomBackgroundImage() {
  // массив картинок
  let hulkImages = ["img/bg/1.jpg", "img/bg/2.jpg", "img/bg/3.jpg"];
  // выбираем случайную картинку
  let imageNum = Math.floor(Math.random() * hulkImages.length);
  // меняем фон на эту картинку
  let imgPath = hulkImages[imageNum];

  $(".hulk").css({ "background-image": "url(" + imgPath + ")" });
});

//фильтрация товаров на Главной
$(function () {
  let newSelection = "rep";
  $(".filter")
    .not("." + newSelection)
    .slideUp();
  $("." + newSelection).slideDown();

  $("#filter-nav a").click(function () {
    $("#all-fotos").fadeTo(200, 0.1);

    $("#filter-nav a").removeClass("current");
    $(this).addClass("current");

    newSelection = $(this).attr("rel");

    $(".filter").each(function () {
      $(this)
        .not("." + newSelection)
        .slideUp();
      $("." + newSelection).slideDown();
      $("#all-fotos").fadeTo(600, 1);
    });
  });
});

//Подключаем слайдер
$(document).ready(function () {
  $(".slider").slick({
    arrows: true,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 800,
    infinite: true,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
