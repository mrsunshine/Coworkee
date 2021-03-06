Ext.define('App.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	requires: ['Ext.Package'],
	alias: 'controller.main',


	routes: {
		':type(/:args)?': {
			action: 'handleNavigationRoute',
			conditions: {
				// NOTE(SB): how to build this list automatically from the Menu store?
				':type': '(history|home|offices|organizations|people)',
				':args': '(.*)'
			}
		},
		':type/:id(/:args)?': {
			before: 'loadPackage',
			action: 'handleDataRoute',
			conditions: {
				':type': '(office|organization|person)',
				':id': '([a-f0-9-]{36}|create|edit)',
				':args': '(.*)'
			}
		}
	},

	listen: {
		global: {
			togglemainmenu: 'onToggleMainMenu',
			navigationback: 'onNavigationBack'
		}
	},

	/**
	 * @param {String} ref Component reference, MUST be valid.
	 * @protected
	 */
	activate: function (ref)
	{
		var view = ref.isComponent ? ref : this.lookup(ref),
			child = view,
			parent;

		while (parent = child.getParent())
		{
			parent.setActiveItem(child);
			child = parent;
		}

		return view;
	},

	getContainerForViewId: function ()
	{
		return this.getView();
	},

	ensureView: function (id, config, route)
	{
		var container = this.getContainerForViewId(id),
			item = container.child('component[viewId=' + id + ']'),
			reset = !!item;

		if (!item)
		{
			item = container.add(Ext.apply({viewId: id}, config));
		}

		if (Ext.isDefined(item.config.route))
		{
			item.setRoute(route);
		}

		// Reset the component (form?) only if previously instantiated (i.e. with outdated data).
		if (reset && Ext.isFunction(item.reset))
		{
			item.reset();
		}

		return item;
	},

	handleNavigationRoute: function (type, args)
	{
		var me = this,
			store = Ext.getStore('Menu'),
			entry = store.getById(type),
			packageName = entry.get('packageName');

		this.lookup('mainmenu').setSelection(entry);
		if (!entry)
		{
			return null;
		}

		if (Ext.Package.isLoaded(packageName))
		{
			this.activate(
				this.ensureView(type, {
					xtype: entry.get('xtype'),
					title: entry.get('text'),
					packageName: entry.get('packageName')
				}, args));
		}
		else
		{
			this.getView().setMasked({
				message: 'Loading Package...'
			});

			Ext.Package.load(packageName).then(function ()
			{
				me.getView().setMasked(null);
				me.activate(
					me.ensureView(type, {
						xtype: entry.get('xtype'),
						title: entry.get('text'),
						packageName: entry.get('packageName')
					}, args));
			});
		}

	},

	loadPackage: function(type, id, arg1, arg2) {
		const me = this;
		const action = arg2 ? arg2 : arg1;
		let packageName;

		switch (type) {
			case 'people':
			case 'person':
				packageName = 'Person';
				break;
			case 'organizations':
			case 'organization':
				packageName = 'Organization';
				break;
			case 'offices':
			case 'office':
				packageName = 'Office';
				break;
		}

		if (Ext.Package.isLoaded(packageName))
		{
			action.resume();
		}
		else
		{
			this.getView().setMasked({
				message: 'Loading Package...'
			});

			Ext.Package.load(packageName).then(function ()
			{
				me.getView().setMasked(null);
				action.resume();
			});
		}
	},

	handleDataRoute: function (type, id, args)
	{
		var me = this,
			args = Ext.Array.clean((args || '').split('/')),
			Model = App.model[Ext.String.capitalize(type)],
			action, xtype, view;

		// determine the requested action for the given "type":
		// - #{type}/create: create a new "type"
		// - #{type}/{id}: show record with "id"
		// - #{type}/{id}/edit: edit record with "id"
		if (id == 'create')
		{
			action = 'create';
			id = null;
		}
		else if (args[0] == 'edit')
		{
			action = 'edit';
			args.shift();
		}
		else
		{
			action = 'show';
		}

		xtype = type + action;

		// leave a developer message in case of new types addition
		if (!Ext.ClassManager.getNameByAlias('widget.' + xtype))
		{
			Ext.log.error('Invalid route: no view for xtype: ' + xtype);
		}

		view = me.ensureView(
			xtype,
			{
				xtype: xtype
			}
		);

		if (id == null)
		{
			view.setRecord(new Model());
			me.activate(view);
			return;
		}

		Ext.Viewport.setMasked({xtype: 'loadmask'});
		Model.load(id, {
			callback: function (record)
			{
				view.setRecord(record);
				me.activate(view);
				Ext.Viewport.setMasked(false);

				if (type === 'person')
				{
					var user = me.getViewModel().get('user');
					if (record.get('id') != user.get('id'))
					{
						me.fireEvent('actionlog', 'profile', record);
					}
				}
			}
		});
	},

	onToggleMainMenu: function (expanded)
	{
		var menu = this.lookup('mainmenu');
		if (expanded === undefined)
		{
			expanded = !menu.getExpanded();
		}

		menu.setExpanded(expanded);
	},

	onNavigationBack: function ()
	{
		Ext.util.History.back();
	}
});
