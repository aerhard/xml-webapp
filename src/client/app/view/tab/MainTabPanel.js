/**
 * The main tab panel of the viewport.
 */
Ext.define('Zen.view.tab.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias : 'widget.maintabpanel',

    autoDestroy: true,
    closeAction: 'destroy',

    componentCls: 'main-tabpanel',
    bodyCls     : 'main-tabpanel-body',

    padding : '8px 8px 8px 8px',

    /**
     * The maximum width of the tabs.
     */
    maxTabWidth: 200,

    initComponent: function () {
        var me = this;
        me.items = [Zen.view.DoublePaneFactory.createTab('corresp')];
        me.callParent(arguments);
    },

    listeners: {
        afterrender: function (panel) {
            var bar = panel.tabBar;
            bar.insert(1, [
                {
                    xtype: 'plustab',
                    menu : {
                        items: this.getPlusTabMenuItemConfig(Zen.Global.getUIPref('searchMenuItems'))
                    },
                    text : '+'
                }
            ]);
        }
    },

    /**
     * Gets the config of the plus tab menu items.
     *
     * @private
     * @return {Object[]} An array of the config objects.
     */
    getPlusTabMenuItemConfig: function (searchMenuItems) {
        var i, type, disabled, searchButtons = [], buttonCfg, Factory = Zen.view.DoublePaneFactory;
        for (i = 0; i < searchMenuItems.length; i += 1) {
            type = searchMenuItems[i];
            if (type === '-') {
                searchButtons.push('-');
            } else {
                buttonCfg = Factory.cfg[type];
                disabled = buttonCfg.disabled || false;
                searchButtons.push({
                    text    : buttonCfg.title,
                    disabled: disabled,
                    typ     : type,
                    iconCls : buttonCfg.iconCls + ' black'
                });
            }
        }
        return searchButtons;
    },

    /**
     * Adds a new tab to the tab panel and shows it immediately.
     *
     * @param {Zen.view.tab.AbstractTab} tab The component to add to the main tab panel.
     */
    addAndShow: function (tab) {
        var me = this;
        me.add(tab);
        tab.show();
        me.setActiveTab(tab);
    },

    /**
     * Removes the active tab in the tab panel.
     */
    removeActiveTab: function () {
        var me = this, activeTab = me.getActiveTab();
        if (activeTab) {
            me.remove(activeTab);
        }
    }
});
