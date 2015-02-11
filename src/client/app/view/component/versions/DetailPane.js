/**
 * A detail pane showing a previous version of a document.
 */
Ext.define('Zen.view.component.versions.DetailPane', {
    extend: 'Zen.view.component.DetailPane',
    alias : 'widget.versions-detailpane',

    layout: 'fit',
    frame : true,

    initToolbar: function () {
        var me = this, toolbar = me.down('toolbar');
        me.removeCls('nopadding');
        toolbar.add('->', me.getViewCycleConfig());
    },

    addCustomListeners: function () {
        return;
    },

    createMenu: function () {
        return;
    },

    constructQuery: function (key, rev) {
        var me = this, queryPath;
        queryPath = Zen.Global.getQueryPathFromKey(key);
        me.rev = rev || '';
        return queryPath + '?key=' + key + '&ueb=' + me.viewMode + '&rev=' + me.rev;
    }
});
