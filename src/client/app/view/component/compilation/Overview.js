/**
 * A panel giving an overview of the users' compilations.
 */
Ext.define('Zen.view.component.compilation.Overview', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.compilation-overview',

    title      : '&Uuml;bersicht',
    hideHeaders: true,
    selType    : 'rowmodel',

    viewConfig: {
        stripeRows: false,
        trackOver : false
    },

    height : 'auto',
    columns: [
        {
            text     : 'Titel',
            sortable : false,
            dataIndex: 'title',
            flex     : 1
        }
    ],

    store: Ext.create('Ext.data.ArrayStore', {
        fields: ['key', 'title'],
        data  : [
            ['all', 'Allgemein'],
            ['alx', 'Elektra'],
            ['slm', 'Salome'],
            ['sts', 'Macbeth und Don Juan']
        ]
    }),

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.addEvents('rowselected');
        me.getSelectionModel().on('select', function (unused_sm, record) {
            me.fireEvent('rowselected', me, record);
        });
    }
}); 