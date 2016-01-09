"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        instagram: [
            {'access_token':'<YOUR_INSTAGRAM_ACCESS_TOKEN>'},
        ],
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "aping_design_sample.html",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        model: "social",
        getNativeData: false,
    });

}]);