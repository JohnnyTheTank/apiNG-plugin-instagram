"use strict";
apingApp.config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            //...
            instagram: [
                {'access_token':'<YOUR_INSTAGRAM_ACCESS_TOKEN>'},
            ],
            //...
        }
    });
}]);