Ext.define("NotesApp.controller.Notes", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            notesListView: "noteslistview",
            noteEditorView: "noteeditorview",
            notesList: "#notesList"
        },
        control: {
            notesListView: {
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            noteEditorView: {
                saveNoteCommand: "onSaveNoteCommand",
                deleteNoteCommand: "onDeleteNoteCommand",
                backToHomeCommand: "onBackToHomeCommand"
            }
            
        }
    },
    //Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    //Extra functions
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    activateNoteEditor: function (record) {
        var noteEditorView = this.getNoteEditorView();
        //Creem un nou record (newNote)
        noteEditorView.setRecord(record);
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },
    activateNotesList: function() {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },

    //Commands functions
    onNewNoteCommand: function() {
        console.log("onNewNoteCommand");
        //console.log(Ext.getStore("Notes").getRange());

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("NotesApp.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: ""
        });
        this.activateNoteEditor(newNote);
    },
    onEditNoteCommand: function (list, record) {
        console.log("onEditNoteCommand");
        this.activateNoteEditor(record);
    },

    //noteEditor functions
    onSaveNoteCommand: function() {
        console.log("onSaveNoteCommand");
        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var newValues = noteEditorView.getValues();

        currentNote.set("title", newValues.title);
        currentNote.set("narrative", newValues.narrative);

        var errors = currentNote.validate();
        if (!errors.isValid()) {
            Ext.Msg.alert("Wait!", errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject(); //Cancelem els canvis
            return;
        }

        var notesStore = Ext.getStore("Notes");
        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }
        notesStore.sync();
        notesStore.sort([{ property: "dateCreated", direction: "DESC" }]);

        this.activateNotesList();
    },
    onDeleteNoteCommand: function() {
        console.log("onDeleteNoteCommand");
        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("Notes");

        notesStore.remove(currentNote);
        notesStore.sync();
        this.activateNotesList();
    },
    onBackToHomeCommand: function() {
        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },

    //Class functions
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Notes");
        notesStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent();
        console.log("init");
    }
});