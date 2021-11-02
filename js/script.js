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

///Спойлер для футера
function hideFooter(smth) {
  if ($(window).width() < "767") {
    $(".column-title").not(smth).next(".footer-ul").slideUp(500);
    $(smth).next(".footer-ul").slideToggle(500);
    let aTag = $(smth).next(".footer-ul");
    $("html,body").animate({ scrollTop: aTag.offset().top }, "slow");
  }
}
$(".column-title").click(function () {
  hideFooter(this);
});
$(window).resize(function () {
  let w = $(window).width();
  if (w > "768") {
    $(".footer-ul").removeAttr("style");
  }
});

//Блокируем переход по ссылкам с определенным классом
$(document).ready(function () {
  $("a.disabled").on("click", false);
});
