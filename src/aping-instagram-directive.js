"use strict";

angular.module("jtt_aping_instagram", ['jtt_instagram'])
    .directive('apingInstagram', ['instagramFactory', 'apingInstagramHelper', 'apingUtilityHelper', function (instagramFactory, apingInstagramHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingInstagram, apingInstagramHelper.getThisPlatformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if (typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        access_token: apingUtilityHelper.getApiCredentials(apingInstagramHelper.getThisPlatformString(), "access_token"),
                    };

                    if (request.accessToken) {
                        requestObject.access_token = request.accessToken;
                    }

                    if (typeof request.items !== "undefined") {
                        requestObject.count = request.items;
                    } else {
                        requestObject.count = appSettings.items;
                    }

                    if (requestObject.count === 0 || requestObject.count === '0') {
                        return false;
                    }

                    // -1 is "no explicit limit". same for NaN value
                    if (requestObject.count < 0 || isNaN(requestObject.count)) {
                        requestObject.count = undefined;
                    }

                    // the api has a limit of 33 items per request
                    if (requestObject.count > 33) {
                        requestObject.count = 33;
                    }

                    if (request.userId) { //search for userId
                        requestObject.userId = request.userId;

                        instagramFactory.getMediaFromUserById(requestObject).then(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        });
                    } else if (request.tag) { //search for searchterm
                        requestObject.tag = request.tag;
                        instagramFactory.getMediaByTag(requestObject).then(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        });
                    } else if (request.locationId) { //search for locationId
                        requestObject.locationId = request.locationId;
                        instagramFactory.getMediaFromLocationById(requestObject).then(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        });
                    } else if (request.lat && request.lng) { //search for coordinates
                        requestObject.lat = request.lat;
                        requestObject.lng = request.lng;
                        if (request.distance) {
                            requestObject.distance = request.distance
                        }
                        instagramFactory.getMediaByCoordinates(requestObject).then(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        });
                    }
                });
            }
        }
    }]);
