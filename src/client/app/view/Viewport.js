/**
 * The viewport of the application.
 */
Ext.define('Zen.view.Viewport', {
    extend  : 'Ext.container.Viewport',
    requires: ['Ext.layout.container.Border'],

    xtype : 'app-main',
    layout: {
        type: 'border'
    },

    /**
     * The message box of the viewport.
     * @private
     */
    msgBox: null,

    /**
     * Returns the message box of the viewport.
     * @return {Zen.view.window.MessageBox} the message box.
     */
    getMsgBox: function () {
        return this.msgBox;
    },

    /**
     * Initializes the viewport and its components (the message box, the {@link Zen.view.window.MainMenu main menu} and the {@link Zen.view.tab.MainTabPanel main tab panel}).
     */
    initComponent: function () {
        var me = this;
        me.msgBox = Ext.widget('msgbox');
        me.items = [
            {
                region     : 'north',
                baseCls    : 'viewport-north-pane',
                dockedItems: [
                    {
                        xtype: 'mainmenu',
                        dock : 'top'
                    }
                ]
            },
            {
                xtype : 'maintabpanel',
                region: 'center'
            }
        ];
        me.callParent(arguments);
    }
});
