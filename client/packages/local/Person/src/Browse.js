Ext.define('App.view.person.Browse', {
    extend: 'App.view.widgets.Browse',
    xtype: 'personbrowse',
    requires: [
        'App.view.person.BrowseController',
        'App.view.person.BrowseModel',
        'App.view.widgets.BrowseToolbar',
        'Ext.plugin.ListPaging'
    ],

    tbar: {
        xtype: 'personbrowsetoolbar'
    },

    items: [{
        xtype: 'grid',
        emptyText: 'No employee was found to match your search',
        bind: '{people}',
        ui: 'listing',

        selectable: {
            disabled: true
        },

        plugins: [{
            type: 'listpaging',
            autoPaging: true
        }],

        columnMenu: {
            items: {
                groupByThis: false,
                showInGroups: false
            }
        },

        columns: [{
            dataIndex: 'picture',
            menuDisabled: true,
            hideable: false,
            sortable: false,
            align: 'center',
            width: 58,
            cell: {
                encodeHtml: false
            },
            tpl: '<div class="picture" style="background-image: url({picture})"></div>'
        }, {
            text: 'Name / Title',
            dataIndex: 'lastname',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<a class="item-title" href="#{url}">{fullname}</a>',
                '<div class="item-caption">{title}</div>'
            ]
        }, {
            text: 'Organization',
            dataIndex: 'organization.name',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="organization">',
                '<a class="item-title" href="#{url}">{name}</a>',
                '<div class="item-caption">',
                'Managed by <a href="#{manager.url}">{manager.fullname}</a>',
                '</div>',
                '</tpl>'
            ]
        }, {
            text: 'Office',
            dataIndex: 'office.name',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<tpl for="office">',
                '<a class="item-title" href="#{url}">{name}</a>',
                '<div class="item-caption">{city}, {country}</div>',
                '</tpl>'
            ]
        }, {
            sortable: false,
            dataIndex: 'email',
            text: 'Email/Phone',
            flex: 1,
            cell: {
                encodeHtml: false
            },
            tpl: [
                '<div class="item-info"><span class="x-fa fa-envelope-o"></span> {email}</div>',
                '<div class="item-info"><span class="x-fa fa-phone"></span> {phone}</div>'
            ]
        }],

        listeners: {
            childdoubletap: 'onChildActivate'
        }
    }],
    fields: {
        office: {
            property: 'office_id'
        },
        organization: {
            property: 'organization_id'
        }
    },

    controller: 'personbrowse',
    viewModel: {
        type: 'personbrowse'
    },

    cls: 'personbrowse',
    bind: {
        store: '{people}'
    }
});
