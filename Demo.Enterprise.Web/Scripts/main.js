/// <reference path="" />
require.config({
    baseUrl: '/Scripts/App',

    paths: {
        domReady: '../domReady',
        foundation: '../foundation/foundation',

        jquery: '../jquery-2.1.0',
        knockout: '../knockout-3.1.0.debug',
        amplify: '../amplify',
        text: "../text",
        raphael: '../raphael',
        graphael: '../g.raphael'
    },

    shim: {
        "foundation": { deps: ["jquery"] },
        "amplify": {
            deps: ["jquery"],
            exports: "amplify"
        }
    }
});

requirejs([''], function() {
});