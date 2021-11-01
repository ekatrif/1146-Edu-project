let ajaxFlag = false;
function sendForm() {
  if (ajaxFlag) return;
  ajaxFlag = true;
  let formdata = {};
  // собираем данные из tovardata и полей формы
  formdata.name = $("#name").val();
  formdata.phone = $("#phone").val();
  formdata.mail = $("#mail").val();
  formdata.comment = $("#comment").val();
  formdata.agree = $(".btn-group input").prop("checked");
  console.log(formdata);

  // проверяем данные на правильность заполнения. обязательные данные - name, date и phone или mail. в tovardata должен быть хотя бы один элемент (товар).
  if (
    !formdata.name ||
    !formdata.agree ||
    (!formdata.phone && !formdata.mail)
  ) {
    // если требования не выполнены, заканчиваем работу
    paulund_modal_box();
    //alert("Не заполнены обязательные поля!");
    ajaxFlag = false;
    return;
  }

  $.ajax({
    url: $("form").prop("action"),
    method: $("form").prop("method"),
    data: formdata,
    success: function (data) {
      $(".left").html(
        `<h2>Ваше сообщение отправлено.</h2><p>Мы ответим на Ваше обращение в ближайшее время.</p>`
      );
      ajaxFlag = false;
    },
    error: function (error) {
      console.log(error);
      ajaxFlag = false;
    },
  });
}
$("form button").click(function () {
  sendForm();
});
