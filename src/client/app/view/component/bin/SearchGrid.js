/**
 * A grid showing the contents of the trash bin.
 */
Ext.define('Zen.view.component.bin.SearchGrid', {
    extend: 'Zen.view.component.AbstractGrid',
    alias : 'widget.bin-searchgrid',

    title: 'Papierkorb',

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.columns = me.getColumnConfig();
        me.callParent(arguments);
        me.store.getProxy().url = Zen.Global.getPath('binlist');
        me.store.load();
    },

    getViewConfig: function () {
        return {
            preserveScrollOnRefresh: true
        };
    },

    getStoreConfig: function () {
        return Ext.create('Zen.store.component.SearchGrid');
    },

    getColumnConfig: function () {
        return [
            {
                menuDisabled: true,
                header      : 'Schlüssel',
                dataIndex   : 'key',
                width       : 100
            },
            {
                menuDisabled: true,
                header      : 'Datum, Zeit',
                dataIndex   : 'dt',
                renderer    : function (dateString) {
                    var dt = new Date(dateString);
                    return Ext.Date.format(dt, 'j.m.Y, H:i');
                },
                width       : 120
            },
            {
                menuDisabled: true,
                header      : 'Beschreibung',
                dataIndex   : 'desc',
                flex        : 2
            },
            {
                xtype       : 'actioncolumn',
                menuDisabled: true,
                hideable    : false,
                width       : 30,
                items       : [
                    {
                        xtype  : 'button',
                        action : 'restore',
                        tooltip: 'Wiederherstellen',
                        //        iconCls : 'icon-restore',
                        handler: function (grid, rowIndex) {
                            var key = grid.getStore().getAt(rowIndex).get('key');
                            Zen.app.fireEvent('restore', key);
                        }
                    }
                ]
            }
        ];
    },

    createMainSearchBar: function () {
        var me = this, searchBarItems;
        searchBarItems = [
            {
                xtype  : 'button',
                action : 'search',
                tooltip: 'Neu laden',
                text   : '<span class="zencon-refresh"/>',
                handler: function () {
                    me.fireEvent('searchbtnclick', me);
                }
            }
        ];
        return searchBarItems;
    }
});
