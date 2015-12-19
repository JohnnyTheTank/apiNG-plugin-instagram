"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-instagram-plugin
 @licence MIT
 */

var jjtApingInstagram = angular.module("jtt_aping_instagram", ['jtt_instagram'])
    .directive('apingInstagram', ['instagramFactory', 'apingInstagramHelper', 'apingUtilityHelper', function (instagramFactory, apingInstagramHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingInstagram, apingInstagramHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    //create helperObject for helper function call
                    var helperObject = {
                        model: appSettings.model,
                    };
                    if(typeof appSettings.getNativeData !== "undefined") {
                        helperObject.getNativeData = appSettings.getNativeData;
                    } else {
                        helperObject.getNativeData = false;
                    }

                    //create requestObject for api request call
                    var requestObject = {
                        access_token: apingUtilityHelper.getApiCredentials(apingInstagramHelper.getThisPlattformString(), "access_token"),
                        count: request.items || appSettings.items,
                    };

                    if (request.userId) { //search for userId
                        requestObject.userId = request.userId;

                        instagramFactory.getMediaFromUserById(requestObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if (request.tag) { //search for searchterm
                        requestObject.tag = request.tag;
                        instagramFactory.getMediaByTag(requestObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if (request.locationId) { //search for locationId
                        requestObject.locationId = request.locationId;
                        instagramFactory.getMediaFromLocationById(requestObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if (request.lat && request.lng) { //search for coordinates
                        requestObject.lat = request.lat;
                        requestObject.lng = request.lng;
                        if(request.distance) {
                            requestObject.distance = request.distance
                        }
                        instagramFactory.getMediaByCoordinates(requestObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, helperObject));
                        }).error(function (_data) {
                            //on error
                        });
                    }
                });
            }
        }
    }]);