'use strict';

var server = require('server');

// var questionneurForm = server.forms.getForm('questionneur');
var Site = require('dw/system/Site');

var CustomObjectMgr = require('dw/object/CustomObjectMgr');

server.get('Start', function (req, res, next) {
    


    var apiKey = Site.getCurrent().getCustomPreferenceValue('questions');
	
  
	 //  var listQuestions =CustomObjectMgr.getCustomObject("assistant", 'taille').getCustom()  ;
	var BMlistQuestions =CustomObjectMgr.getAllCustomObjects("searchQuestion")  ;
	//    var listQuestions2 =CustomObjectMgr.queryCustomObjects("assistant",'custom.questionOrder = 1').first()  ;
    //    res.print('<h1>hello world my name hamza esss</h1>');
	
	var arrayOfQuestions=[]
	// var iter = BMlistQuestions;
	// var obj = iter.next();
	while (BMlistQuestions !== null && BMlistQuestions.hasNext()) {
		// value ={obj.getCustom()}
		var BMlistQuestionsItem = BMlistQuestions.next();
        
		var questionObject = {question : BMlistQuestionsItem.getCustom().question ,
            label: BMlistQuestionsItem.getCustom().label,
            id: BMlistQuestionsItem.getCustom().id ,
            hisPosition: BMlistQuestionsItem.getCustom().hisPosition,
            listAnswer:BMlistQuestionsItem.getCustom().listAnswer
            }
		
			//  Q.listAnswer = removeSpecialCharacters(Q.listAnswer);
			//  var check = Q.listAnswer
			try {
				
				questionObject.listAnswer = JSON.parse(questionObject.listAnswer);
			} catch (error) {
				var a =error;
			}
		arrayOfQuestions.push(questionObject);

		// product = ProductFactory.get({ pid: obj.getProduct().ID, pview: 'bonus', duuid: duuid });
		// products.push(product);
	}


	arrayOfQuestions.sort((a, b) => a.hisPosition - b.hisPosition) ;

	res.json({
		
	items :arrayOfQuestions
	})
    // res.render('/questionneur/questions', {
    //     apiKey:apiKey,
	// 	questionneurForm: questionneurForm
	// });

	next();
});

function removeSpecialCharacters(str) {
	return str.replace(/[\"\r\n\t]/g, '');
  }

module.exports = server.exports();