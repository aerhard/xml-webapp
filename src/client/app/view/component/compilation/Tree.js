/**
 * A tree component showing the structure of a user's compilation of documents.
 */
Ext.define('Zen.view.component.compilation.Tree', {
    extend: 'Zen.view.component.AbstractTree',
    alias : 'widget.compilationtree',

    height: 'auto',
    key   : null,
    master: true,

    initComponent: function () {
        var me = this;
        me.addEvents('loadfromrecord');
        me.folderMenu = me.createFolderMenu();
        me.callParent(arguments);
        me.expandNode(me.getRootNode());
        me.on('select', function (unused_sm, record) {
            me.fireEvent('updatekey', me, record.data.id);
        });
    },

    createStore: function () {
        return Ext.create('Zen.store.component.Tree', {
            url: Zen.Global.getPath('compilation'),
            key: Zen.Global.getPref('currentUser')
        });
    },

    createDockedItems: function () {
        return [
            {
                xtype         : 'toolbar',
                enableOverflow: true,
                dock          : 'top',
                defaults      : {
                    xtype    : 'tool',
                    renderTpl: ['<span></span>']
                },
                items         : [
                    {
                        componentCls: 'zencon-undo',
                        action      : 'reload',
                        tooltip     : 'Erneut laden'
                    },
                    {
                        componentCls: 'zencon-plus',
                        action      : 'create',
                        tooltip     : 'Neuen Ordner anlegen'
                    },
                    {
                        componentCls: 'zencon-edit',
                        action      : 'rename',
                        tooltip     : 'Umbenennen',
                        disabled    : true
                    },
                    {
                        componentCls: 'zencon-remove',
                        action      : 'removecompilation',
                        tooltip     : 'L&ouml;schen',
                        disabled    : true
                    }
                ]
            }
        ];
    },

    createFolderMenu: function () {
        var me = this;
        return Ext.widget('compilation-treecontextmenu', {
            tree: me
        });
    },

    beforeDestroy: function () {
        var me = this;
        if (me.folderMenu) {
            me.folderMenu.destroy();
        }
        me.callParent(arguments);
    }
});
