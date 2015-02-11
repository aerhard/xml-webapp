/**
 * The controller of all tabs.
 */
Ext.define('Zen.controller.tab.AbstractTab', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({
            'maintabpanel abstracttab': {
                activate: this.onActivate
            },

            'linkcontextmenu menuitem': {
                click: this.onLinkContextButtonClick
            },

            'abstractgrid'   : {
                linkclick      : this.onLinkClick,
                linkcontextmenu: this.onLinkContextMenu
            },
            'detailpane'     : {
                updatekey         : this.onUpdateKey,
                loadimage         : this.loadImageInRightCmp,
                requestswitchright: this.switchRightComponent,
                linkclick         : this.onLinkClick,
                linkcontextmenu   : this.onLinkContextMenu

            },
            'compilationtree': {
                updatekey: this.onUpdateKey
            },
            'searchgrid'     : {
                updatekey: this.onUpdateKey
            }
        });
    },

    onActivate: function (cmp) {
        var grid = cmp.down('searchgrid');
        if (grid && grid.processRemovalQueue) {
            grid.processRemovalQueue();
            grid.focusFirstField();
        }
    },

    onUpdateKey: function (cmp, key, rememberOldKey) {
        this.loadDetailInRightCmp(key, cmp.up('abstracttab'), rememberOldKey);
    },

    onLinkClick: function (cmp, e, el) {
        var key, tab = cmp.up('abstracttab');
        e.stopEvent();
        key = Ext.fly(el).getAttribute('data-key');
        this.loadDetailInRightCmp(key, tab, true);
        return false;
    },

    loadDetailInRightCmp: function (key, tab, rememberOldKey) {
        var rightCmp = tab.getComponent('docright');
        if (rightCmp.xtype === 'detailpane') {
            rightCmp.loadModel(key, null, rememberOldKey);
        } else {
            this.switchRightComponent(rightCmp, 'detailpane', key);
        }
    },

    loadImageInRightCmp: function (cmp, imgPath) {
        var rightCmp, tab = cmp.up('abstracttab');
        rightCmp = tab.getComponent('docright');
        if (rightCmp.xtype === 'img' && rightCmp.key === cmp.key) {
            rightCmp.setPageContent(imgPath);
        } else {
            this.switchRightComponent(rightCmp, 'img', cmp.key, imgPath);
        }
    },

    /**
     *
     * @param {Ext.Component} cmp
     * @param {String} xtype
     * @param {String} key
     * @param {String} imgPath The path of the first image to show (optional)
     */
    switchRightComponent: function (cmp, xtype, key, imgPath) {
        var tab, leftCmp;
        tab = cmp.up('abstracttab');
        leftCmp = tab.getComponent('docleft');
        Ext.suspendLayouts();
        tab.remove(tab.getComponent('docright'));
        tab.setRightConfigXType(xtype);
        tab.add(tab.getRightConfig());
        Ext.resumeLayouts(true);
        if (imgPath) {
            tab.getComponent('docright').options = {
                "imgPath": imgPath
            };
            tab.getComponent('docright').initRight(leftCmp);
        } else {
            if (key && xtype === 'detailpane') {
                tab.getComponent('docright').loadModel(key);
            } else {
                tab.getComponent('docright').initRight(leftCmp);
            }
        }
    },

    onLinkContextMenu: function (m, e, el) {
        e.stopEvent();
        m.key = el.getAttribute('data-key');
        m.showAt(e.getXY());
        return false;
    },

    onLinkContextButtonClick: function (cmp) {
        var action, key;
        action = cmp.action;
        key = cmp.up('menu').key;
        if (typeof action === 'string' && typeof key === 'string') {
            Zen.app.fireEvent(action, key);
        }
    }
}); 