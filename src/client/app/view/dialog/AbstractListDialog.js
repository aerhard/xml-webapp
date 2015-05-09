/**
 * An abstract dialog containing a double pane with a list on the left side.
 */
Ext.define('Zen.view.dialog.AbstractListDialog', {
    extend: 'Ext.window.Window',
    alias : 'widget.abstractlistdialog',

    closeAction: 'destroy',
    cls        : 'zen-grid',
    modal      : true,

    componentCls: 'abstract-list-dialog',

    layout: {
        type: 'border'
    },

    initComponent: function (config) {
        var me = this, viewSize;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        viewSize = Ext.getBody().getViewSize();
        me.width = viewSize.width * 0.8;
        me.height = viewSize.height * 0.8;
        me.items = [me.getLeftConfig(), me.getRightConfig()];
        me.callParent(arguments);
    },

    getLeftConfig: function () {
        return this.leftConfig;
    },

    getRightConfig: function () {
        return this.rightConfig;
    },

    buttons: [
        {
            text   : 'Schlie&szlig;en',
            handler: function (cmp) {
                cmp.up('window').close();
            }
        }
    ]

});
