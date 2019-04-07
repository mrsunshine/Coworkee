Ext.define('App.store.Menu', {
    extend: 'Ext.data.Store',
    alias: 'store.menu',

    data: [{
        id: 'home',
        xtype: 'home',
        text: 'Home',
        icon: 'home',
        packageName: 'Home'
    }, {
        id: 'people',
        xtype: 'personbrowse',
        text: 'Employees',
        icon: 'users',
        packageName: 'Person'
    }, {
        id: 'organizations',
        xtype: 'organizationbrowse',
        text: 'Organizations',
        icon: 'sitemap',
        packageName: 'Organization'
    }, {
        id: 'offices',
        xtype: 'officebrowse',
        text: 'Offices',
        icon: 'globe',
        packageName: 'Office'
    }, {
        id: 'history',
        xtype: 'historybrowse',
        text: 'Activity',
        icon: 'history',
        packageName: 'History'
    }]
});
