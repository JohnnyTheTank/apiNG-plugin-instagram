[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![npm version](https://badge.fury.io/js/aping-plugin-instagram.png)](https://badge.fury.io/js/aping-plugin-instagram)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-instagram.png)](https://badge.fury.io/bo/apiNG-plugin-instagram)

**_apiNG-plugin-instagram_** is a [Instagram REST API](https://www.instagram.com/developer/endpoints/media/) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `video`, `image`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* This plugin needs an [access token](#2-access-token) :warning:
* Used promise library: [angular-instagram-api-factory](https://github.com/JohnnyTheTank/angular-instagram-api-factory) _(included in distribution files)_

# Documentation

1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [ACCESS TOKEN](#2-access-token)
    1. Generate your `access_token`
    2. Insert your `access_token` into `aping-config.js`
3. [USAGE](#3-usage)
    1. Models
    2. Requests
    3. Rate limit

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr)  or downloaded files:

* `bower install apiNG-plugin-instagram --save`
* `npm install aping-plugin-instagram --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-instagram)
* download [apiNG-plugin-instagram.zip](https://github.com/JohnnyTheTank/apiNG-plugin-instagram/zipball/master)

### II. Include file
Include `aping-plugin-instagram.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-instagram/dist/aping-plugin-instagram.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-instagram/dist/aping-plugin-instagram.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/aping.plugin-instagram/latest/aping-plugin-instagram.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-instagram.min.js"></script>
```

### III. Add dependency
Add the module `jtt_aping_instagram` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_instagram']);
```

### IV. Add the plugin
Add the plugin's directive `aping-instagram="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-instagram="[{'tag':'camping'}]">
</aping>
```

## 2. ACCESS TOKEN

### I. Generate your `access_token`
1. Login on [instagram.com/developer](https://www.instagram.com/developer/)
2. Navigate to [instagram.com/developer/clients/manage](https://www.instagram.com/developer/clients/manage/)
3. Register a "New Client ID"
4. Generate access_token
    1. via browser 
        * Open `https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code` with information from http://instagram.com/developer/clients/manage/
        * Accept the alert from instagram
        * Get your access_token from the url bar of your browser
    2. via curl:
        ```
        curl \-F 'client_id=CLIENT-ID' \
            -F 'client_secret=CLIENT-SECRET' \
            -F 'grant_type=authorization_code' \
            -F 'redirect_uri=YOUR-REDIRECT-URI' \
            -F 'code=CODE' \
            https://api.instagram.com/oauth/access_token
        ```


### II. Insert your `access_token` into `aping-config.js`
Create and open `js/apiNG/aping-config.js` in your application folder. It should be look like this snippet:
```js
angular.module('jtt_aping').config(['$provide', function ($provide) {
    $provide.value("apingDefaultSettings", {
        apingApiKeys : {
            instagram : [
                {'access_token':'<YOUR_INSTAGRAM_ACCESS_TOKEN>'},
            ]
            //...
        }
    });
}]);
```

:warning: Replace `<YOUR_INSTAGRAM_ACCESS_TOKEN>` with your instagram `access_token`

## 3. USAGE

### I. Models
Supported apiNG models

|  model   | content | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|---------|
| `social` | **images**, **videos** | full    | `33`   | `20`   |
| `image`  | **images** | partly    | `33`   | `20`   |
| `video`  | **videos** | partly    | `33`   | `20`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by Tag
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`tag`** | `camping` |  | Search Tag (without #) | no |
| **`items`**  | `10` | `20` | Items per request (`0`-`33`) |  yes  |

Sample requests:
* `[{'tag':'soccer'}, {'tag':'nofilter'}]`
* `[{'tag':'eagle', 'items':10}]`

#### Requests by User
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`userId`** | `416104304` |  | The `userId` of an instagram user<br>[Username to userId converter](http://jelled.com/instagram/lookup-user-id) | no |
| **`items`**  | `10` | `20` | Items per request (`0`-`33`) |  yes  |

Sample request:
* `[{'userId':'416104304', 'items':10}]`

#### Requests by Coordinates
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`lat`** | `-13.163333` |  | Latitude of the center search coordinate. If used, lng is required | yes |
| **`lng`** | `-72.545556` |  | Longitude of the center search coordinate. If used, lat is required | yes |
| **`distance`** | `2500` | `1000` | Radius of the center search coordinates in meters. Max distance is `5000` meters | yes |
| **`items`**  | `10` | `20` | Items per request (`0`-`33`) |  yes  |

Sample request:
* `[{'lat':'-13.163333', 'lng':'-72.545556', 'distance':'2000'}]`

#### Requests by Location
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`locationId`** | `24245` |  | The Instagram `locationId` of a location.<br>Find Instagram locations [here](http://worldc.am/) | no |
| **`items`**  | `10` | `20` | Items per request (`0`-`33`) |  yes  |

Sample requests:
* `[{'locationId':'24245', 'items':30}]`


### III. Rate limit
Visit the official [Instagram API documentation](https://www.instagram.com/developer/limits/)

> **The live Rate Limit is 5000 / hour.** Global rate limits are applied inclusive of all API calls made by an app per access token over the 1-hour sliding window, regardless of the particular endpoint. Rate limits also apply to invalid or malformed requests.

# Licence
MIT

