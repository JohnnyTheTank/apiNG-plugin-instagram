"use strict";

angular.module("jtt_aping_instagram")
    .service('apingInstagramHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
        this.getThisPlatformString = function () {
            return "instagram";
        };

        this.getThisPlatformLink = function () {
            return "https://instagram.com/";
        };

        this.replaceHashtagWithoutSpaces = function (_string) {
            if (_string && $.type(_string) === "string") {
                _string = _string.replace(/#/g, " #");
                _string = _string.replace(/  #/g, " #");
            }
            return _string;
        };

        this.getObjectByJsonData = function (_data, _helperObject) {
            var requestResults = [];
            if (_data) {
                var _this = this;
                if (_data.data && _data.data.data) {
                    angular.forEach(_data.data.data, function (value, key) {

                        var tempResult;
                        if (_helperObject.getNativeData === true || _helperObject.getNativeData === "true") {
                            tempResult = _this.getNativeItemByJsonData(value, _helperObject.model);
                        } else {
                            tempResult = _this.getItemByJsonData(value, _helperObject.model);
                        }
                        if (tempResult) {
                            requestResults.push(tempResult);
                        }
                    });
                }
            }
            return requestResults;
        };

        this.getItemByJsonData = function (_item, _model) {
            var returnObject = {};
            if (_item && _model) {
                switch (_model) {
                    case "social":
                        returnObject = this.getSocialItemByJsonData(_item);
                        break;
                    case "video":
                        returnObject = this.getVideoItemByJsonData(_item);
                        break;
                    case "image":
                        returnObject = this.getImageItemByJsonData(_item);
                        break;
                    default:
                        return false;
                }
            }
            return returnObject;
        };

        this.getSocialItemByJsonData = function (_item) {
            var socialObject = apingModels.getNew("social", this.getThisPlatformString());

            $.extend(true, socialObject, {
                blog_name: _item.user.full_name || "@" + _item.user.username,
                blog_id: "@" + _item.user.username,
                blog_link: this.getThisPlatformLink() + _item.user.username,
                intern_type: _item.type,
                timestamp: parseInt(_item.created_time) * 1000,
                post_url: _item.link,
                intern_id: _item.id,
                text: _item.caption ? _item.caption.text : undefined,
                likes: _item.likes ? _item.likes.count : undefined,
                comments: _item.comments ? _item.likes.comments : undefined,
            });

            socialObject.date_time = new Date(socialObject.timestamp);

            socialObject.text = this.replaceHashtagWithoutSpaces(socialObject.text);

            if (_item.type == "video") {
                socialObject.type = "video";
                socialObject.source = _item.videos;
            }

            socialObject.img_url = _item.images.standard_resolution.url;

            return socialObject;
        };

        this.getVideoItemByJsonData = function (_item) {

            if (_item.type != "video") {
                return false;
            }

            var videoObject = apingModels.getNew("video", this.getThisPlatformString());

            $.extend(true, videoObject, {
                blog_name: _item.user.full_name || "@" + _item.user.username,
                blog_id: "@" + _item.user.username,
                blog_link: this.getThisPlatformLink() + _item.user.username,
                intern_type: _item.type,
                timestamp: parseInt(_item.created_time) * 1000,
                post_url: _item.link,
                intern_id: _item.id,
                text: _item.caption ? _item.caption.text : undefined,
                likes: _item.likes ? _item.likes.count : undefined,
                comments: _item.comments ? _item.likes.comments : undefined,
                type: "video",
                source: _item.videos.standard_resolution ? _item.videos.standard_resolution.url : undefined,
                width: _item.videos.standard_resolution ? _item.videos.standard_resolution.width : undefined,
                height: _item.videos.standard_resolution ? _item.videos.standard_resolution.height : undefined,
            });

            videoObject.date_time = new Date(videoObject.timestamp);
            videoObject.text = this.replaceHashtagWithoutSpaces(videoObject.text);
            videoObject.img_url = _item.images.standard_resolution.url;
            return videoObject;
        };

        this.getImageItemByJsonData = function (_item) {
            if (_item.type != "image") {
                return false;
            }

            var imageObject = apingModels.getNew("image", this.getThisPlatformString());
            $.extend(true, imageObject, {
                blog_name: _item.user.full_name || "@" + _item.user.username,
                blog_id: "@" + _item.user.username,
                blog_link: this.getThisPlatformLink() + _item.user.username,
                intern_type: _item.type,
                timestamp: parseInt(_item.created_time) * 1000,
                post_url: _item.link,
                intern_id: _item.id,
                text: _item.caption ? _item.caption.text : undefined,
                likes: _item.likes ? _item.likes.count : undefined,
                comments: _item.comments ? _item.likes.comments : undefined,

                thumb_url: _item.images.low_resolution.url,
                thumb_width: _item.images.low_resolution.width,
                thumb_height: _item.images.low_resolution.height,

                img_url: _item.images.standard_resolution.url,
                img_width: _item.images.standard_resolution.width,
                img_height: _item.images.standard_resolution.height,

                native_url: _item.images.standard_resolution.url.replace("s640x640/", ""),
                type: "image",
            });

            imageObject.date_time = new Date(imageObject.timestamp);
            imageObject.text = this.replaceHashtagWithoutSpaces(imageObject.text);


            return imageObject;
        };

        this.getNativeItemByJsonData = function (_item, _model) {
            var nativeItem = {};
            switch (_model) {
                case "image":
                    if (_item.type != "image") {
                        return false;
                    } else {
                        nativeItem = _item;
                    }
                    break;

                case "video":
                    if (_item.type != "video") {
                        return false;
                    } else {
                        nativeItem = _item;
                    }
                    break;
            }
            nativeItem = _item;
            return nativeItem;
        };
    }]);