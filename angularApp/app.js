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
            controller: 'noteViewController as app'
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
        NoteService.getNotes()
        .success(function (jsonData, statusCode) {
            //console.log('The request was successful!', statusCode, jsonData);
            // Now add the Email messages to the controller's scope
            self.notes = jsonData;
        })
        .error(function (data) {
            console.log('There was an error!', data);
        });
        
        self.searchKeyword = "";
    }

    self.getNoteById = function (id) {
        NoteService.getNoteById()
        .success(function (jsonData, statusCode) {
            self.note = jsonData;
        })
        .error(function (data) {
            console.log('There was an error!', data);
        });
    }
});


app.controller('noteViewController', function (NoteService) {
    var self = this;
    self.note = {};

    self.getNoteById = function (id) {
        NoteService.getNoteById()
        .success(function (jsonData, statusCode) {
            self.note = jsonData;
        })
        .error(function (data) {
            console.log('There was an error!', data);
        });
    }
});

app.controller('containerController', function () {
    // initialize the title property to an array for the view to use
    this.title = "SickNotes++";
});

/* FACTORIES */
app.factory('NoteFactory', function NoteFactory($http) {
    var exports = {};

    exports.getNotes = function () {
        return $http.get('json/notes.json')
            .error(function (data) {
                console.log('There was an error!', data);
            });
    };

    exports.getNote = function (id) {
        return $http.get('json/note.json')
            .error(function (data) {
                console.log('There was an error!', data);
            });
    };

    return exports; //function return object
});

/*SERVICES - PREFERED OVER FACTORY*/
app.service('NoteService', function NoteService($http) {
    var self = this;

    this.getNotes = function () {
        return $http.get('json/notes.json')
            .error(function (data) {
                console.log('There was an error!', data);
            });
    };

    this.getNoteById = function (id) {
        return $http.get('json/note.json')
            .error(function (data) {
                console.log('There was an error!', data);
            });
    };
});