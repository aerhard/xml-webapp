/**
 * A menu for editing the view permissions of a database record.
 */
Ext.define('Zen.view.component.StatusMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.statusmenu',

    title: 'Publikationsstatus',

    initComponent: function () {
        var me = this, group, groups;
        me.items = [];
        if (me.statusLabels) {
            for (item in me.statusLabels) {
                me.items.push({
                    name   : item,
                    text   : me.statusLabels[item],
                    cls    : 'noicon',
                    iconCls: 'hide'
                });
            }
        }
        me.callParent(arguments);
    }
});
