/**
 * An abstract tree class.
 */
Ext.define('Zen.view.component.AbstractTree', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.abstracttree',

    requires: ['Ext.tree.*', 'Ext.data.*', 'Zen.Global'],

    useArrows     : true,
    trackMouseOver: false,
    rootVisible   : false,

    initComponent: function () {
        var me = this;
        me.addEvents('beforedrop');
        me.store = me.createStore();
        me.dockedItems = me.createDockedItems();
        me.viewConfig = me.createViewConfig();
        me.folderMenu = me.createFolderMenu();
        me.callParent(arguments);
    },

    createStore: function () {
    },

    createDockedItems: function () {
    },

    createViewConfig: function () {
        var me = this;
        return {
            plugins  : {
                ptype              : 'treeviewdragdrop',
                containerScroll    : true,
                allowContainerDrops: true,
                ddGroup            : 'selDD'
            },
            listeners: {
                drop      : function () {
                    me.fireEvent('drop', me);
                },
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers) {
                    me.fireEvent('beforedrop', this, node, data, overModel, dropPosition, dropHandlers);
                }
            }

        };
    },

    createFolderMenu: function () {
    }

});
