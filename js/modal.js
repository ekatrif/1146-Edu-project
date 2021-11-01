(function ($) {
  // Определение плагина jQuery

  paulund_modal_box = function (prop) {
    // Параметры по умолчанию

    var options = $.extend(
      {
        height: "auto",
        width: "450",
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля формы.",
        top: "40%",
        left: "calc(50% - 225px)",
      },
      prop
    );

    add_block_page();
    add_popup_box();
    add_styles();

    $(".paulund_modal_box").fadeIn("slow");

    function add_styles() {
      $(".paulund_modal_box").css({
        position: "absolute",
        left: options.left,
        top: options.top,
        display: "none",
        height: options.height + "px",
        width: options.width + "px",

        background: "#fff",
        "z-index": "50",
      });
      $(".paulund_modal_close").css({
        position: "relative",
        top: "10px",
        left: "-10px",
        float: "right",
        display: "block",
        height: "15px",
        width: "15px",
        background: "url(img/close15.png)  no-repeat",
      });
      /*Блокировка перекрываемой страницы*/
      var pageHeight = $(document).height();
      var pageWidth = $(window).width();

      $(".paulund_block_page").css({
        position: "absolute",
        top: "0",
        left: "0",
        "background-color": "rgba(0,0,0,0.6)",
        height: pageHeight,
        width: pageWidth,
        "z-index": "10",
      });
      $(".paulund_inner_modal_box").css({
        "background-color": "#fff",
        height: options.height - 50 + "px",
        width: options.width - 50 + "px",
        padding: "10px",
        margin: "15px",
        "border-radius": "10px",
        "-moz-border-radius": "10px",
        "-webkit-border-radius": "10px",
      });
    }

    function add_block_page() {
      var block_page = $('<div class="paulund_block_page"></div>');

      $(block_page).appendTo("body");
    }

    function add_popup_box() {
      var pop_up = $(
        '<div class="paulund_modal_box"><a href="#" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><h2>' +
          options.title +
          "</h2><p>" +
          options.description +
          '</p><button class="red-btn">OK</button></div></div>'
      );
      $(pop_up).appendTo(".paulund_block_page");

      $(".paulund_modal_close").click(function () {
        $(this).parent().fadeOut().remove();
        $(".paulund_block_page").fadeOut().remove();
      });
      $(".paulund_inner_modal_box button").click(function () {
        $(".paulund_modal_box").fadeOut().remove();
        $(".paulund_block_page").fadeOut().remove();
      });
    }

    return this;
  };
})(jQuery);
