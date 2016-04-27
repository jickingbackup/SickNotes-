var app = angular.module('app', [
    'ngRoute'
]);

/* Now we can use the routeProvider! :D */
app.config(function ($routeProvider) {
    $routeProvider
        .when('/notes', {
            templateUrl: 'angularApp/views/notes.html',
            controller: 'notesController',
            controllerAs: 'main'
        })
        .when('/notes/:id', {
            templateUrl: 'angularApp/views/note.html',
            controller: 'noteController',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/notes'
        });
});

/* CONTROLLERS */

/* FACTORIES */
