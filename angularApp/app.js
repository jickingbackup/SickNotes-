"use strict";

var app = angular.module('app', [
    'ngRoute'
]);

/* Now we can use the routeProvider! :D */
app.config(function ($routeProvider) {
    //resolve values - when using cached data
    /*
    var resolveNotes = {
        notes: function (NoteService) {
            return NoteService.getNotes();
        }
    };
    */

    $routeProvider
        .when('/notes', {
            templateUrl: 'angularApp/views/notes.html',
            controller: 'noteListController as app'
            //resolve: resolveProjects
        })
        .when('/notes/:id', {
            templateUrl: 'angularApp/views/noteview.html',
            controller: 'noteViewController as controller'
            //resolve: resolveProjects
        })
        .otherwise({
            redirectTo: '/notes'
        });
});

/* CONTROLLERS */
app.controller('noteListController', function (NoteService) {
    var self = this;
    self.notes = {};
    self.note = {};
    self.searchKeyword = "";

    self.getNotes = function () {
        NoteService.getNotes().then(function(response) {
                //console.log('success',response);
                self.notes = response.data;
            }, function(error) {
                console.log(error);
            });

        self.searchKeyword = "";
    }
});


app.controller('noteViewController', function (NoteService,$routeParams) {
    var self = this;
    self.note = {};

    self.getNoteById = function (id) {
        NoteService.getNoteById(id).then(function(response) {
                //console.log('success',response);
                self.note = response.data;
            }, function(error) {
                console.log(error);
            });
    }
    
    self.ctor = function()
    {
        self.getNoteById($routeParams.id);
    }
    
    self.ctor();
});

app.controller('containerController', function () {
    // initialize the title property to an array for the view to use
    this.title = "SickNotes++";
});

/* FACTORIES */
// app.factory('NoteFactory', function NoteFactory($http) {
//     var exports = {};
//     exports.getNotes = function () {
//         return $http.get('json/notes.json')
//             .error(function (data) {
//                 console.log('There was an error!', data);
//             });
//     };
//     exports.getNote = function (id) {
//         return $http.get('json/note.json')
//             .error(function (data) {
//                 console.log('There was an error!', data);
//             });
//     };
//     return exports; //function return object
// });

/*SERVICES - PREFERED OVER FACTORY*/
app.service('NoteService', function NoteService($http) {
    var self = this;

    this.getNotes = function () {
        return $http.get('json/notes.json');
        /*return $http.get('json/notes.json').then(function(response) {
                console.log('success',response);
                return response.data;
            }, function(error) {
                console.log(error);
            });*/
    };

    this.getNoteById = function (id) {
        return $http.get('json/note.json');
    };


    this.addNote = function (note) {
        console.log('Note Added.');
    }
});