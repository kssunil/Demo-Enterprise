define(['jquery', 'foundation', 'amplify'], function ($, foundation, amplify) {
    var initialize = function () {
        console.log("Initializing Application ...");

        $(document).foundation();

        amplify.request.define('users', 'ajax', { url: "/api/users", dataType: "json", type: "GET" });
        amplify.request.define('usersUpdate', 'ajax', { url: "/api/users/{id}", dataType: "json", type: "PUT" });
    };

    return { initialize: initialize };
});