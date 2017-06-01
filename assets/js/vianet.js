$(function () {

    var dialog;

    dialog = $("#dialog-contato").dialog({
        width: 898,
        modal: true,
        autoOpen: false,
        responsive: true,
        resizable: false,
        draggable: false,
        show: {
            effect: "fadeIn"
        },
        hide: {
            effect: "fadeOut"
        },
        buttons: {
            "Fechar": function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            resetDialog();
        }
    });

    $(".btn-contato").on("click", function () {
        dialog.dialog("open");
    });

    $("div[aria-describedby='dialog-contato'].ui-dialog .ui-dialog-titlebar-close").html("X").attr("title", "Fechar");

    $(window).resize(function () {
        l = $("div[aria-describedby='dialog-contato'].ui-dialog").width();
        a = $("div[aria-describedby='dialog-contato'].ui-dialog").height();
        $("div[aria-describedby='dialog-contato'].ui-dialog").css("left", ((viewport.w - l)/2) );
        $("div[aria-describedby='dialog-contato'].ui-dialog").css("top", ((viewport.h - a)/2) );
    });

    function resetDialog() {
        $(".dialog-contato form").reset();
        $(".dialog-contato .validacao p").html("").attr("class", "");
        $(".dialog-contato .error").removeClass("error");
    }

    $("#btnEnviarContato").on("click", function (e) {
        e.preventDefault();

        if (validaForm(".dialog-contato form")) {
            $(".dialog-contato .validacao p").text("Sucesso. Disparar rotina de salvar formulário!").attr("class", "").addClass("ui-state-highlight").fadeIn();
        } else {
            $(".dialog-contato .validacao p").text("Preencha os campos obrigatórios corretamente!").attr("class", "").addClass("ui-state-error").fadeIn();
        }

    });

    $("#telefones").tagsInput({
        'height': '38px',
        'width': '100%',
        'interactive': false,
        'defaultText': 'add a tag',
        'placeholderColor': '#666666'
    });

});