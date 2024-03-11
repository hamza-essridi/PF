'use strict';

var server = require('server');

// var questionneurForm = server.forms.getForm('questionneur');
var Site = require('dw/system/Site');

var CustomObjectMgr = require('dw/object/CustomObjectMgr');

server.get('Start', function (req, res, next) {
    


    var apiKey = Site.getCurrent().getCustomPreferenceValue('questions');
	// questionneurForm.clear();
   	// // 7-2 render the newsletter signup form, passing in the form
	   var listQuestions =CustomObjectMgr.getCustomObject("assistant", 'taille').getCustom()  ;
	   var listQuestions1 =CustomObjectMgr.getAllCustomObjects("assistant")  ;
	//    var listQuestions2 =CustomObjectMgr.queryCustomObjects("assistant",'custom.questionOrder = 1').first()  ;
    //    res.print('<h1>hello world my name hamza esss</h1>');
	
	var array=[]
	var iter = listQuestions1;
	// var obj = iter.next();
	while (iter !== null && iter.hasNext()) {
		// value ={obj.getCustom()}
		var obj = iter.next();
		var Q = {laquestion :obj.getCustom().question , sontorder:obj.getCustom().questionOrder}
		
		
		array.push(Q);
		// product = ProductFactory.get({ pid: obj.getProduct().ID, pview: 'bonus', duuid: duuid });
		// products.push(product);
	}

	array.sort((a, b) => a.sontorder - b.sontorder) ;
	res.json({
		question : listQuestions.question ,
	qo:listQuestions.questionOrder ,
	items :array
	})
    // res.render('/questionneur/questions', {
    //     apiKey:apiKey,
	// 	questionneurForm: questionneurForm
	// });

	next();
});

module.exports = server.exports();