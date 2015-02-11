/**
 * The context menu of a {@link Zen.view.component.SearchGrid}.
 */
Ext.define('Zen.view.component.SearchGridContextMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.searchgridcontextmenu',

    items: [Zen.Global.getActionConfig('openDetailTab'), '-', Zen.Global.getActionConfig('editDoc'),
        Zen.Global.getActionConfig('memorize'), Zen.Global.getActionConfig('moveToBin')]
});