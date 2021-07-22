// Set fixed elements that need padding-right when locking the scroll
window.paddingRightItems = '#page-header';

// Locking scroll plugin options
var bodyScrollOptions = {
    reserveScrollBarGap: true,
    allowTouchMove: true
};

function openModal(hrefModal) {

    if ($(hrefModal).length > 0) {
        $(hrefModal).trigger('beforeOpenModal').addClass('active');

        setTimeout(function () {
            $(hrefModal).addClass('fadeIn').trigger('afterOpenModal');
        }, 50);

        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }

}

function closeAllModals() {
    $('.popup-block.active').trigger('beforeCloseModal').removeClass('fadeIn');

    setTimeout(function () {
        $('.popup-block.active').removeClass('active', function () {
            bodyScrollLock.clearAllBodyScrollLocks();
        }).trigger('afterCloseModal');

        bodyScrollLock.clearAllBodyScrollLocks();
    }, 200);
}

function closeModal(hrefModal) {
    $(hrefModal).trigger('beforeCloseModal').removeClass('fadeIn');

    setTimeout(function () {
        $(hrefModal).removeClass('active', function () {
            bodyScrollLock.clearAllBodyScrollLocks();
        }).trigger('afterCloseModal');

        bodyScrollLock.clearAllBodyScrollLocks();
    }, 200);
}

$(document).keydown(function (event) {
    if (event.keyCode == 27) {
        closeAllModals();
    }
});

// Switch Modal function
$(document.body).on('click', '[data-toggle="switch-modal"]', function (e) {
    e.preventDefault();

    var hrefModal = $(this).attr('data-target');

    $('.popup-block:not(:hidden)').removeClass('fadeIn active');

    $(hrefModal).addClass('active').addClass('fadeIn').scrollTop(0);

    bodyScrollLock.disableBodyScroll($(hrefModal)[0], bodyScrollOptions);

});

// Basic open modal
$(document.body).on('click', '[data-toggle="modal"]', function (e) {
    e.preventDefault();

    var hrefModal = $(this).attr('data-target');

    openModal(hrefModal);
});

// Close modals if clicked on popup overlay
$(document.body).on('click', '.popup-block__overlay', function (e) {
    var closeButton = $(this).children('[data-toggle="modal-dismiss"]');

    if (!(e.target != this)) {
        closeModal($(this).parents('.popup-block')[0]);
    }
});

// Attribute for closing modals
$(document.body).on('click', '[data-toggle="modal-dismiss"]', function (e) {
    e.preventDefault();

    closeModal($(this).parents('.popup-block')[0]);
});

// Disable copy or paste possibility
$(document).off('cut copy paste', '.no-paste').on('cut copy paste', '.no-paste', function (e) {
    e.preventDefault();
});

// Adding not-empty class if the input/textarea has value
$('input, textarea').each(function (e) {
    if ($(this).val() != '') {
        $(this).addClass('not-empty').parent().addClass('not-empty');
    } else {
        $(this).removeClass('not-empty').parent().removeClass('not-empty');
    }
});


$(document).off('change focusout keydown keypress input', 'input, textarea, select').on('change focusout keydown keypress input', 'input, textarea, select', function (e) {
    if ($(this).val() != '') {
        $(this).addClass('not-empty').parent().addClass('not-empty');
    } else {
        $(this).removeClass('not-empty').parent().removeClass('not-empty');
    }
});

$(document).off('focusin', 'input, textarea, select').on('focusin', 'input, textarea, select', function (e) {
    $(this).parent().addClass('focused');
});

$(document).off('focusout', 'input, textarea, select').on('focusout', 'input, textarea, select', function (e) {
    $(this).parent().removeClass('focused');
});

$(document).off('keypress keyup blur', '.only-digits').on('keypress keyup blur', '.only-digits', function (event) {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));

    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$(document).off('keypress keyup blur', 'input[type="tel"]').on('keypress keyup blur', 'input[type="tel"]', function (event) {
    $(this).val($(this).val().replace(/[^0-9\+]/g, ''));

    if (!isNumberKey(event)) {
        event.preventDefault();
    }
});

$(document).off('keypress keyup blur', '.only-floats').on('keypress keyup blur', '.only-floats', function (event) {
    $(this).val($(this).val().replace(/[^0-9\,.]/g, ''));

    if ((($(this).val().indexOf('.') != -1 || $(this).val().indexOf(',') != -1)) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$(document).off('click', '[data-toggle="clear-input"]').on('click', '[data-toggle="clear-input"]', function (e) {
    e.preventDefault();

    $(this).parent().find('input').val('').trigger('change');
});

$('[data-toggle="scroll-to-top"]').click(function (e) {
    e.preventDefault();

    $('html,body').animate({
        scrollTop: 0
    }, 600);
});

$('[data-toggle="anchor"]').click(function (e) {
    e.preventDefault();

    var dataTarget = $(this).attr('data-target'),
        targetPos = $(dataTarget).offset().top - 150;

    $('html,body').animate({
        scrollTop: targetPos
    }, 400);
});

$('[data-toggle="tab"]').click(function (e) {
    e.preventDefault();

    var dataTarget = $(this).attr('data-target');

    if ($(this).parent().is('li')) {
        $(this).addClass('active').parent().addClass('active').siblings().removeClass('active').children().removeClass('active');
    } else {
        $(this).addClass('active').siblings().removeClass('active');
    }

    $(dataTarget).addClass('active').siblings().removeClass('active');
});

$('input[type="number"]').on('keydown', function (e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || (/65|67|86|88/.test(e.keyCode) && (e.ctrlKey === true || e.metaKey === true)) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault();
});

// Form Validation
$.extend($.validator.messages, {
    required: "Это поле обязательное",
    email: "Введите правильный формат E-mail",
    url: "Введите правильный формат URL",
    date: "Введите правильный формат даты",
    number: "Введите цифры",
    digits: "Введите цифры",
    creditcard: "Введите правильную кредитную карточку",
    equalTo: "Поля должны соответствовать",
    maxlength: jQuery.validator.format("Максимальная длина - {0} знаков"),
    minlength: jQuery.validator.format("Минимальная длина - {0} знаков"),
    rangelength: jQuery.validator.format("Длина должна быть между {0} и {1} знаками"),
    range: jQuery.validator.format("Введите цифру между {0} и {1}"),
    max: jQuery.validator.format("Максимальное допустимое значение - {0}."),
    min: jQuery.validator.format("Минимально допустимое значение - {0}.")
});

$.validator.methods.email = function (value, element) {
    return this.optional(element) || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
};

$.validator.addMethod('lettersonly', function (value, element) {
    return this.optional(element) || /^[a-zа-яё\-\s]+$/i.test(value);
}, 'Вводить можно только буквы');

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
};

$.validator.methods.range = function (value, element, param) {
    var globalizedValue = value.replace(",", ".");
    return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
};

$.validator.methods.min = function (value, element, param) {
    value = value.replace(",", ".");
    return this.optional(element) || value >= param;
};

$.validator.methods.max = function (value, element, param) {
    value = value.replace(",", ".");
    return this.optional(element) || value <= param;
};

$(document).ready(function () {

    $(".form-validate").each(function () {
        $(this).validate({
            validateDelegate: function () {
            },
            onsubmit: true,
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');

                var elementType = element.prop('type');

                switch (elementType) {
                    case 'select-one':
                        error.appendTo(element.parent());
                        break;

                    case 'checkbox':
                        error.insertAfter(element.parent());
                        break;

                    case 'radio':
                        error.insertAfter(element.parent());

                        break;

                    default:
                        error.insertAfter(element);

                        break;

                }

            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass("is-invalid").parent().addClass("is-invalid");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass("is-invalid").parent().removeClass("is-invalid");
            },
            focusInvalid: false,
            invalidHandler: function (form, validator) {

                if (!validator.numberOfInvalids())
                    return;

                var scrollToElement = $(validator.errorList[0].element);

                if ($(scrollToElement).prop('type') === 'select-one' || $(scrollToElement).prop('type') === 'radio' || $(scrollToElement).prop('type') === 'checkbox') {
                    scrollToElement = $(scrollToElement).parent();
                }

                if ($(scrollToElement).parents('.popup-block').length > 0) {
                    var thisModal = $(this).parents('.popup-block');

                    var scrollTopValue = $(thisModal).scrollTop() + $(scrollToElement).offset().top - 120;

                    $(thisModal).animate({
                        scrollTop: scrollTopValue
                    }, 400);

                } else {
                    var scrollTopValue = $(scrollToElement).offset().top - 120;

                    $('html, body').animate({
                        scrollTop: scrollTopValue
                    }, 400);
                }

            },
            ignore: '.tab-pane:hidden *, :disabled, .no-validate'
        });

        setTimeout(function () {
            $(this).find('.num-input').each(function () {
                $(this).rules('add', {
                    required: true,
                    number: true
                });
            });

            $(this).find('[type="email"]').each(function () {
                $(this).rules('add', {
                    required: true,
                    email: true
                });
            });
        }, 0);
    });

});

$(window).on('scroll load orientationchange', function () {
    var scrolledHeight = 100;

    if ($(this).scrollTop() > scrolledHeight && !($('body').hasClass("scrolled"))) {
        $('body').addClass("scrolled");
    } else if ($(this).scrollTop() <= scrolledHeight && $('body').hasClass("scrolled")) {
        $('body').removeClass("scrolled");
    }
});

$('.agree-checkbox').each(function () {
    var thisCheckbox = $(this);
    var thisButton = $(this).parents('form').find('button[type="submit"]');

    $(thisCheckbox).on('change', function () {
        if (!$(thisCheckbox).is(':checked')) {
            $(thisButton).addClass('disabled');
        } else {
            $(thisButton).removeClass('disabled');
        }
    });

    if (!$(thisCheckbox).is(':checked')) {
        $(thisButton).addClass('disabled');
    }
});


$('.js-collapse').click(function () {
    let btn = $(this);

    if (btn.hasClass('open')) {
        btn.next().slideUp(100);
        btn.removeClass('open');
    } else {
        btn.next().slideDown(100);
        btn.addClass('open');
    }
});

//NEDO REDUX

function setContactsBg() {
    $('.bg')[0].style.zIndex = '49';
}

function setDefaultBg() {
    $('.bg')[0].style.zIndex = '-1';
}

function onBodyScroll() {
    document.body.style.overflowY = 'auto'
}

function offBodyScroll() {
    document.body.style.overflowY = 'hidden'
}

let openedWindows = {
    'menu': false,
    'contacts': false,
    'brief': false
};

function setOpened(key, value) {
    openedWindows[key] = value;
    for (let item in openedWindows) {
        console.log(item)
        console.log(openedWindows[item])
        if (openedWindows[item]) {
            setTimeout(offBodyScroll, 1)
            return
        }
    }
    setTimeout(onBodyScroll, 1)
}

//MODAL ANIMATION

function AnimationOpen(object, target) {
    if (object.hasClass('closed')) {

        let top = 0, left = 0;
        let elem = target;
        let boundariesObject = object[0].getBoundingClientRect();
        let boundariesTarget = elem.getBoundingClientRect();
        console.log(boundariesObject);
        top = boundariesTarget.y + boundariesTarget.height / 2;
        left = boundariesTarget.x + boundariesTarget.width / 2 - boundariesObject.width / 2;
        object[0].style.top = top;
        object[0].style.left = left;

        let briefAnimation = document.getElementById('open-animation-keyframes');
        if (briefAnimation) {
            document.getElementsByTagName("head")[0].removeChild(briefAnimation);
        }
        briefAnimation = document.createElement('style');
        briefAnimation.id = "open-animation-keyframes";
        let rules = document.createTextNode('@keyframes animation_open {' +
            '   0% {\n' +
            '    width: 0px;\n' +
            '    height: 0px;\n' +
            '    border-radius: 100%;\n' +
            `    transform: translate(${left}px, ${top}px);\n ` +
            '  }\n' +
            '  100% {\n' +
            '    border-radius: 0;\n' +
            '    width: 100%;\n' +
            '    height: 100vh;\n' +
            `    transform: translate(0, 0);\n` +
            '    overflow: auto' +
            '}');
        briefAnimation.appendChild(rules);
        document.getElementsByTagName("head")[0].appendChild(briefAnimation);

        setTimeout(() => {
            object.removeClass('closed');
            object.addClass('open');
        }, 400)


    }
}

function AnimationClose(object, target) {

    if (object.hasClass('open')) {
        console.log('test2')

        let top = 0, left = 0;
        let elem = target;
        while (elem) {
            top = top + parseFloat(elem.offsetTop)
            left = left + parseFloat(elem.offsetLeft)
            elem = elem.parentElement;
        }
        // top -= window.pageYOffset;
        // left -= window.pageXOffset;
        // object[0].style.top = top;
        // object[0].style.left = left;

        let briefAnimation = document.getElementById('close-animation-keyframes');
        if (briefAnimation) {
            document.getElementsByTagName("head")[0].removeChild(briefAnimation);
        }
        briefAnimation = document.createElement('style');
        briefAnimation.id = "close-animation-keyframes";
        console.log(`top: ${top}, left: ${left}`);
        let rules = document.createTextNode('@keyframes animation_closed {' +
            '  0% {\n' +
            '    border-radius: 0;\n' +
            '    width: 100%;\n' +
            '    height: 100vh;\n' +
            `    transform: translate(0, 0);\n` +
            '    overflow: hidden' +
            '}' +
            '   100% {\n' +
            '    width: 0px;\n' +
            '    height: 0px;\n' +
            '    border-radius: 100%;\n' +
            `    transform: translate(${left}px, ${top}px);\n ` +
            '  }\n');
        briefAnimation.appendChild(rules);
        document.getElementsByTagName("head")[0].appendChild(briefAnimation);


        setTimeout(() => {
            console.log('timeout')
            let openBtn = $('.page-header__brief-btn')
            openBtn.removeClass('open');
            openBtn.removeClass('closed');
            object.removeClass('open');
            object.addClass('closing');
            setTimeout(() => {
                object.removeClass('closing');
                object.addClass('closed');

            }, 400);
        }, 100)

    }
}

function BriefModal(e, type) {
    let object = $('.page-header__brief-field');
    switch(type) {
        case 'close':
            if (object.hasClass('open')){
                setOpened('brief', false)
                AnimationClose(object, e.target)
            }
            break;
        case 'open' :
            if (object.hasClass('closed')){
                setOpened('brief', true)
                AnimationOpen(object, e.target)
            }
            break;
        case 'toggle':
            if (object.hasClass('closed')){
                setOpened('brief', true)
                AnimationOpen(object, e.target)
            }
            else if (object.hasClass('open')){
                setOpened('brief', false)
                AnimationClose(object, e.target)
            }
            break;
    }
}
function MenuModal(e, type) {
    let object = $('.menu');
    switch(type) {
        case 'close':
            if (object.hasClass('open')){
                setOpened('menu', false)
                AnimationClose(object, e.target)
            }
            break;
        case 'open' :
            if (object.hasClass('closed')){
                setOpened('menu', true)
                AnimationOpen(object, e.target)
            }
            break;
        case 'toggle':
            if (object.hasClass('closed')){
                setOpened('menu', true)
                AnimationOpen(object, e.target)
            }
            else if (object.hasClass('open')){
                setOpened('menu', false)
                AnimationClose(object, e.target)
            }
            break;
    }
}
function ContactsModal(e, type) {
    let object = $('.contacts');
    switch(type) {
        case 'close':
            if (object.hasClass('open')){
                setOpened('contacts', false)
                setDefaultBg()
                AnimationClose(object, e.target)
            }
            break;
        case 'open':
            if (object.hasClass('closed')){
                setOpened('contacts', true)
                setContactsBg();
                AnimationOpen(object, e.target)
            }
            break;
        case 'toggle':
            if (object.hasClass('closed')){
                setOpened('contacts', true)
                setContactsBg()
                AnimationOpen(object, e.target)
            }
            else if (object.hasClass('open')){
                setOpened('contacts', false)
                setDefaultBg();
                AnimationClose(object, e.target)
            }
            break;
    }
}
//Closes all on nav click
$('.nav__logo').click((e) => {
    BriefModal(e, 'close');
    MenuModal(e, 'close');
    ContactsModal(e, 'close');
})

$('.page-header__brief-btn, .page-footer__brief').click((e) => {
    BriefModal(e, 'open');
})

$('.menu__brief').click((e) => {
    ContactsModal(e, 'close');
    BriefModal(e, 'open');
})

$('.menu__js-open-menu').click((e) => {
    MenuModal(e, 'toggle');
})

$('.menu__list-item').click((e) => {
    MenuModal(e, 'close');
});

$('.menu__contacts').click((e) => {
    ContactsModal(e, 'open')
})

$('.contacts__js-open-contacts').click((e) => {
    ContactsModal(e, 'toggle')
})

$('.contacts__btn-brief').click((e) => {
    ContactsModal(e, 'close');
    BriefModal(e, 'open');
})




$(".page-header__brief-btn").click(function () {
    $(".page-header__brief-btn").toggleClass("open");
});
//
$(".section-scroll").hover(function () {
    $(".scroll-3 div").toggleClass("hovered");
    $(".scroll-2 div").toggleClass("hovered");
});
