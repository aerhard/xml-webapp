/**
 * A grid component showing the results of a PDF fulltext search and containing a search form.
 */
Ext.define('Zen.view.component.pdf.SearchGrid', {
    extend: 'Zen.view.component.SearchGrid',
    alias : 'widget.pdf-searchgrid',

    title: 'PDF-Volltextsuche',

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.columns = me.getColumnConfig();
        me.callParent(arguments);
        me.store.load();
    },

    getFeatures: function () {
        return [Ext.create('Ext.grid.feature.Grouping', {
            collapsible   : false,
            groupHeaderTpl: ['{name}']
        })];
    },

    createDockedItems: function () {
        var me = this;
        return [
            {
                xtype         : 'toolbar',
                cls           : 'header-toolbar',
                itemId        : 'toptoolbar',
                enableOverflow: true,
                items         : me.createMainSearchBar()
            },
            {
                xtype      : 'pagingtoolbar',
                store      : me.store,
                dock       : 'bottom',
                displayInfo: true
            }
        ];
    },

    getColumnConfig: function () {
        return [
            {
                menuDisabled: true,
                header      : 'Resultate',
                dataIndex   : 'desc',
                flex        : 2
            }
        ];
    },

    createMainSearchBar: function () {
        var me = this;
        return [
            {
                xtype   : 'autocompletecombo',
                layout  : 'hbox',
                name    : 'fulltext',
                flex    : 1,
                minWidth: 140
            },
            {
                xtype  : 'button',
                glyph : '58885@iconfont',
//                text   : '<span class="zencon-search"/>',
                tooltip: 'Suchen',
                handler: function (btn) {
                    me.fireEvent('searchbtnclick', btn);
                }
            }
        ];
    }
});
