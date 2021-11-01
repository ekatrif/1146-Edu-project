let ajaxFlag = false;
let tovardata = [
  {
    id: 1,
    qty: 2,
    name: "Портрет Альберта Энштейна",
    image: "img/good/1.jpg",
    price: 358,
  },
  {
    id: 2,
    qty: 3,
    name: "Картина «Поцелуй»",
    image: "img/goods/6.jpg",
    price: 1178,
  },
  {
    id: 3,
    qty: 1,
    name: "Ван Гог Винсент «Терраса кафе в Арле ночью»",
    image: "img/goods/5.jpg",
    price: 1411,
  },
];

function itemsSum() {
  let cartSumItems = 0;
  for (let i = 0; i < tovardata.length; i++) {
    cartSumItems += +$(".number")[i].textContent;
  }
  console.log(cartSumItems);
  console.log(typeof cartSumItems);

  if (tovardata.length) {
    $(".header-basket span").addClass("cart_count");
    $(".header-basket span").html(cartSumItems);
  } else {
    $(".header-basket span").removeClass("cart_count");
    $(".header-basket span").html("");
  }
}
$(window).on("load", function () {
  itemsSum();
});

function makeOrder() {
  if (ajaxFlag) return;
  ajaxFlag = true;
  let formdata = {};
  // собираем данные из tovardata и полей формы
  formdata.zakaz = tovardata;
  formdata.name = $("#name").val();
  formdata.phone = $("#phone").val();
  formdata.mail = $("#mail").val();
  formdata.comment = $("#comment").val();
  formdata.deliveryType = $("#deliveryType").val();
  formdata.date = $("#date").val();
  formdata.address = $("#address").val();
  formdata.agree = $(".btn-group input").prop("checked");
  console.log(formdata);

  // проверяем данные на правильность заполнения. обязательные данные - name, date и phone или mail. в tovardata должен быть хотя бы один элемент (товар).
  if (
    !formdata.name ||
    !formdata.agree ||
    !formdata.address ||
    !formdata.date ||
    (!formdata.phone && !formdata.mail)
  ) {
    // если требования не выполнены, заканчиваем работу
    paulund_modal_box();
    //alert("Не заполнены обязательные поля!");
    ajaxFlag = false;
    return;
  } else if (!formdata.zakaz.length) {
    alert("Ваша корзина пуста!");
    ajaxFlag = false;
    return;
  }
  $.ajax({
    url: $(".form form").prop("action"),
    method: $(".form form").prop("method"),
    data: formdata,
    success: function (data) {
      // оповещение пользователя о приеме заказа
      //  console.log(data);
      // очищаем корзину
      tovardata = [];
      // отрисовываем пустую корзину
      writeTable();
      // добавляем в страницу сведения о заказе
      //удаляем значок с количеством товара из корзины в хедере
      $(".header-basket span").removeClass("cart_count");
      $(".header-basket span").html("");

      // добавляем в страницу сведения о заказе
      $(".top-section")
        .html(`<h1>Спасибо за покупку!</h1><p>Ваш заказ успешно сформирован.<br/>
      В ближайшее время с вами свяжется менеджер интернет-магазина для уточнения деталей заказа.<br>
      На ваш e-mail было отправлено письмо с деталями заказа.<br>      
      Сохраните номер вашего заказа: <span class="order-number">${data.id}.</span></p>`);
      ajaxFlag = false;
    },
    error: function (error) {
      console.log(error);
      ajaxFlag = false;
    },
  });
}
function addChar(c) {
  c += "";
  if (c.length < 2) {
    c = "0" + c;
  }
  return c;
}
function makeCalendar() {
  let today = $("#date").val().split("-");
  if (today.length < 3) {
    today = new Date();
  } else {
    today = new Date(today[2], +today[1] - 1, today[0]);
  }
  let curMonth = today.getMonth();
  let curYear = today.getFullYear();
  $("body").append('<div class="screen"><div id="calendar"></div></div>');
  $(".screen").click(function (e) {
    if (e.target == document.querySelector(".screen")) {
      $(".screen").remove();
    }
  });
  makeCalendarTable(curMonth, curYear);
  $(".screen").addClass("active");
  $("#date").trigger("blur");
}
function makeCalendarTable(month, year) {
  const russMonth = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  while (month < 0) {
    month += 12;
    year -= 1;
  }
  while (month > 11) {
    month -= 12;
    year += 1;
  }
  let firstday = new Date(year, month);
  let prevdays = (firstday.getDay() + 6) % 7;
  let lastday = new Date(year, month + 1, 0);
  let monthdays = lastday.getDate();
  let weeks = Math.ceil((prevdays + monthdays) / 7);
  let hlpstr = "";
  hlpstr +=
    '<div class="dp_header"><span class="next">></span><span class="bignext">>></span><span class="prev"><</span><span class="bigprev"><<</span><b>' +
    russMonth[month] +
    " " +
    year +
    '</b></div><div class="dp_grid"><span class="headday">Пн</span><span class="headday">Вт</span><span class="headday">Ср</span><span class="headday">Чт</span><span class="headday">Пт</span><span class="headday holiday">Сб</span><span class="headday holiday">Вс</span>';
  for (let i = 0; i < weeks * 7; i++) {
    if (i < prevdays) {
      hlpstr += '<span class="empty"></span>';
    } else if (i - prevdays < monthdays) {
      let getdate =
        addChar(i - prevdays + 1, 2) + "-" + addChar(month + 1, 2) + "-" + year;
      let curdate = $("#date").val();
      if (curdate.length < 10) {
        curdate = new Date();
        curdate =
          addChar(curdate.getDate(), 2) +
          "-" +
          addChar(curdate.getMonth() + 1, 2) +
          "-" +
          curdate.getFullYear();
      }
      hlpstr += '<span class="getter';
      if (i % 7 == 5 || i % 7 == 6) hlpstr += " holiday";
      if (getdate == curdate) hlpstr += " today";
      hlpstr +=
        '" data-get="' + getdate + '">' + (i - prevdays + 1) + "</span>";
    } else {
      hlpstr += '<span class="empty"></span>';
    }
  }
  hlpstr += "</div>";
  $("#calendar").html(hlpstr);
  $(".prev").click(function () {
    makeCalendarTable(month - 1, year);
  });
  $(".next").click(function () {
    makeCalendarTable(month + 1, year);
  });
  $(".bigprev").click(function () {
    makeCalendarTable(month, year - 1);
  });
  $(".bignext").click(function () {
    makeCalendarTable(month, year + 1);
  });
  $(".getter").click(function () {
    $("#date").val(this.dataset.get);
    $(".screen").remove();
  });
}
function removeTovar(id) {
  for (let i = 0; i < tovardata.length; i++) {
    if (tovardata[i].id == id) {
      tovardata.splice(i, 1);
      return true;
    }
  }
  return false;
}
function writeTable() {
  // проверяем длину tovardata. если там пусто, удаляем .table и .form, добавляем .empty с текстом "Ваша корзина пуста".
  if (!tovardata.length) {
    $(".table, .form").remove();

    $(".top-section").append("<p>Ваша корзина пуста!</p>");

    return;
  }
  //let tab = $(".table table");
  let tab = $(".container-table");
  let str = `<div class="header-id">№</div><div class="header-photo">Фо&shy;то</div><div class="header-name">На&shy;имено&shy;ва&shy;ние</div><div class="header-price">Цена</div><div class="header-quantity">Ко&shy;ли&shy;чест&shy;во</div><div class="header-summa">Сум&shy;ма</div><div class="header-delete"></div>`;

  for (item of tovardata) {
    str += `<div class="id" id="tovar_${item.id}">${
      item.id
    }</div><div class="photo"><img src="${
      item.image
    }" alt=""></div><div class="name">${item.name}</div><div class="price">${
      item.price
    }</div><div class="quantity"><div class="inner"><button type="button">-</button><span class="number">${
      item.qty
    }</span><button type="button">+</button></div></div><div class="summa">${
      item.price * item.qty
    }</div><div class="delete"><button type="button">+</button></div>`;
  }

  tab.html(str);

  let sum = 0;
  tab.find(".summa").each(function () {
    sum += +$(this).html();
  });
  $(".total-sum").html(`Итого: <span class="itog">${sum}</span>`);
  $(".total-order__full i").html(sum);
  $(".total-price").html(sum);
  //Прибавляем стоимость доставки

  let deliveryType = [
    {
      type: "Доставка Почтой РФ",
      cost: 200,
    },
    {
      type: "Доставка курьером",
      cost: 500,
    },
    {
      type: "Самовывоз",
      cost: 0,
    },
  ];
  //Выводим поле с выбором способа доставки
  let hlpstr = "";
  hlpstr +=
    "<select id='deliveryType'><option value='default'>Выберите способ доставки</option>";
  for (item of deliveryType) {
    hlpstr += `<option value="${item.type}">${item.type}</option>`;
  }
  hlpstr += `</select><div class="select-arrow"></div><div class="select-arrow"></div>`;
  $(".select-wrapper").html(hlpstr);
  //При выборе способа доставки пересчиытваем итоговую сумму
  $(document).on("change", "select", function () {
    let deliveryCost = 0;
    let myDelivery = $("#deliveryType option:selected").text();
    console.log(myDelivery);
    for (item of deliveryType) {
      if (item.type === myDelivery) {
        deliveryCost += item.cost;
      }
    }
    let totalSum = sum + deliveryCost;
    $(".total-price").html(totalSum);
  });
}

$(function () {
  if ($(".table").length) {
    writeTable();
    $(document).on("click", ".quantity button", function () {
      let delta = 1;
      if (this.innerHTML == "-") {
        delta = -1;
      }
      let id = $(this).parents(".quantity").prevAll(".id").prop("id").slice(6);
      //   console.log(id);
      for (item of tovardata) {
        if (item.id == id) {
          item.qty += delta;
          if (item.qty <= 0) removeTovar(id);
          break;
        }
      }
      writeTable();
      itemsSum();
    });
    $(document).on("click", ".delete button", function () {
      let id = +$(this).parent().prevAll(".id").prop("id").slice(6);
      if (removeTovar(id)) {
        writeTable();
        itemsSum();
      }
    });
    $("#date").focus(makeCalendar);

    $(".form button").click(function () {
      makeOrder();
    });
  }
});
