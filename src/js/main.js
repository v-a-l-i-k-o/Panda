$(document).ready(function() {
// ------------------------------------------------------------------------------------
  
/* ===== INITIALIZATION OF THE PLUGINS: ===== */

/* ----- slicknav ----- */

$('#menu').slicknav({
    label: "",
    prependTo: ".header-top"
});

/* ----- slick-slider ----- */

function Slider_single1() {
    $('#slick-slider__single').slick({});
};

if ($(window).width() > 799) {
	Slider_single1();
};

$(window).resize( function() {
    if ($(window).width() > 799) { 
        if ($('#slick-slider__single').hasClass('slick-initialized')) return;
        Slider_single1();
    } else {
        if ($('#slick-slider__single').hasClass('slick-initialized'))
        $('#slick-slider__single').slick('unslick');
    };
});

function Slider_courusel1() {
    $('#slick-slider__courusel-1').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        responsive: [
            {
            breakpoint: 800,
                settings: {
                centerPadding: '150px'
                }
            },
            {
            breakpoint: 640,
                settings: {
                centerPadding: '95px'
                }
            },
            {
            breakpoint: 480,
                settings: {
                centerPadding: '30px'
                }
            },
            {
            breakpoint: 321,
                settings: {
                centerPadding: '20px'
                }
            }
        ]
    });    
};

if ($(window).width() < 800) {
	Slider_courusel1();  
};

$(window).resize( function() {
    if ($(window).width() < 800) { 
        if ($('#slick-slider__courusel-1').hasClass('slick-initialized')) return;
        Slider_courusel1();
    } else {
        if ($('#slick-slider__courusel-1').hasClass('slick-initialized'))
        $('#slick-slider__courusel-1').slick('unslick');
    };
});

$('#slick-slider__courusel-2').slick({
    rows: 2,
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
        breakpoint: 800,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {
        breakpoint: 530,
            settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '28%'
            }
        },
        {
        breakpoint: 321,
            settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '28%'
            }
        }
    ]
});

function Slider_single2() {
    $('#slick-slider__single-2').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1
    });
};

if ($(window).width() < 800) {
    Slider_single2();     
};

$(window).resize( function() {
    if ($(window).width() < 800) { 
        if ($('#slick-slider__single-2').hasClass('slick-initialized')) return;
        Slider_single2();
    } else {
        if ($('#slick-slider__single-2').hasClass('slick-initialized'))
        $('#slick-slider__single-2').slick('unslick');
    };
});

function Slider_courusel3() {
   $('#slick-slider__courusel-3').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        responsive: [
            {
            breakpoint: 800,
                settings: {
                centerPadding: '150px'
                }
            },
            {
            breakpoint: 640,
                settings: {
                centerPadding: '95px'
                }
            },
            {
            breakpoint: 480,
                settings: {
                centerPadding: '30px'
                }
            }
        ]
    }); 
};

if ($(window).width() < 800) {
    Slider_courusel3(); 
};

$(window).resize( function() {
    if ($(window).width() < 800) { 
        if ($('#slick-slider__courusel-3').hasClass('slick-initialized')) return;
        Slider_courusel3();
    } else {
        if ($('#slick-slider__courusel-3').hasClass('slick-initialized'))
        $('#slick-slider__courusel-3').slick('unslick');
    };
});

/* ===== CUSTOM CODE: ===== */
  
/* ----- настройка dots в слайдерах ----- */

prepareSliders($('#slick-slider__courusel-1'), $('#slick-slider__courusel-1 .slick-dots li'), $('#slick-slider__courusel-1 .slick-dots li.slick-active'));
$(window).resize(function(event) {
    prepareSliders($('#slick-slider__courusel-1'), $('#slick-slider__courusel-1 .slick-dots li'), $('#slick-slider__courusel-1 .slick-dots li.slick-active')); 
});

prepareSliders($('#slick-slider__courusel-2'), $('#slick-slider__courusel-2 .slick-dots li'), $('#slick-slider__courusel-2 .slick-dots li.slick-active'));
$(window).resize(function(event) {
    prepareSliders($('#slick-slider__courusel-2'), $('#slick-slider__courusel-2 .slick-dots li'), $('#slick-slider__courusel-2 .slick-dots li.slick-active')); 
});

prepareSliders($('#slick-slider__single-2'), $('#slick-slider__single-2 .slick-dots li'), $('#slick-slider__single-2 .slick-dots li.slick-active'));
$(window).resize(function(event) {
    prepareSliders($('#slick-slider__single-2'), $('#slick-slider__single-2 .slick-dots li'), $('#slick-slider__single-2 .slick-dots li.slick-active')); 
});

prepareSliders($('#slick-slider__courusel-3'), $('#slick-slider__courusel-3 .slick-dots li'), $('#slick-slider__courusel-3 .slick-dots li.slick-active'));
$(window).resize(function(event) {
    prepareSliders($('#slick-slider__courusel-3'), $('#slick-slider__courusel-3 .slick-dots li'), $('#slick-slider__courusel-3 .slick-dots li.slick-active')); 
});

function prepareSliders(slider, slider_nav, slider_nav__active) {
    slider_nav.css('display','none');
    if (slider_nav__active.is(':first-child')) {
        slider_nav__active.css('display','inline-block').next().css('display','inline-block').next().css('display','inline-block');
    };
    slider.on('afterChange', function() {
        checkSliders($('#slick-slider__courusel-1 .slick-dots li'), $('#slick-slider__courusel-1 .slick-dots li.slick-active'));
        checkSliders($('#slick-slider__courusel-2 .slick-dots li'), $('#slick-slider__courusel-2 .slick-dots li.slick-active'));
        checkSliders($('#slick-slider__single-2 .slick-dots li'), $('#slick-slider__single-2 .slick-dots li.slick-active'));
        checkSliders($('#slick-slider__courusel-3 .slick-dots li'), $('#slick-slider__courusel-3 .slick-dots li.slick-active'));
    });
};

function checkSliders(slider_nav, slider_nav__active) {
    slider_nav.css('display','none');
    if (slider_nav__active.is(':first-child')) {
        slider_nav__active.css('display','inline-block').next().css('display','inline-block').next().css('display','inline-block');
    } else if (slider_nav__active.is(':last-child')) {
        slider_nav__active.css('display','inline-block').prev().css('display','inline-block').prev().css('display','inline-block');  
    } else {
        $('.slick-active').css('display','inline-block').next().css('display','inline-block').prev().prev().css('display','inline-block');
    };
};

/* ----- modal window ----- */

if ($(window).width() < 800) {
    $('body').append('<div id="overlay"></div>');
    $('#mob-button').click( function (event) {    // ловим клик по кнопке с id="mob-button"
        event.preventDefault();                   // выключаем стандартную роль элемента
        $('#overlay').fadeIn(400, function() {
            $('.feedback__contact-form')
                .css('display', 'block')
                .animate({opacity: 1}, 200);
        });
    });
    $('#overlay').click( function() {
        $('.feedback__contact-form').animate({opacity: 0}, 200, function() {
            $(this).css('display', 'none');
            $('#overlay').fadeOut(400);
        });
    });
};

// -------------------------------------------------------------------------------------
});