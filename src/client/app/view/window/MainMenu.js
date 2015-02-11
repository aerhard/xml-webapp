/**
 * The viewport's main menu.
 */
Ext.define('Zen.view.window.MainMenu', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.mainmenu',

    baseCls: 'main-menu',

    /**
     * Initializes the menu.
     */
    initComponent: function () {
        var me = this;
        if (Zen.Global.getUIPref('showEditorMenu')) {
            me.editorMenu = me.createEditorMenuConfig();
            // me.userMenu = me.createUserMenuConfig();
            me.helpMenu = me.createHelpMenuConfig();
        }
        me.items = me.createToolbarConfig();
        me.callParent(arguments);
    },

    /**
     * Creates the config of the editor menu's items.
     *
     * @return {Object[]} An array of menu item config objects.
     */
    createEditorMenuConfig: function () {
        return {
            iconCls : 'x-toolbar-more-icon',
            arrowCls: '',
            menu    : {
                items: [
                    {
                        text  : 'Neues Dokument',
                        itemId: 'newmenu',
                        menu  : {
                            items: Zen.Global.getUIPref('createDialogItems')
                        }
                    },
                    '-',
                    {
                        text   : 'Gesperrte Dokumente...',
                        iconCls: 'zencon-lock black',
                        handler: function () {
                            Zen.app.fireEvent('openlistdialog', 'locked');
                        }
                    },
                    '-',
                    {
                        text   : 'Papierkorb...',
                        iconCls: 'zencon-remove black',
                        handler: function () {
                            Zen.app.fireEvent('openlistdialog', 'bin');
                        }
                    }
                ]
            }
        };
    },

    /**
     * Creates the config of the user menu.
     * @return {Object} The config object.
     */
    createUserMenuConfig: function () {
        return {
            text: Zen.Global.getPref('user'),
            ui  : 'plain-toolbar-small',
            menu: {
                items: [
                    {
                        text   : 'Abmelden',
                        handler: function () {
                            window.location.search = '?logout=yes';
                        }
                    }
                ]
            }
        };
    },

    createHelpMenuConfig: function () {
        var G = Zen.Global;
        return {
            //        text:'<span class="zencon-question-sign"></span>',
            iconCls : 'zencon-question-sign adjust-question-button',
            arrowCls: '',
            menu    : {
                items: [
                    {
                        text   : 'Handbuch',
                        handler: function () {
                            window.open(G.getPath('help'));
                        }
                    },
                    {
                        text   : 'Bug report / Feature request',
                        handler: function () {
                            window.open(G.getPref('bugTrackerPath'));
                        }
                    }
                ]
            }
        };
    },

    /**
     * Creates the toolbar config.
     * @return {Object[]|String[]} An array of config objects / config strings.
     */
    createToolbarConfig: function () {
        var me = this, G = Zen.Global;
        return [me.editorMenu, '->', {
            xtype: 'label',
            html : '<div class="main-title">' + G.getPref('title') + '</div>'
        }, '->', me.userMenu, me.helpMenu];
    }
});

