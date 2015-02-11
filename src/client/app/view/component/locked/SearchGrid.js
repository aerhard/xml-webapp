/**
 * A grid showing the documents currenly locked for editing.
 */
Ext.define('Zen.view.component.locked.SearchGrid', {
    extend: 'Zen.view.component.AbstractGrid',
    alias : 'widget.locked-searchgrid',

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.addEvents('unlock');
        me.columns = me.getColumnConfig();
        me.callParent(arguments);
        me.store.getProxy().url = Zen.Global.getPath('locklist');
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
                header      : 'Benutzer',
                dataIndex   : 'user',
                width       : 100
            },
            {
                menuDisabled: true,
                header      : 'Zeit',
                dataIndex   : 'time',
                width       : 100
            },
            {
                menuDisabled: true,
                header      : 'Beschreibung',
                dataIndex   : 'desc',
                flex        : 2
            },
            {
                menuDisabled: true,
                header      : 'Dokument',
                dataIndex   : 'key',
                width       : 100
            },
            {
                xtype       : 'glyphiconactioncolumn',
                menuDisabled: true,
                hideable    : false,
                width       : 30,
                items       : [
                    {
                        xtype   : 'button',
                        action  : 'unlock-this',
                        tooltip : 'Dieses Dokument freigeben',
                        getClass: function (unused_v, unused_meta, record) {
                            if (typeof record.get('unlock') !== 'undefined') {
                                return 'zencon-unlocked';
                            }
                            return 'x-hide-display';
                        },
                        handler : function (grid, rowIndex) {
                            var key = grid.getStore().getAt(rowIndex).get('key');
                            this.up('locked-searchgrid').fireEvent('unlock', this.up('locked-searchgrid'), key);
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
                    me.fireEvent('searchbtnclick', this);
                }
            },
            '->',
            {
                text   : 'Alle eigenen Dokumente freigeben',
                iconCls: 'zencon-unlocked',
                handler: function (cmp) {
                    cmp.up('locked-searchgrid').fireEvent('unlock', cmp.up('locked-searchgrid'));
                }
            }
        ];
        return searchBarItems;
    }
});
