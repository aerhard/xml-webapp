/**
 * A menu for editing the view permissions of a database record.
 */
Ext.define('Zen.view.component.PermissionsMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.permissionsmenu',

    title: 'Sichtbarkeit',

    initComponent: function () {
        var me = this, group, groups;
        me.items = [];
        groups = Zen.Global.getPref('groups');
        if (groups) {
            for (group in groups) {
                me.items.push({
                    name   : group,
                    text   : groups[group],
                    cls    : 'noicon',
                    iconCls: 'hide'
                });
            }
        }
        me.callParent(arguments);
    }
});
