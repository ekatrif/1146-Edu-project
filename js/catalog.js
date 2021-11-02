//Проверяем все названия разделов каталога и выписываем первые буквы в массив
let lArray = [];
$(".categories").each(function () {
  let fL = $(this).html().substr(0, 1);
  lArray.push(fL);
});

let uniqueArray = lArray.filter(function (item, pos) {
  return lArray.indexOf(item) == pos;
});
//Получили массив с неповторяющимися буквами
//Выводим на страницу все начальные буквы подразделов
$(document).ready(function () {
  let hlpstr = "";
  for (let i = 0; i < uniqueArray.length; i++) {
    hlpstr = "<li ><a href='#' class='alphabet'>";
    hlpstr += uniqueArray[i];
    hlpstr += "</a></li>";
    $(".catalog-nav").append(hlpstr);
  }
});
//Подсвечиваем разделы на соответствующую букву
$(".catalog-container").on("click", ".alphabet", function (e) {
  //присваем класс выбранной букве
  $(this).addClass("activeLetter");
  $(".alphabet").not(this).removeClass("activeLetter");
  let myLetter = $(".activeLetter").html();
  //кладем в переменную все разделы каталога
  let allCategories = $(".categories");
  //проверяем 1 букву каждого раздела и подсвечиваем разделы с нужной буквой
  $(".categories").each(function () {
    $(this).removeClass("highlight");
    if (myLetter.substr(0, 3) === "Все") {
      $(this).addClass("highlight");
      $(this).removeClass("strng");
    }
    if ($(this).html().substr(0, 1).toUpperCase() == myLetter) {
      $(this).addClass("highlight");
    }
  });
  e.preventDefault();
});
//фильтрация товаров в каталоге

//выбираем, какие товары отображать по умолчанию
let newSelection = "catalog-list-item";
$("." + newSelection).slideDown();

$(".categories").click(function () {
  $(".categories").removeClass("strng");
  $(this).addClass("strng");

  $(".catalog-list").fadeTo(200, 0.1);
  newSelection = $(this).attr("rel");
  // console.log(newSelection);
  $(".catalog-list-item").each(function () {
    $(this)
      .not("." + newSelection)
      .slideUp();
    $("." + newSelection).slideDown();
    $(".catalog-list").fadeTo(600, 1);
  });
});
//По клике по ссылке "Все" покажем все товары
$(".catalog-container").on(
  "click",
  ".catalog-nav li:first-of-type",
  function (e) {
    newSelection = "catalog-list-item";
    $("." + newSelection).slideDown();
    e.preventDefault();
  }
);
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
