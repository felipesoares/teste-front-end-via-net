var url = window.location.protocol + "//" + window.location.host;

var viewport = {
    w: (window.innerWidth || $(window).width()),
    h: (window.innerHeight || $(window).height())
    /*
    w: $(window).width(),
    h: $(window).height(),
    */
};

$(window).resize(function () {
    viewport = {
        w: (window.innerWidth || $(window).width()),
        h: (window.innerHeight || $(window).height())
    };
});

var isMobile = function () {
    return (viewport.w < 768);
}
var isTablet = function () {
    return (viewport.w >= 768 && viewport.w <= 1024);
}
var isDesktop = function () {
    return (viewport.w > 1024);
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    }
    return false;
}

var popupWindow = function (url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

var validaForm = function (seletor) {

    seletor = (seletor) ? seletor : "";

    $(seletor + " input[required]:visible, " + seletor + " select[required]:visible, " + seletor + " textarea[required]:visible").each(function () {

        if ($(this).attr("type") == "radio") {
            var name = $(this).attr("name");
            if ($("input[name='" + name + "']:checked").length == 0) {
                $(this).parent("label").addClass("error");
            }
        } else if ($(this).val() == "" || $(this).val() == "0" || $(this).val() == $(this).attr("placeholder")) {
            $(this).addClass("error");

        } else if (($(this).attr("type") == "email" || $(this).hasClass("email")) && !$.validateEmail($(this).val())) {
            $(this).addClass("error");
        }

    });

    console.log(!$(seletor + " .error:visible").length);
    return !$(seletor + " .error:visible").length;
}

$(window).resize(function () {});

$(window).scroll(function () {});

$(document).ready(function () {

    $("a[href='#']").click(function (e) {
        e.preventDefault();
    });

    $("[data-bg]").each(function () {
        $(this).css("background-image", "url('" + $(this).attr('data-bg') + "')");
    });

    /* reset forms */
    jQuery.fn.reset = function () {
        $(this).each(function () {
            this.reset();
        });
        $("[placeholder]").val("");
    }

    $.validateEmail = function (email) {
        er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
        if (er.exec(email))
            return true;
        else
            return false;
    };

    /* fix placeholder */
    (function ($) {
        $.support.placeholder = ('placeholder' in document.createElement('input'));
    })(jQuery);

    /* fix for IE7 and IE8 */
    $(function () {
        if (!$.support.placeholder) {
            $("[placeholder]").focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
            }).blur(function () {
                if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
            }).blur();

            $("[placeholder]").parents("form").submit(function () {
                $(this).find('[placeholder]').each(function () {
                    if ($(this).val() == $(this).attr("placeholder")) {
                        $(this).val("");
                    }
                });
            });
        }
    });

    /* mascaras */

    if (typeof ($.fn.mask) == "function") {
        $("input[data-mask='cpf']").mask("999.999.999-99");
        $("input[data-mask='cnpj']").mask("99.999.999/9999-99");
        $("input[data-mask='cep']").mask("99.999-999");
        $("input[data-mask='ddd']").mask("99");
        $("input[data-mask='data']").mask("99/99/9999");
        $("input[data-mask='telefone']").focusout(function () {
            var phone, element;
            element = $(this);
            element.unmask();
            phone = element.val().replace(/\D/g, '');
            if (phone.length > 10) {
                element.mask("(99) 99999-999?9");
            } else {
                element.mask("(99) 9999-9999?9");
            }
        }).trigger('focusout');
    }

    if (typeof ($.fn.maskMoney) == "function") {
        $("input[data-mask='money']").maskMoney({
            prefix: 'R$ ',
            thousands: '.',
            decimal: ',',
            precision: 2,
            allowZero: false,
            allowNegative: false
        });
    }

    $(".campo").on("keydown", function () {
        if ($(this).hasClass("error"))
            $(this).removeClass("error");
    });

    $(".campo").on("change", function () {
        if ($(this).hasClass("error"))
            $(this).removeClass("error");
    });

});