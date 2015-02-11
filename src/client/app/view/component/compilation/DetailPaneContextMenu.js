/**
 * The context menu of a compilation's {@link Zen.view.component.DetailPane}.
 */
Ext.define('Zen.view.component.compilation.DetailPaneContextMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.compilation-detailpanecontextmenu',

    items: [Zen.Global.getActionConfig('openDetailTab'), '-', Zen.Global.getActionConfig('addToCompilation'), '-',
        Zen.Global.getActionConfig('editDoc'), Zen.Global.getActionConfig('memorize'), {
            text    : 'Umbenennen',
            action  : 'compilationitemrename',
            iconCls : 'zencon-edit black',
            disabled: true
        }, {
            text    : 'Entfernen',
            action  : 'compilationitemremove',
            iconCls : 'zencon-remove black',
            disabled: true
        }]
}); 