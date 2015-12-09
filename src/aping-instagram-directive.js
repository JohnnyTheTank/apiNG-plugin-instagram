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

                    var instagramSearchObject = {
                        access_token: apingUtilityHelper.getApiCredentials(apingInstagramHelper.getThisPlattformString(), "access_token"),
                        count: request.items || appSettings.items,
                    };

                    if (request.userId) { //search for userId
                        instagramSearchObject.userId = request.userId;

                        instagramFactory.getMediaFromUserById(instagramSearchObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if (request.tag) { //search for searchterm
                        instagramSearchObject.tag = request.tag;
                        instagramFactory.getMediaByTag(instagramSearchObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if (request.locationId) { //search for locationId
                        instagramSearchObject.locationId = request.locationId;
                        instagramFactory.getMediaFromLocationById(instagramSearchObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    } else if (request.lat && request.lng) { //search for coordinates
                        instagramSearchObject.lat = request.lat;
                        instagramSearchObject.lng = request.lng;
                        if(request.distance) {
                            instagramSearchObject.distance = request.distance
                        }
                        instagramFactory.getMediaByCoordinates(instagramSearchObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, appSettings.model));
                        }).error(function (_data) {
                            //on error
                        });
                    }
                });
            }
        }
    }]);