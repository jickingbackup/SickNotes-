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

    return exports;
});