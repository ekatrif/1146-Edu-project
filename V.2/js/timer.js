$(function () {
  /*$(".catmenu").click(function () {
      $(this).toggleClass("open");
    });*/

  retimer();
  setInterval(retimer, 500);
  // setInterval(slideLeft, 5000);
});
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
