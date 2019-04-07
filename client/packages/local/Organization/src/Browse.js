Ext.define('App.view.organization.Browse', {
    extend: 'App.view.widgets.Browse',
    xtype: 'organizationbrowse',

    requires: [
        'App.view.organization.BrowseController',
        'App.view.organization.BrowseModel',
        'App.view.organization.BrowseToolbar',
        'Ext.plugin.ListPaging'
    ],

    tbar: {
        xtype: 'organizationbrowsetoolbar'
    },

    items: [{
        xtype: 'grid',
        emptyText: 'No organization was found to match your search',
        bind: '{organizations}',
        ui: 'listing',

        selectable: {
            disabled: true
        },

        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }],

        columns: [{
            text: 'Name',
            dataIndex: 'name',
            flex: 2,
            cell: {
                encodeHtml: false
            },
            tpl: '<a class="item-title" href="#{url}">{name}</a>'
        }, {
            text: 'Manager',
            dataIndex: 'manager.lastname',
            flex: 2,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="manager">',
                '<div class="item-title">',
                '<a href="#{url}">{fullname}</a>',
                '</div>',
                '<div class="item-caption">',
                '<a href="#{office.url}">{office.name}</a>, ',
                '{office.city} ({office.country})',
                '</div>',
                '</tpl>'
            ]
        }, {
            text: 'Headcount',
            dataIndex: 'headcount',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<a href="#people/organization/{id}">',
                '{headcount:plural("employee")}',
                '</a>'
            ]
        }],

        listeners: {
            childdoubletap: 'onChildActivate'
        }
    }],
    fields: {
        manager: {
            property: 'manager_id'
        }
    },

    controller: 'organizationbrowse',
    viewModel: {
        type: 'organizationbrowse'
    },

    cls: 'organizationbrowse',
    bind: {
        store: '{organizations}'
    }
});
