Ext.define('Zen.view.window.SidePanel', {
    extend: 'Ext.panel.Panel', alias: 'widget.sidepanel', require: ['Ext.layout.container.Table'],

    title: 'Navigation',

    layout: {
        type: 'table', columns: 1
    },

    padding : '8px 0 8px 8px',

    defaults: {
        width: 200
    },

    initComponent: function () {
        var me = this;

        me.items = me.getButtonConfig(Zen.Global.getUIPref('searchMenuItems'));

        me.callParent(arguments);
    },

    /**
     * Gets the config of the buttons.
     *
     * @private
     * @return {Object[]} An array of the config objects.
     */
    getButtonConfig: function (searchMenuItems) {
        var i, type, disabled, searchButtons = [], buttonCfg, Factory = Zen.view.DoublePaneFactory;
        for (i = 0; i < searchMenuItems.length; i += 1) {
            type = searchMenuItems[i];
            if (type !== '-') {
                buttonCfg = Factory.cfg[type];
                disabled = buttonCfg.disabled || false;
                searchButtons.push({
                    xtype: 'button', text: buttonCfg.title, disabled: disabled, typ: type, iconCls: buttonCfg.iconCls
                });
            }
        }
        return searchButtons;
    }

});