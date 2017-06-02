window.onresize = function () {

    // Solucionando posicionamento do modal ao redimensionar tela
    l = $(".ui-dialog").width();
    a = $(".ui-dialog").height();
    $(".ui-dialog").css("left", ((viewport.w - l) / 2));
    $(".ui-dialog").css("top", ((viewport.h - a) / 2));

}

$(function () {

    var dialog, telefone;

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

    telefone = $("#dialog-telefone").dialog({
        width: 'auto',
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
            Ok: function () {
                telefone.dialog("close");
            }
        },
        close: function () {
            tel = $("#telefone");
            if (tel.val() && !$('#telefones').tagExist(tel.val())) {
                $('#telefones').addTag(tel.val());
            }
            tel.val("");
        }
    });

    //$(".dialog-contato .tagsinput").width( $("#dialog-contato").width() - $("#btnAddTelefone").width() );

    $(".btn-contato").on("click", function () {
        dialog.dialog("open");
    });

    $(".ui-dialog .ui-dialog-titlebar-close").html("X").attr("title", "Fechar");

    function resetDialog() {
        $(".dialog-contato form").reset();
        $(".dialog-contato .validacao p").html("").attr("class", "");
        $(".dialog-contato .error").removeClass("error");
        $('#telefones').importTags('')
    }

    $("#btnEnviarContato").on("click", function (e) {
        e.preventDefault();

        if (validaForm(".dialog-contato form")) {
            $(".dialog-contato .validacao p").text("Sucesso. Disparar rotina de salvar formulário!").attr("class", "").addClass("ui-state-highlight").fadeIn();
        } else {
            $(".dialog-contato .validacao p").text("Preencha corretamente todos os campos obrigatórios!").attr("class", "").addClass("ui-state-error").fadeIn();
        }

    });

    $("#telefones").tagsInput({
        'height': '38px',
        'width': '100%',
        'interactive': false
    });

    $("#btnAddTelefone").on("click", function (e) {
        e.preventDefault();
        telefone.dialog("open");
    });

    $(".destaques .titulos a").on("click", function (e) {
        e.preventDefault();

        var alvo = $(this).attr("href");

        $(".destaques .titulos a").removeClass("active");
        $(this).addClass("active");

        $(".destaques .destaque").hide();
        $(alvo).show();
    });

});