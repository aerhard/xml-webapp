/**
 * The dialogs' controller.
 */
Ext.define('Zen.controller.dialog.Dialogs', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.application.on({
            openlistdialog  : this.openListDialog,
            resourcerestored: this.onResourceRestored,
            scope           : this
        });

        this.control({
            'bin-searchgrid'   : {
                updatekey: this.onUpdateKey
            },
            'locked-searchgrid': {
                updatekey: this.onUpdateKey,
                unlock   : this.onUnlockButtonClick
            }

        });
    },

    openListDialog: function (cat) {
        var dialog = Zen.view.DoublePaneFactory.createListDialog(cat);
        dialog.show();
    },

    onUpdateKey: function (cmp, key) {
        var win, rightCmp;
        win = cmp.up('abstractlistdialog');
        rightCmp = win.getComponent('docright');
        if (!rightCmp) {
            win.add(win.cfg.rightConfig);
            rightCmp = win.getComponent('docright');
        }
        rightCmp.loadModel(key);
    },

    onUnlockButtonClick: function (cmp, key) {
        var me = this;
        Zen.app.fireEvent('unlock', cmp, key, function () {
            if (key) {
                // if only one one resource got unlocked, remove it from the grid ...
                me.onResourceRestored(key);
            } else {
                // ... otherwise reload the store
                cmp.store.load();
            }
        });
    },

    onResourceRestored: function (key) {
        var grid, detailPane, win;
        win = Ext.ComponentQuery.query('abstractlistdialog')[0];
        if (win) {
            grid = win.down('abstractgrid');
            if (grid && grid.removalQueue) {
                grid.removalQueue.push(key);
                grid.processRemovalQueue();
            }
            detailPane = win.down('detailpane');
            if (detailPane && detailPane.key === key) {
                detailPane.destroy();
                // set right view to (empty) initial config state
                win.add(Ext.widget('bin-detailpane', win.getRightConfig()));
            }
        }
    }
});
