$(document).ready(function () {

    var tabs_1 = $('#tabs-1').find('.tabs'),
        tabs_1_btn = $('#tabs-1').find('.tabBtn'),
        tabs_2 = $('#tabs-2').find('.tabs'),
        tabs_2_btn = $('#tabs-2').find('.tabBtn'),
        tabs_3 = $('#tabs-3').find('.tabs'),
        tabs_3_btn = $('#tabs-3').find('.tabBtn'),
        reviews = $('.reviews-carousel');





    tabs_1.owlCarousel({
        nav: true,
        slideSpeed : 300,
        items : 1,
        paginationSpeed : 400,
        singleItem:true,
        mouseDrag: false,
        navText: ["<i class='icon-left-arrow'></i>","<i class='icon-right-arrow'></i>"],
        responsive: {
            0 : {
                nav: false
            },
            767: {
                nav:true
            }
        }
    });

    tabs_1.on('changed.owl.carousel',function(property){
        var current = property.item.index;
        tabs_1_btn.parent().removeClass("active").eq(current).addClass("active");
    });

    tabs_1_btn.on("click", function(e){
        e.preventDefault();
        tabs_1_btn.removeClass("active");
        $(this).addClass("active");

        var tabid = $(this).data("tabid");
        tabs_1.trigger('to.owl.carousel', tabid-1);
    });

    tabs_2.owlCarousel({
        nav: true,
        slideSpeed : 300,
        items : 1,
        paginationSpeed : 400,
        singleItem:true,
        mouseDrag: false,
        navText: ["<i class='icon-left-arrow'></i>","<i class='icon-right-arrow'></i>"],
        responsive: {
            0 : {
                nav: false
            },
            767: {
                nav:true
            }
        }
    });

    tabs_2.on('changed.owl.carousel',function(property){
        var current = property.item.index;
        tabs_2_btn.parent().removeClass("active").eq(current).addClass("active");
    });

    tabs_2_btn.on("click", function(e){
        e.preventDefault();
        tabs_2_btn.removeClass("active");
        $(this).addClass("active");

        var tabid = $(this).data("tabid");
        tabs_2.trigger('to.owl.carousel', tabid-1);
    });

    tabs_3.owlCarousel({
        nav: false,
        slideSpeed : 300,
        items : 1,
        paginationSpeed : 400,
        singleItem:true,
        mouseDrag: false,

    });

    tabs_3.on('changed.owl.carousel',function(property){
        var current = property.item.index;
        tabs_3_btn.parent().removeClass("active").eq(current).addClass("active");
    });

    tabs_3_btn.on("click", function(e){
        e.preventDefault();
        tabs_3_btn.removeClass("active");
        $(this).addClass("active");

        var tabid = $(this).data("tabid");
        tabs_3.trigger('to.owl.carousel', tabid-1);
    });

    reviews.owlCarousel({
        nav: true,
        slideSpeed : 300,
        items : 1,
        paginationSpeed : 400,
        singleItem:true,
        mouseDrag: false,
        navText: ["<i class='icon-left-arrow'></i>","<i class='icon-right-arrow'></i>"],
        responsive: {
            0 : {
                nav: false
            },
            767: {
                nav:true
            }
        }
    });



    $('.questions a').on('click', function (e) {
        e.preventDefault();
        var question = $(this).data('answer'),
            answer;
        $('.questions li').removeClass('active');
            $(this).parent().addClass('active');

            if($(window).width() >= 991){
                $('.answers .item').removeClass('active');
                $('.answers .item[data-answer = '+question+']').addClass('active');
            }else{
                $('.answers .item').removeClass('active');
                $('.answers .item[data-answer = '+question+']').addClass('active');
                if($('.questions li').find('.answer').is(':visible')){
                    $('.questions a').parent().find('.answer').slideUp();
                    if(!$(this).parent().find('.answer').is(':visible')){
                        $(this).parent().find('.answer').slideDown();
                    }else{

                    }

                }else{
                    $(this).parent().find('.answer').slideDown();
                }

            }




    });

    $(window).resize(function (e) {
        if($(this).width() >= 767){
            $('.answer').hide();
        }
    });






    $('#tabs-1 .show-more a').on('click', function (e) {
        e.preventDefault();

        $('.program').toggleClass('hide');

    });

    $('.programs .show-more a').on('click', function (e) {
        e.preventDefault();

        $('.text').toggleClass('hide')

    });


    $('a.popup').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            href = $this.attr('href');
        $(href).arcticmodal({
            overlay: {
                css: {
                    opacity: 0.8,
                    backgroundColor: '#000'
                }
            }
        });
    });


    $('input[name=phone]').inputmask("+7 (999) 9999999");  //static mask



    $('form').submit(function () {
        var form = $(this),
            error = false;
        form.find('input[type=text]').css('border-color', 'rgb( 209, 209, 209 )');
        form.find('input[type=text]').each(function () {
            if ($(this).val() == '') {
                $(this).css('border-color', '#ff0a22');
                error = true;
            }
        });
        if (!error) {
            $.ajax({
                type: 'POST',
                processData: true,
                contentType: 'application/x-www-form-urlencoded',
                url: 'sendmail.php',
                data: form.serialize(),
                success: function (data) {
                    if (data['error']) {
                        alert(data['error']);
                    } else {
                        $.arcticmodal('close');
                        $('#thanks').arcticmodal({
                            overlay: {
                                css: {
                                    opacity: 0.58,
                                    backgroundColor: '#009bff'
                                }
                            }
                        });
                        form[0].reset();
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                },
                complete: function (data) {
                    form.find('input[type="submit"]').prop('disabled', false);
                }
            });
        }
        return false;
    });

});