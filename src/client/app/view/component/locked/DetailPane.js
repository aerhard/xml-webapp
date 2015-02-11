/**
 * A detail view of a document in the trash bin.
 */
Ext.define('Zen.view.component.locked.DetailPane', {
    extend: 'Zen.view.component.DetailPane',
    alias : 'widget.locked-detailpane',

    initToolbar: function () {
        var me = this, toolbar = this.down('toolbar');

        me.removeCls('nopadding');

        toolbar.add([
            '->', this.getViewCycleConfig()
        ]);
    },

    adjustVisibility: function () {
        this.permissionBtnCls = 'badge-plain';
    },

    addCustomListeners: function () {
    },

    createMenu: function () {
        //    },
        //
        //    constructQuery: function (key) {
        //        var me = this, queryPath;
        //        queryPath = Zen.Global.getQueryPathFromKey(key);
        //        return queryPath + '?key=' + key + '&ueb=' + me.viewMode + '&bin=bin';
    }
});
