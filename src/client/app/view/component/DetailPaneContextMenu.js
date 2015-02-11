/**
 * The context menu of a {@link Zen.view.component.DetailPane}.
 */
Ext.define('Zen.view.component.DetailPaneContextMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.detailpanecontextmenu',

    items: [Zen.Global.getActionConfig('openDetailTab'), '-', Zen.Global.getActionConfig('editDoc'),
        Zen.Global.getActionConfig('memorize'), Zen.Global.getActionConfig('moveToBin')]
});