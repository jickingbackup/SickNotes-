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
            templateUrl: 'angularApp/views/email.html',
            controller: 'noteController',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/notes'
        });
});

/* CONTROLLERS */

/* FACTORIES */
app.factory('InboxFactory', function InboxFactory ($http) {
   var exports = {};

   exports.getMessages = function () {
      return $http.get('json/notes.json')
         .error(function (data) {
            console.log('There was an error!', data);
      });
   };

   return exports;
});