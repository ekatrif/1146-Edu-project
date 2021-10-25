//Раскрытие каталога при нажатии на кнопку

$(".header-catalog").click(function () {
  $(".header-menu").toggle();
});

$(function () {
  $(".catmenu").click(function () {
    $(this).toggleClass("open");
  });

  retimer();
  setInterval(retimer, 500);
  // setInterval(slideLeft, 5000);
});

/*function slideLeft() {
  let hlp = $(".slider_block").index($(".slider_block.next")) + 1;
  if (hlp > $(".slider_block").length - 1) hlp -= $(".slider_block").length;
  $(".slider_block.prev").removeClass("prev");
  $(".slider_block.curr").removeClass("curr").addClass("prev");
  $(".slider_block.next").removeClass("next").addClass("curr");
  $(".slider_block").eq(hlp).addClass("next");
}
function slideRight() {}*/
function retimer() {
  let limit = new Date($(".retaimer").data("fordate"));
  let now = new Date();
  let delta = Math.floor((limit.getTime() - now.getTime()) / 1000);
  if (delta < 0) delta = 0;
  let sec = delta % 60;
  $(".retaimer .num")[3].innerHTML = `${addChar(
    sec
  )}<span class="subnum">${multiple(sec, [
    "секунда",
    "секунды",
    "секунд",
  ])}</span>`;
  delta = Math.floor(delta / 60);
  let minute = delta % 60;
  $(".retaimer .num")[2].innerHTML = `${addChar(
    minute
  )}<span class="subnum">${multiple(minute, [
    "минута",
    "минуты",
    "минут",
  ])}</span>`;

  delta = Math.floor(delta / 60);
  let hour = delta % 24;
  $(".retaimer .num")[1].innerHTML = `${addChar(
    hour
  )}<span class="subnum">${multiple(minute, ["час", "часа", "часов"])}</span>`;

  delta = Math.floor(delta / 24);
  let day = delta % 30;
  $(".retaimer .num")[0].innerHTML = `${addChar(
    day
  )}<span class="subnum">${multiple(day, ["день", "дня", "дней"])}</span>`;
}
function addChar(c) {
  c += "";
  if (c.length < 2) {
    c = "0" + c;
  }
  return c;
}
function multiple(num, words) {
  num = num % 100;
  if (Math.floor(num / 10) != 1) {
    if (num % 10 == 1) {
      return words[0];
    } else if (num % 10 > 1 && num % 10 < 5) {
      return words[1];
    }
  }
  return words[2];
}

//Скрипт для табов

$(function () {
  $("ul.tabs__caption").on("click", "li:not(.active)", function (e) {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.tabs")
      .find("div.tabs__content")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  });
});

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

  newSelection = "";

  $("#filter-nav a").click(function () {
    $("#all-fotos").fadeTo(200, 0.1);

    $("#filter-nav a").removeClass("current");
    $(this).addClass("current");

    newSelection = $(this).attr("rel");

    $(".filter")
      .not("." + newSelection)
      .slideUp();
    $("." + newSelection).slideDown();

    $("#all-fotos").fadeTo(600, 1);
  });
});
//Подключаем слайдер
$(document).ready(function () {
  $(".slider").slick({
    arrows: true,
    dots: false,
    slidesToShow: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 800,
    Infinity: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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

//Переносим курсор в поле Поиска при клике на иконке Поиска
$(".js__focus-search").live("click", function (e) {
  e.preventDefault();
  let focusInput = document.getElementById('searchQuery');
  focusInput.focus();
  

  return false;
});
