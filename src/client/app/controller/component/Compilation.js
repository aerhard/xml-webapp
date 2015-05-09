/**
 * Controller class for compilation panels.
 */
Ext.define('Zen.controller.component.Compilation', {
    extend: 'Ext.app.Controller',

    init: function () {

        Zen.app.on({
            compilationiteminsert: this.addTreeItem,
            compilationitemcreate: this.createTreeItem,
            compilationitemrename: this.renameTreeItem,
            compilationitemremove: this.removeTreeItem,
            scope                : this
        });

        this.control({
            'compilation-treecontextmenu menuitem'      : {
                click: this.onContextButtonTree
            },
            'compilation-citcontextmenu menuitem'       : {
                click: this.onContextButtonPane
            },
            'compilation-detailpanecontextmenu menuitem': {
                click: this.onContextButtonPane
            },
            'compilation-overview'                      : {
                rowselected: this.onRowSelected
            },

            'compilationtree'                               : {
                beforedrop     : this.prepareDropData,
                drop           : this.onDrop,
                itemcontextmenu: this.openContextMenu,
                loadfromrecord : this.loadTreeFromRecord
            },
            'compilationtree tool[action=reload]'           : {
                click: this.reloadTree
            },
            'compilationtree tool[action=rename]'           : {
                click: this.renameTreeItem
            },
            'compilationtree tool[action=create]'           : {
                click: this.createTreeItem
            },
            'compilationtree tool[action=removecompilation]': {
                click: this.removeTreeItemCollationTree
            }
        });
    },

    onRowSelected: function (cmp, record) {
        var tree = cmp.up('compilation-flipbox').down('compilationtree');
        tree.fireEvent('loadfromrecord', tree, record);
        tree.expand();
    },

    onContextButtonTree: function (cmp) {
        Zen.app.fireEvent(cmp.action, cmp.up('menu').key, cmp.up('menu').tree);
    },

    onContextButtonPane: function (cmp) {
        var m = cmp.up('menu'), action = cmp.action;
        if (action === 'compilationiteminsert') {
            this.itemInsert(m.key, m.parentCmp);
        } else if (action === 'compilationitemremove') {
            this.itemRemove(m.key, m.uuid, m.parentCmp);
        } else {
            Zen.app.fireEvent(action, m.key);
        }
    },

    addTreeItem: function (unused, tree) {
        var key = tree.getSelectionModel().getLastSelected().get('id');
        this.itemInsert(key, tree);
    },

    itemInsert: function (key, parentCmp) {
        if (typeof key === 'string') {
            Zen.Global.jsonRequest({
                url     : Zen.Global.getPath('compilationadd') + key,
                callback: function (msg) {
                    Zen.app.fireEvent('shortmessage', 'Eingef&uuml;gt', msg);
                    parentCmp.fireEvent('updatekey', parentCmp, key);
                }
            });
        }
    },

    itemRemove: function (key, uuid, parentCmp) {
        var parentKey = parentCmp.key || null;
        if (typeof key === 'string') {
            Zen.Global.jsonRequest({
                url     : Zen.Global.getPath('compilationremove') + parentKey + '&uuid=' + uuid,
                callback: function (msg) {
                    Zen.app.fireEvent('shortmessage', 'Entfernt', msg);
                    parentCmp.fireEvent('updatekey', parentCmp, parentKey);
                }
            });
        }
    },

    /**
     * reloads the tree data from the server
     *
     * @param {Ext.Component} cmp Any child component of the tree component to perform the action on.
     */
    reloadTree: function (cmp) {
        cmp.up('treepanel').store.load();
    },

    /**
     * initializes a new tree store form a category record.
     *
     * @param {Ext.Component} cmp The treepanel component
     * @param {Ext.data.Model} record The category record to load the config from.
     *            The function only considers the object property
     *            record.data.key
     */
    loadTreeFromRecord: function (cmp, record) {
        var title = record.data.title || '[Ohne Titel]';
        cmp.setTitle(title);
        cmp.store.setApi(record.data.key);
        cmp.store.load();
    },

    /**
     * renames a tree node
     *
     * @param {Ext.Component} cmp Any child component of the tree panel.
     * @param {Ext.Component} tree The tree panel. (optional)
     */
    renameTreeItem: function (cmp, tree) {
        var descText, treePanel, record;
        treePanel = ( typeof cmp === 'object') ? cmp.up('treepanel') : tree;
        record = treePanel.getSelectionModel().getLastSelected() || null;
        if (record !== null) {
            descText = record.get('text');
            if (!record.get('leaf')) {
                Ext.MessageBox.prompt('Umbenennen', null, function (btn, text) {
                    if ((btn === 'ok') && text.length > 0) {
                        record.set('text', text);
                        treePanel.store.sync();
                    }
                }, treePanel, false, descText);
            }
        }
    },

    /**
     * creates a new tree node
     *
     * @param {Ext.Component} cmp Any child component of the tree panel.
     * @param {Ext.Component} tree The tree panel. (optional)
     */
    createTreeItem: function (cmp, tree) {
        var parentNode, record, treePanel;
        treePanel = ( typeof cmp === 'object') ? cmp.up('treepanel') : tree;
        record = treePanel.getSelectionModel().getLastSelected() || null;
        parentNode = (record === null) ? treePanel.getRootNode() : (record.get('leaf')) ? record.parentNode : record;

        Ext.MessageBox.prompt('Neuen Ordner anlegen', 'Name:', function (btn, text) {
            var appendObj;
            if ((btn === 'ok') && text.length > 0) {
                appendObj = {
                    text  : text,
                    leaf  : false,
                    loaded: true
                };
                // bei compilationtree keine id vergeben, nur bei
                // clipboard
                if (treePanel.xtype !== 'compilationtree') {
                    appendObj.id = 'a' + Zen.Global.generateUid();
                }
                parentNode.appendChild(appendObj);
                treePanel.store.sync();
            }
        });
    },

    // (TODO prüfen: nur bei clipboard?)
    /**
     * removes a tree node
     *
     * @param {Ext.Component} cmp Any child component of the treepanel
     * @param {Ext.Component} tree The treepanel (optional)
     */
    removeTreeItem: function (cmp, tree) {
        var treePanel, record, descText;
        treePanel = ( typeof cmp === 'object') ? cmp.up('treepanel') : tree;
        record = treePanel.getSelectionModel().getLastSelected() || null;
        if (record !== null) {
            descText = record.get('text');
            Ext.MessageBox.confirm('L&ouml;schen', 'Soll der Eintrag "' + descText + '" entfernt werden?', function (btn) {
                if (btn === 'yes') {
                    record.remove();
                    treePanel.store.sync();
                }
            });
        }
    },

    /**
     * removes a tree node from the compilation tree
     *
     * @param {Ext.Component} cmp Any child component of the tree panel.
     * @param {Ext.Component}  tree The tree panel. (optional)
     */
    removeTreeItemCollationTree: function (cmp, tree) {
        var treePanel, record, descText;
        treePanel = ( typeof cmp === 'object') ? cmp.up('treepanel') : tree;
        record = treePanel.getSelectionModel().getLastSelected() || null;
        if (record !== null) {
            descText = record.get('text');
            Ext.MessageBox.confirm('L&ouml;schen', 'Soll das Dokument "' + descText +
                                              '" in den Papierkorb verschoben werden?', function (btn) {
                if (btn === 'yes') {
                    record.remove();
                    treePanel.store.sync();
                }
            });
        }
    },

    /**
     * converts drop data passed from a grid
     *
     * @param {Ext.Component} cmp
     * @param {HTMLElement} unused_node
     * @param {Object} data
     * @param {Ext.data.Model} unused_overModel
     * @param {String} unused_dropPosition
     * @param {Object} dropHandlers
     */
    prepareDropData: function (cmp, unused_node, data, unused_overModel, unused_dropPosition, dropHandlers) {
        var i, key, refresh = false, records;
        dropHandlers.wait = true;
        records = data.records;
        for (i = 0; i < records.length; i += 1) {
            key = records[i].get('key');
            if (typeof key === 'string') {
                records[i].set('text', Zen.app.getController('io.IO').getKeyDesc(key));
                records[i].set('id', key + '-' + Zen.Global.generateUid());
                records[i].set('leaf', true);
                refresh = true;
            }
        }
        if (refresh) {
            cmp.getSelectionModel().deselectAll();
        }
        dropHandlers.processDrop();
    },

    /**
     * The drop handler; calls the sync method of the tree store.
     *
     * @param {Ext.Component} tree The tree component.
     */
    onDrop: function (tree) {
        tree.store.sync();
    },

    /**
     * loads data to a tree item context menu and shows the context
     * menu.
     *
     * @param {Ext.view.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} unused_item
     * @param {Number} unused_index
     * @param {Ext.EventObject} e
     */
    openContextMenu: function (view, record, unused_item, unused_index, e) {
        var id, key, m;
        m = (record.get('leaf')) ? view.up('treepanel').fileMenu : view.up('treepanel').folderMenu;
        id = record.get('id');
        if (m && id) {
            key = (id.indexOf('-') !== -1) ? id.substring(0, id.indexOf('-')) : id;
            m.rowSelection = null;
            m.key = key;
            m.showAt(e.getXY());
        }
        e.stopEvent();
    }
});
