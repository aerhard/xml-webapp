/**
 * The context menu of a {@link Zen.view.component.compilation.Tree}.
 */
Ext.define('Zen.view.component.compilation.TreeContextMenu', {
    extend: 'Ext.menu.Menu',
    alias : 'widget.compilation-treecontextmenu',

    items: [Zen.Global.getActionConfig('openDetailTab'), '-', Zen.Global.getActionConfig('addToCompilation'), {
        text   : 'Neuen Ordner anlegen',
        action : 'compilationitemcreate',
        iconCls: 'zencon-plus black'
    }, '-', Zen.Global.getActionConfig('editDoc'), Zen.Global.getActionConfig('memorize'), {
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