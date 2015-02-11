/**
 * An abstract grid class.
 */
Ext.define('Zen.view.component.AbstractGrid', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.abstractgrid',

    requires: ['Ext.grid.plugin.DragDrop', 'Ext.selection.RowModel', 'Ext.form.Panel', 'Ext.grid.column.Action',
        'Ext.form.Label', 'Ext.form.field.ComboBox'],

    remoteFilter: false,
    buffered    : false,

    height: 'auto',

    autoDestroy: true,
    frame      : true,
    loadMask   : true,

    title        : 'Suche',
    preventHeader: true,

    removalQueue: [],

    columns     : [],
    searchFields: [],

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.addEvents('storeupdate', 'search', 'addsearchfield', 'linkclick', 'linkcontextmenu');
        me.store = me.getStoreConfig();
        me.store.getProxy().url = me.getStoreUrl();
        me.viewConfig = me.getViewConfig();
        me.linkContextMenu = me.createLinkContextMenu();
        me.selModel = Ext.create('Ext.selection.RowModel', {
            mode         : 'MULTI',
            pruneRemoved : true,
            allowDeselect: true
        });
        me.dockedItems = me.createDockedItems();
        me.store.on('load', function (store) {
            me.fireEvent('storeupdate', store, me, true);
        }, me);
        me.getSelectionModel().on('select', function (unused_sm, record) {
            me.fireEvent('updatekey', me, record.data.key);
        });
        me.callParent(arguments);
    },

    createLinkContextMenu: function () {
        return Ext.widget('linkcontextmenu');
    },

    createDockedItems: function () {
        return [
            {
                xtype : 'toolbar',
                cls   : 'header-toolbar',
                itemId: 'toptoolbar',
                items : this.createMainSearchBar()
            },
            {
                xtype : 'toolbar',
                itemId: 'bottomtoolbar',
                cls   : 'bottom-toolbar',
                dock  : 'bottom',
                items : [
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'label',
                        cls  : 'bottom-toolbar-text-item',
                        name : 'resultmessage',
                        text : 'Keine Suchergebnisse'
                    }
                ]
            }
        ];
    },

    getViewConfig: function () {
    },

    getStoreConfig: function () {
    },

    getStoreUrl: function () {
        return Zen.Global.getPath('search') + this.cat;
    },

    processRemovalQueue: function () {
        var me = this, i, matches, l = me.removalQueue.length, key, remove;
        remove = function (record) {
            me.store.remove(record);
        };
        for (i = 0; i < l; i += 1) {
            key = me.removalQueue[i];
            matches = me.store.query('key', key);
            matches.each(remove);
        }
        me.fireEvent('storeupdate', me.store, me);
        this.removalQueue = [];
    },

    colDate: function (dataIndex) {
        return {
            menuDisabled: true,
            header      : 'Datierung',
            align       : 'right',
            dataIndex   : dataIndex,
            flex        : 2,
            renderer    : function (dateString) {
                return dateString.substring(10);
            }
        };
    },

    colDefault: function (dataIndex, header) {
        return {
            menuDisabled: true,
            header      : header,
            dataIndex   : dataIndex,
            flex        : 2
        };
    },

    colThin: function (dataIndex, header) {
        return {
            menuDisabled: true,
            header      : header,
            dataIndex   : dataIndex,
            flex        : 1
        };
    },

    colSmall: function (dataIndex, header) {
        return {
            menuDisabled: true,
            header      : header,
            dataIndex   : dataIndex,
            flex        : 1,
            renderer    : function (value) {
                if (value === null) {
                    return;
                }
                return '<span class="column-text-small">' + value + '</span>';
            }
        };
    },

    getColumnConfig: function () {
    },

    createMainSearchBar: function () {
    },

    addCustomListeners: function () {
        var me = this;
        me.mon(me.el, 'click', function (e, el, eOpts) {
            me.fireEvent('linkclick', me, e, el, eOpts);
        }, me, {
            delegate: 'a.link'
        });
        me.mon(me.el, 'contextmenu', function (e, el, eOpts) {
            me.fireEvent('linkcontextmenu', me.linkContextMenu, e, el, eOpts);
        }, me, {
            delegate: 'a.link'
        });
    },

    addTooltip: function () {
        var me = this;
        me.tooltip = Ext.widget('linktooltip', {
            target: me.el
        });
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.addCustomListeners();
        if (Zen.Global.getUIPref('tooltips')) {
            me.addTooltip();
        }
    },

    beforeDestroy: function () {
        var me = this;
        if (me.menu) {
            me.menu.destroy();
        }
        if (me.linkContextMenu) {
            me.linkContextMenu.destroy();
        }
        if (me.tooltip) {
            me.tooltip.destroy();
        }
        me.callParent(arguments);
    }
});
