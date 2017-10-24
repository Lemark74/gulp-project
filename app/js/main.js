$(document).ready(function () {

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