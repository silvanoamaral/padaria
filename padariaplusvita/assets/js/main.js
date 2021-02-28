function windowResize() {
    vw = window.innerWidth;
    screH = window.innerHeight;
    // $('#contvideo').css('min-height', screH);
}

// CAROUSEL

function startCarousel() {
    $('.carousel-products').owlCarousel({
        loop: false,
        nav: true,
        margin: 15,
        items: 4,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                autoWidth: true
            },
            768: {
                items: 2,
                autoWidth: true,
            },
            992: {
                items: 4
            }
        }
    });
}

$(document).ready(function() {
    fillRandomLists();
    fillProductsCategoriesLists('paes');
    fillProductsCategoriesLists('bolos');
    fillProductsCategoriesLists('lancamentos');
    fillProductsCategoriesLists('destaques');

    windowResize();
    $(window).resize(function() {
        // pega tamanhos sempre que a tela for redimensionada
        windowResize();
    });

    // $('.navDropdown').hover(function() {
    //     const id = '#' + this.id + ' .bg-dropdown';
    //     $(this).toggleClass('active')
    //     $(id).slideToggle();
    // });

    var estado = 0;
    $("#hamburguer").click(function() {
        delay_time = 0;
        $(this).toggleClass('open');
        $("body").toggleClass('open');
        console.log(estado);
        if (estado === 0) {
            TweenMax.to($("#bg-menu-mobile"), 1, {
                x: vw,
                ease: Expo.easeInOut
            });

            $(".mobile-items .item").each(function() {
                TweenMax.to($(this), 1.2, {
                    x: vw,
                    scaleX: 1,
                    delay: delay_time,
                    ease: Expo.easeInOut
                });
                delay_time += .04;
            });
            estado = 1;
        } else {
            estado = 0;
            TweenMax.to($("#bg-menu-mobile"), 1.2, {
                x: 0,
                ease: Expo.easeInOut
            });
            $(".mobile-items .item").each(function() {
                TweenMax.to($(this), 1, {
                    x: 0,
                    delay: delay_time,
                    ease: Expo.easeInOut
                });
                delay_time += .0;
            });
        };
    });

    $('.subitem').click(function() {
        if (estado === 1) {
            id = $(this).attr('id');
            menu = document.querySelectorAll('div[data-cat="' + id + '"]');
            console.log(menu);
            TweenMax.to(menu, 1, {
                x: vw,
                ease: Expo.easeInOut
            });

            $('.mobile-subitems[data-cat="' + id + '"] .item').each(function() {
                TweenMax.to($(this), 1.2, {
                    x: 0,
                    scaleX: 1,
                    delay: delay_time,
                    ease: Expo.easeInOut,
                    startAt: { x: -vw }
                });
                delay_time += .04;
            });
            estado = 0;
        } else {
            TweenMax.to(menu, 1.2, {
                x: 0,
                ease: Expo.easeInOut
            });
            $('.mobile-subitems[data-cat="' + id + '"] .item').each(function() {
                TweenMax.to($(this), 1, {
                    x: -vw,
                    delay: delay_time,
                    ease: Expo.easeInOut,
                    startAt: { x: 0 }
                });
                delay_time += .0;
            });
            estado = 1;
        };
    });
});

// MODAL
var openModal = false;

function abreModal(elem) {
    if (!openModal) {
        fillModalInfo(elem);
    };

    if (openModal === true) {
        $('#modal-product, body').toggleClass('open');

        TweenMax.to($('#modal-product'), 1.2, {
            y: 0,
            ease: Expo.easeInOut
        });
        openModal = false;

        clearOffers()
    };
};

function enableModal() {
    $('#modal-product, body').toggleClass('open');

    TweenMax.to($('#modal-product'), 1, {
        y: -screH,
        ease: Expo.easeInOut
    });
    openModal = true;
};