Ext.define('App.view.person.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.personbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
        vm.getStore('offices').reload();
        vm.getStore('organizations').reload();
    },

    onCreate: function() {
        // The creation form can be accessed either by clicking the "create" button (dialog)
        // or via the #person/create url (page) - default config matches the "page" view.
        // Note that this dialog will be destroyed on close.
        Ext.create({
            xtype: 'personcreate',
            record: Ext.create('App.model.Person'),
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }
        }).show();
    }
});
