"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        instagram: "3283222.a492704.6c2d53acdc3e47e695dff5c89368597d",
        instagramClientId: "a492704dfef24d9ebcc8c3062a10daaf",
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_sample.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        type: "social",
    });

}]);