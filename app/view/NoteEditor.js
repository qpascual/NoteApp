Ext.define("NotesApp.view.NoteEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.noteeditorview",
    config: {
        scrollable: "vertical",
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Edit Note",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "Home",
                        itemId: "backButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "confirm",
                        text: "Save",
                        itemId: "saveButton"
                    }
                ]
            },
            {
                xtype: "toolbar",
                docked: "bottom",
                items: [
                    {
                        xtype: "button",
                        iconCls: "trash",
                        iconMask: true,
                        itemId: "deleteButton",
                        ui: "decline"
                    }
                ]
            },
            { xtype: "fieldset",
                items: [
                    {
                        xtype: "textfield",
                        name: "title",
                        label: "Title",
                        required: true
                    },
                    {
                        xtype: "textareafield",
                        name: "narrative",
                        label: "Narrative"
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#saveButton",
                event: "tap",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonTap"
            }
        ]
    },
    onSaveButtonTap: function () {
        console.log("onSaveButtonTap");
        this.fireEvent("saveNoteCommand", this);
    },
    onDeleteButtonTap: function () {
        console.log("onDeleteButtonTap");
        this.fireEvent("deleteNoteCommand", this);
    },
    onBackButtonTap: function () {
        console.log("onBackButtonTap");
        this.fireEvent("backToHomeCommand", this);
    }
});