/**
 * The context menu attached to &lt;a&gt; elements with the class `link`.
 */
Ext.define('Zen.view.tab.LinkContextMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.linkcontextmenu',

    items: [Zen.Global.getActionConfig('openDetailTab'), '-', Zen.Global.getActionConfig('editDoc'),
        Zen.Global.getActionConfig('memorize')]
}); 