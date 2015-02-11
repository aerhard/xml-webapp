/**
 * A detail view of a document in the trash bin.
 */
Ext.define('Zen.view.component.bin.DetailPane', {
    extend: 'Zen.view.component.DetailPane',
    alias : 'widget.bin-detailpane',

    initToolbar: function () {
        var me = this, toolbar = this.down('toolbar');

        me.removeCls('nopadding');

        toolbar.add([
            {
                xtype  : 'button',
                action : 'restore',
                text   : 'Wiederherstellen',
                handler: function () {
                    Zen.app.fireEvent('restore', me.key);
                }
            },
            '->',
            this.getViewCycleConfig()
        ]);
    },

    adjustVisibility: function () {
        this.permissionBtnCls = 'badge-plain';
    },

    addCustomListeners: function () {
    },

    createMenu: function () {
    },

    constructQuery: function (key) {
        var me = this, queryPath;
        queryPath = Zen.Global.getQueryPathFromKey(key);
        return queryPath + '?key=' + key + '&ueb=' + me.viewMode + '&bin=bin';
    }
});
