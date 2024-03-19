'use strict';

var server = require('server');
var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
server.get('Start', function (req, res, next) {

    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var CatalogMgr = require('dw/catalog/CatalogMgr');

    var testgetCategory =CatalogMgr.getCategory('mens-clothing-suits');

    var queryString = req.querystring ;
    var queryStringSrule = req.querystring.srule ;
    
   var httpParameterMap = req.httpParameterMap ;
    // var cgid = req.querystring.cgid; // Accessing top-level property
    // var isNew = req.querystring.preferences.isNew; // Accessing nested property
    // var refinementColor = req.querystring.preferences.refinementColor; // Accessing nested property
    
    var result = searchHelper.search(req, res);

    var productIds = result.productSearch ;
    
    
    var refineurl =result.refineurl;
    // var hits = result.productSearch.productIds[0].productSearchHit ;
    res.render('searchAssistant/productsearched',
     { productSearch: result.productSearch,
         refineurl: refineurl ,
         queryString :queryString ,
        
        }); 
    //res.render('searchAssistant/productsearched'); 


    // res.render('searchAssistant/productsearched', {param1:"Hello from ISML"}); 
    
    
    // res.json({
    //     productSearchHit : hits,
    //     hamza :queryString ,
    //     ids : productIds 
    // })
	// res.print('<html><body><h1>Hello World from ReqComposition </h1></body></html>');
    next();
	 
});

module.exports = server.exports();