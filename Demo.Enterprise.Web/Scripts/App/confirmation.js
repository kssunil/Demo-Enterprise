define(['knockout', 'amplify', 'text!./Templates/confirmation.html', 'domReady!'], function (ko, amplify, template) {
    var confirmationViewModel = function() {
        var self = this;

        self.title = ko.observable('Are you sure you want to continue?');

        self.element = $("#confirmation-dialog");

        self.show = function () {
            self.element.removeClass("hide").show();
        };

        self.callback = function() {};

        $("#confirmation-yes").click(function (event) {
            self.element.hide();
            amplify.publish('confirmation:yes', { foo: "Hello, World!" });

            self.callback();
        });

        $("#confirmation-no").click(function () {
            self.element.hide();
            amplify.publish('confirmation:no');
        });

        amplify.subscribe("confirmation:show", function() {
            self.element.removeClass("hide").show();
        });
    };

    $("body").append(template);

    var vm = new confirmationViewModel();

    ko.applyBindings(vm, document.getElementById("confirmation-dialog"));
    
    return vm;
});