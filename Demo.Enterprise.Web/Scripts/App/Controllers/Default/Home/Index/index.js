require(['jquery', 'knockout', 'amplify', 'confirmation'], function ($, ko, amplify, confirmation) {
    console.log("loaded index.js ...");

    var viewModel = function () {
        var self = this;

//        confirmation.callback = function() {
//            alert("You received a callback.");
//
////            viewModel.callback();
//        };

        amplify.subscribe('confirmation:yes', function (response) {
            console.log("Response:", response);
            alert("Deleting ... the WORLD!");
        });

        amplify.subscribe('confirmation:no', function () {
            alert("Delete the world later ...");
        });

        $("#delete").click(function () {
            //confirmation.show();
            amplify.publish("confirmation:show");
        });
    };
    
    ko.applyBindings(viewModel);
});