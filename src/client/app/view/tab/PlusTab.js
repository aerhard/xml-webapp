/**
 * The plus tab in the main tab panel, This class visually corresponds to {@link Ext.tab.Tab}, but doesn't inherit its properies from {@link Ext.tab.Tab}.
 */
Ext.define('Zen.view.tab.PlusTab', {
    extend: 'Ext.button.Button',
    alias : 'widget.plustab',

    isTab   : true,
    baseCls : Ext.baseCSSPrefix + 'tab',
    scale   : false,
    position: 'top',

    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        if (me.card) {
            me.setCard(me.card);
        }
        me.overCls = ['over', me.position + '-over'];
    },

    getFramingInfoCls: function () {
        return this.baseCls + '-' + this.ui + '-' + this.position;
    },

    beforeRender: function () {
        var me = this, tabBar = me.up('tabbar'), tabPanel = me.up('tabpanel');
        me.callParent();
        me.addClsWithUI(me.position);

        // Propagate minTabWidth and maxTabWidth settings from the owning TabBar then TabPanel
        me.minWidth = (tabBar) ? tabBar.minTabWidth : me.minWidth;
        if (!me.minWidth && tabPanel) {
            me.minWidth = tabPanel.minTabWidth;
        }
        me.maxWidth = (tabBar) ? tabBar.maxTabWidth : me.maxWidth;
        if (!me.maxWidth && tabPanel) {
            me.maxWidth = tabPanel.maxTabWidth;
        }
    },

    onRender: function () {
        var me = this;
        me.setElOrientation();
        me.callParent(arguments);
    },

    setElOrientation: function () {
        var position = this.position;
        if (position === 'left' || position === 'right') {
            this.el.setVertical(position === 'right' ? 90 : 270);
        }
    },

    setCard: function (card) {
        var me = this;

        me.card = card;
        me.setText(me.title || card.title);
        me.setIconCls(me.iconCls || card.iconCls);
        me.setIcon(me.icon || card.icon);
        me.setGlyph(me.glyph || card.glyph);
    }
});
