'use strict';

function clearFormErrors(form) {
    $(form).find('.form-control.is-invalid').removeClass('is-invalid');
}

function displayMessages(formElement, data) {
    // clear form validation first
    clearFormErrors(formElement);
    $('.alert', formElement).remove();

    if (typeof data === 'object' && data.fields) {
        Object.keys(data.fields).forEach(function (key) {
            if (data.fields[key]) {
                var feedbackElement = $(formElement).find('[name="' + key + '"]')
                    .parent()
                    .children('.invalid-feedback');

                if (feedbackElement.length > 0) {
                    if (Array.isArray(data[key])) {
                        feedbackElement.html(data.fields[key].join('<br/>'));
                    } else {
                        feedbackElement.html(data.fields[key]);
                    }
                    feedbackElement.siblings('.form-control').addClass('is-invalid');
                }
            }
        });
    }
    if (data && data.errorMsg) {
        console.log('*****In form validation to display data.errorMsg '+data.error);
        var form = $(formElement).prop('tagName') === 'FORM'
            ? $(formElement)
            : $(formElement).parents('form');

        form.prepend('<div class="alert alert-danger" role="alert">'
            + data.errorMsg.join('<br/>') + '</div>');
    }
};
