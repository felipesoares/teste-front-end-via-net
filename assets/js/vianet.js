$(function () {

    var dialog;

    dialog = $("#dialog-contato").dialog({
        width: 'auto', // overcomes width:'auto' and maxWidth bug
        maxWidth: 898,
        height: 'auto',
        modal: true,
        autoOpen: false,
        fluid: true,
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
        fluidDialog();
    });

    $(document).on("dialogopen", ".ui-dialog", function (event, ui) {
        fluidDialog();
    });

    function fluidDialog() {
        var $visible = $(".ui-dialog:visible");
        // each open dialog
        $visible.each(function () {
            var $this = $(this);
            var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
            // if fluid option == true
            if (dialog.options.fluid) {
                var wWidth = $(window).width();
                // check window width against dialog width
                if (wWidth < (parseInt(dialog.options.maxWidth) + 50)) {
                    // keep dialog from filling entire screen
                    $this.css("max-width", "90%");
                } else {
                    // fix maxWidth bug
                    $this.css("max-width", dialog.options.maxWidth + "px");
                }
                //reposition dialog
                dialog.option("position", dialog.options.position);
            }
        });

    }

    function resetDialog(){
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

});