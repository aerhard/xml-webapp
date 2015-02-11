/**
 * The context menu added to documents cited in a compilation's {@link Zen.view.component.DetailPane}.
 */
Ext.define('Zen.view.component.compilation.CitContextMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.compilation-citcontextmenu',

    items: [Zen.Global.getActionConfig('openDetailTab'), '-', Zen.Global.getActionConfig('editDoc'),
        Zen.Global.getActionConfig('memorize'), Zen.Global.getActionConfig('removeFromCompilation')]
}); 