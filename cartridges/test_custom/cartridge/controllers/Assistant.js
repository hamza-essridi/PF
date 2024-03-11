'use strict';

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

var request =require('dw/system/Request')


server.get('Start', function (req, res, next) {
	var questions = [
		{ question: "What is your name?", id: 1 },
		{ question: "How old are you?", id: 2 },
		// Add more questions as needed
	];

	var param1 = questions;
	// var param1 = 'Hello from ISML kkkk';
	var v = "frhkede";
	var listQuestions =CustomObjectMgr.getAllCustomObjects("assistant");
	
	/*within the function, render the hello.isml template, 
	 and declare the value of param1 which you saw 
	 in hello.isml.  param1 should equal "Hello from ISML"
	*/

	res.render('assistant',{v , question : questions[0]});
	// res.print('<h1>hello world my name hamza esss</h1>');
	
	next();
	
});

server.post('SubmitAnswer', function (req, res, next) {
   

	var requestBody = JSON.parse(req.httpParameterMap.getRequestBodyAsString());

    

    // var questionId = requestBody.id;
    // var answer = requestBody.answer;
	var reqKeywords ;
	try{
		
		var listQuestions =CustomObjectMgr.getCustomObject("searchQuestion", requestBody.label ).getCustom()  ;
		var listAnswer = JSON.parse(listQuestions.listAnswer)

	
		for (var key in listAnswer.items) {
			if (listAnswer.items.hasOwnProperty(key)) {
				var values = listAnswer.items[key];
				// Vérifier si requestBody.value appartient aux valeurs de cette clé
				if (values.includes(requestBody.value)) {
					// Si la valeur est trouvée dans cette clé, enregistrer la clé et sortir de la boucle
					var foundKey = key;
					break;
				}
			}
		}


	}catch(e){
		var error =e 
	}
    res.json({ success: true, message: 'Answer submitted successfully',feedback:'here is the list of expected products for these characteristics  :', requestBody, listAnswer });
    next();
});

module.exports = server.exports();