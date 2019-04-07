Ext.define('App.view.office.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.officebrowse',


    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
        vm.getStore('countries').reload();
    },

    // onCreate: function() {
    //     this.redirectTo('office/create');
    // }

    onCreate: function() {
        // The creation form can be accessed either by clicking the "create" button (dialog)
        // or via the #office/create url (page) - default config matches the "page" view.
        // Note that this dialog will be destroyed on close.
        Ext.create({
            xtype: 'officecreate',
            record: Ext.create('App.model.Office'),
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
