/**
 * The main controller of the application containing global methods.
 */
Ext.define('Zen.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref     : 'viewport',
            selector: 'app-main'
        }
    ],

    init: function () {
        Zen.app.on({
            shortmessage   : this.shortMessage,
            resourcechanged: this.onResourceChanged,
            resourceremoved: this.onResourceRemoved,
            scope          : this
        });

        this.control({
            'sidepanel button'       : {
                click: this.onSearchMenuItemClick
            },
            'plustab menuitem'       : {
                click: this.onSearchMenuItemClick
            },
            '#searchmenu menuitem'   : {
                click: this.onSearchMenuItemClick
            },
            '#westsearchpanel button': {
                click: this.onWestSearchButtonClick
            },
            '#newmenu menuitem'      : {
                click: this.onCreateButtonClick
            }

        });
        Ext.fly(document.body).on('contextmenu', this.onContextMenuBubble);
    },

    shortMessage: function (title, text) {
        this.getViewport().getMsgBox().shortMessage(title, text);
    },

    onSearchMenuItemClick: function (cmp) {
        Zen.app.fireEvent('opensearchtab', cmp.typ);
    },

    onCreateButtonClick: function (btn) {
        if (btn.name) {
            Zen.app.fireEvent('createdoc', btn.name);
        }
    },

    /**
     * Handles click events of the west panel category buttons; fires
     * the 'opensearchtab' event
     *
     * @param {Ext.Component} cmp the button which has fired the event
     */
    onWestSearchButtonClick: function (cmp) {
        Zen.app.fireEvent('opensearchtab', cmp.typ);
    },

    /**
     * Handles the resourcechanged event and refreshes all detailview
     * panes with the specified key.
     *
     * @param {String} key
     */
    onResourceChanged: function (key) {
        var i, viewKey, detailViews;
        // refresh detail view components
        detailViews = Ext.ComponentQuery.query('detailpane');
        for (i = 0; i < detailViews.length; i += 1) {
            viewKey = detailViews[i].key;
            if (typeof viewKey === 'string' && viewKey === key) {
                detailViews[i].loadModel(key);
            }
        }
    },

    /**
     * Dispatches the resourceremoved event to the methods
     * clearGridRecords and clearDetailViews.
     *
     * @param {String} key
     */
    onResourceRemoved: function (key) {
        if (typeof key === 'string') {
            Zen.app.getController('tab.MainTabPanel').clearGridRecords(key);
            Zen.app.getController('tab.MainTabPanel').clearDetailViews(key);
        }
    },

    /**
     * Prevents the right-click event from bubbling up to the browser.
     *
     * @param {Ext.EventObject} e The event object.
     */
    onContextMenuBubble: function (e) {
        e.stopEvent();
    },

    onWindowFocus: function () {
        Zen.app.getController('tab.MainTabPanel').refreshActiveDetailViews();
    },

    /**
     * Registers global keyboard event listeners.
     */
    onLaunch: function () {
        this.keyMap = new Ext.util.KeyMap({
            target : Ext.getBody(),
            binding: [
                {
                    key               : Ext.EventObject.W,
                    ctrl              : true,
                    fn                : function () {
                        Ext.ComponentQuery.query('maintabpanel')[0].removeActiveTab();
                    },
                    defaultEventAction: "stopEvent"
                },
                {
                    key               : Ext.EventObject.S,
                    ctrl              : true,
                    fn                : function () {
                        Ext.ComponentQuery.query('#searchField')[0].focus(true, 50);
                    },
                    defaultEventAction: "stopEvent"
                }
            ]
        });
    }
});
