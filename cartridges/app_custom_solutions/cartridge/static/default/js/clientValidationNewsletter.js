
function handleNewsletter() {
    $('form.newsletter-form').submit(function (e) {
        console.log('******I am submitting the form');
        var $form = $(this);  //handle to present form
        e.preventDefault(); //prevents default submission of form by browser
        var actionserverURL = $form.attr('actionserver');  //target where the form will be submitted "Newsletter-Handler"
        //$form.spinner().start();
        $('form.newsletter-form').trigger('newsletter:submit', e); //why..not needed
        $.ajax({  //ajax request to submit the form
            url: actionserverURL,    //target where the form will be submitted "Newsletter-Handler"
            async: false,
            type: 'post',  //method for submission of the form
            dataType: 'json',  //type of response
            data: $form.serialize(),  //convert response to querystring for easy retrieval
            success: function (data) {  // regular next() event happens on the server
                console.log('******success event data status' + data.happy);
                //$form.spinner().stop();
                if (!data.happy) {  //if happy:false in Newsletter-Handler in res.json
                    console.log('******  data not happy');
                    displayMessages($form, data);  //display the 'data.error' message by using the library "formValidation"
                } else {//data is happy
                    location.href = data.redirectUrl; //if success:true then redirect to newslettersuccess.isml page
                }
            },
            error: function (data) {  //   res.setStatusCode(500); is happening on the server
                console.log('error caught');
                if (data.error) {  
                    
                    displayMessages($form, data);  //display the 'data.error' message by using the library "formValidation"
                    window.location.href = data.redirectUrl;  //redirect to error page that res.json is ending to

                }
            }

            // $form.spinner().stop();

        });
        return false;
       
    });
}

