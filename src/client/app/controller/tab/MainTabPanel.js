/**
 * The controller of the main tab panel.
 */
Ext.define('Zen.controller.tab.MainTabPanel', {
    extend: 'Ext.app.Controller',

    requires: ['Zen.view.DoublePaneFactory'],

    refs: [
        {
            ref     : 'mainTabPanel',
            selector: 'maintabpanel'
        }
    ],

    /**
     * Initializes the tab panel controller.
     */
    init: function () {
        Zen.app.on({
            opensearchtab : this.openSearchTab,
            opendetailtab : this.openDetailTab,
            openkeyreflist: this.openKeyRefList,
            scope         : this
        });

    },

    /**
     * Searches for all grid panels with the specified xtype and enqeues the
     * removal of the records with the specified key; if there is a matching
     * grid panel currently active, its {processRemovalQueue()} function will be
     * called immediately.
     *
     * @param {String} key the key to remove
     * @param {String} gridXType the grid xtype to search for
     */
    clearGridRecords: function (key, gridXType) {
        var mainTabPanel, grid, activeGrid;
        mainTabPanel = this.getMainTabPanel();
        mainTabPanel.items.each(function (item) {
            grid = item.down(gridXType);
            if (grid && grid.removalQueue) {
                grid.removalQueue.push(key);
            }
        });
        activeGrid = mainTabPanel.getActiveTab().down(gridXType);
        if (activeGrid && activeGrid.processRemovalQueue) {
            activeGrid.processRemovalQueue();
        }
    },

    /**
     * Searches for all detailpane components. All matching detailpanes will be
     * removed; if a detailpane is on the left of its tab container, the whole
     * container will be removed.
     *
     * @param {String} key the key to remove
     */
    clearDetailViews: function (key) {
        var i, detailViews, viewKey, parent;
        detailViews = Ext.ComponentQuery.query('detailpane');
        for (i = 0; i < detailViews.length; i += 1) {
            viewKey = detailViews[i].key;
            parent = detailViews[i].up('abstracttab');
            if (viewKey === key) {
                if (detailViews[i].master) {
                    parent.close();
                } else {
                    // if the parent container has not been destroyed in the meantime ...
                    if (parent) {
                        detailViews[i].destroy();
                        // set right view to (empty) initial config state
                        parent.add(Ext.widget('detailpane', parent.getRightConfig()));
                    }

                }
            }
        }
    },

    /**
     * Refreshes all detail view panels in the currently active tab.
     */
    refreshActiveDetailViews: function () {
        var i, detailViews, activeTab;
        activeTab = this.getMainTabPanel().getActiveTab();
        if (activeTab) {
            detailViews = activeTab.query('detailpane');
            for (i = 0; i < detailViews.length; i += 1) {
                detailViews[i].reloadModel();
            }
        }
    },

    /**
     * Opens a new search tab and initializes a query on the server to match
     * documents which refer to the specified key.
     *
     * @param {String} cat the document category which should be searched
     * @param {String} key The key to search for
     */
    openKeyRefList: function (cat, key) {
        var tab, store, grid;
        tab = Zen.view.DoublePaneFactory.createTab(cat);
        if (typeof key === 'string') {
        		grid = tab.down('grid');
        		grid.fireEvent('addsearchfield', grid, 'ref', key); 
        
            store = tab.down('grid').store;
            store.getProxy().extraParams = {
                key: key
            };
            store.load();
            store.getProxy().extraParams = {};
        }
        this.getMainTabPanel().addAndShow(tab);
    },

    /**
     * Opens a new search tab.
     *
     * @param {String} cat
     * @param {String} fulltext
     */
    openSearchTab: function (cat, fulltext) {
        var tab, store;
        window.focus();
        tab = Zen.view.DoublePaneFactory.createTab(cat);
        if (typeof fulltext === 'string') {
            store = tab.down('grid').store;
            store.getProxy().extraParams.fulltext = fulltext;
            store.load();
            tab.down('grid').getDockedComponent('toptoolbar').down('textfield[name=fulltext]').setRawValue(fulltext);
        }
        this.getMainTabPanel().addAndShow(tab);
    },

    /**
     * Opens a new detail view tab
     *
     * @param {String} key The key of the left component.
     * @param {String} rightXType The xtype of the right component.
     * @param {Object} options The option of the right component.
     */
    openDetailTab: function (key, rightXType, options) {
        var tab;
        if (key) {
            tab = Zen.view.DoublePaneFactory.createDetailTab(key, options, rightXType);
            tab.getComponent('docleft').loadModel(key);
            this.getMainTabPanel().addAndShow(tab);
        }
    }
});
