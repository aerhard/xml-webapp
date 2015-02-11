/**
 * An abstract tab with two content panes
 */
Ext.define('Zen.view.tab.AbstractTab', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.abstracttab',

    autoDestroy: true,
    height     : 'auto',
    closable   : true,
    closeAction: 'destroy',
    cls        : 'zen-grid',

    layout: {
        type: 'border'
    },

    doAddListeners: true,

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.items = [me.getLeftConfig(), me.getRightConfig()];
        me.callParent(arguments);
    },

    updateConfig: function (cfg) {
        var me = this;
        if (me.type === cfg.type) {
            Ext.log('AbstractTab.updateConfig(): same category -- nothing changed in tab.');
        } else {
            Ext.log('old tab: ' + me.type + 'new cat in tab: ' + cfg.type);
            Ext.apply(me, Ext.apply(me.initialConfig, cfg));
            me.setTitle(me.title);
        }

    },

    initChildren: function () {
        var me = this;
        me.items = [me.getLeftConfig(), me.getRightConfig()];
    },

    getLeftConfig: function () {
        return this.leftConfig;
    },

    getRightConfig: function () {
        return this.rightConfig;
    },

    setRightConfigXType: function (xtype) {
        this.rightConfig.xtype = xtype;
    }
});
