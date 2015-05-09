/**
 * A panel for viewing and navigating between previous versions of a document.
 */
Ext.define('Zen.view.component.versions.Versions', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.versions',

    frame: false,

    layout: {
        type: 'border'
    },

    initComponent: function () {
        var me = this;
        me.store = me.getStoreConfig();

        me.items = [me.getGridConfig(), {
            xtype : 'versions-detailpane',
            region: 'center'
        }];

        me.callParent(arguments);
    },

    initRight: function (cmp) {
        var me = this;
        me.key = cmp.getKey();
        me.store.getProxy().url = Zen.Global.getPath('versions') + me.key;
        me.store.load();
    },

    getStoreConfig: function () {
        return Ext.create('Zen.store.component.SearchGrid');
    },

    getGridConfig: function () {
        var me = this;
        return {
            xtype        : 'grid',
            title        : 'Liste der Revisionen',
            preventHeader: false,
            region       : 'west',
            width        : 240,
            frame        : true,
            store        : me.store,
            autoDestroy  : true,
            viewConfig   : {
                preserveScrollOnRefresh: true,
                deferEmptyText         : false,
                emptyText              : "Keine fr&uuml;heren Fassungen gefunden."
            },
            split        : true,
            height       : '100%',
            columns      : [
                {
                    menuDisabled: true,
                    header      : 'Rev.',
                    dataIndex   : 'd1',
                    flex        : 3
                },
                {
                    menuDisabled: true,
                    header      : 'Datum',
                    dataIndex   : 'd2',
                    flex        : 6
                },
                {
                    menuDisabled: true,
                    header      : 'Zeit',
                    dataIndex   : 'd3',
                    flex        : 5
                },
                {
                    menuDisabled: true,
                    header      : 'Ben.',
                    dataIndex   : 'd4',
                    flex        : 3
                }
            ],
            listeners    : {
                selectionchange : function (unused_sm, records) {
          var me = this, data;
          if (records.length > 0) {
            data = records[records.length - 1].data;
            me.up('panel').down('detailpane').loadModel(data.key, data.d1);
          }
        }
            }
        };
    }
});
