//Раскрытие каталога хедера при нажатии на кнопку
$(".header-catalog").click(function () {
  $(".header-menu").toggle();
});
//Прячем развернутое меню каталога хедера при маленьком размере экрана
$(window).resize(function () {
  let nowWidth = $(window).width();
  if (nowWidth < "767") {
    $(".header-menu").css("display", "none");
  }
});

//Скрипт для табов каталога хедера
$(function () {
  $("ul.tabs-caption").on("click", "li:not(.active)", function (e) {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.tabs")
      .find("div.tabs-content")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  });
});

//Спойлер для футера

function hideFooter() {
  $(".footer-ul").css({ display: "none" });
  $(".column-title").click(function () {
    $(".column-title").not(this).next(".footer-ul").slideUp(500);
    $(this).next(".footer-ul").slideToggle(500);
  });
}
if ($(window).width() < "767") {
  hideFooter();
}

/*let flagFooter = false;
$(window).resize(function () {
  if (!flagFooter) {
    hideFooter();
    flagFooter == true;e.preventDefault();
  }
});*/

//Спойлер для каталога
//Открываем
$(".catalog-container").css({ display: "none" });
$(".show-all").click(function () {
  $(".catalog-container").slideDown(500);
  $(".show-all").css({ display: "none" });
});
//Закрываем

$(".hide-all").click(function () {
  $(".catalog-container").slideUp(500);
  $(".show-all").css({ display: "block" });
});
//Блокируем переход по ссылкам с определенным классом
$(document).ready(function () {
  $("a.disabled").on("click", false);
});
