Ext.define('App.view.organization.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.organizationbrowse',

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
        vm.getStore('managers').reload();
    },

    onCreate: function() {
        // The creation form can be accessed either by clicking the "create" button (dialog)
        // or via the #organization/create url (page) - default config matches the "page"
        // view. Note that this dialog will be destroyed on close.
        Ext.create({
            xtype: 'organizationcreate',
            record: Ext.create('App.model.Organization'),
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
