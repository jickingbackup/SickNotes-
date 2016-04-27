app.controller('notesController', function (NoteFactory) {
    // initialize the title property to an array for the view to use
    this.title = "HI, IM A CONTROLLER.";
    this.notes = {};
    var self = this;

    this.getNotes = function name() {
        NoteFactory.getNotes().success(function (jsonData, statusCode) {
            console.log('The request was successful!', statusCode, jsonData);
            // Now add the Email messages to the controller's scope
            self.notes = jsonData;
        });
    }
});