/**
 * A pane showing the details of a database record.
 */
Ext.define('Zen.view.component.DetailPane', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.detailpane',
    requires: ['Ext.button.Cycle'],

    autoScroll   : true,
    bodyBorder   : true,
    bodyCls      : 'body-no-border',
    cls          : 'nopadding',
    frame        : true,
    height       : 'auto',
    preventHeader: true,
    scroll       : true,
    title        : 'Detailansicht',

    config       : {
        /**
         * @cfg {String} key When a string value is passed, the document
         *      with this key gets loaded initially.
         */
        key   : null,
        /**
         * True when the pane is on the left side, i.e., the controlling detail pane.
         */
        master: false
    },
    isBusyLoading: false,
    record       : null,
    /**
     * The current view type. Possible values:
     *
     * - mod
     * - original
     * - xml
     * - xml-full
     *
     * @type String
     */
    /**
     * Title text of the displayed document, changes with every new loaded
     * content
     *
     * @type String
     */
    titleText    : null,
    /**
     * TODO in Funktion packen Returns true if the toolbar of the current
     * component is shown
     *
     * @type Boolean
     */
    hasToolbar   : false,
    /**
     * The key of the currently loaded document
     *
     * @type String
     */
    key          : null,
    viewMode     : 'mod',

    /**
     * Empty function
     */
    initRight: function () {
    },

    initComponent: function (config) {
        var me=this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.addEvents('loadimage', /**
             * @event innerclick Triggered after a badge or image-link has been
             *        clicked.
             */
            'innerclick', /**
             * @event modelload Fired after the model has loaded.
             */
            'modelload', /**
             * @event innercontextmenu Triggered by a right click in the body.
             */
            'innercontextmenu', 'requestswitchright', 'linkclick', 'linkcontextmenu');

        me.adjustVisibility();

        me.record = me.createModel();
        me.menu = me.createMenu();
        me.dockedItems = me.createDockedItems();

        me.linkContextMenu = me.createLinkContextMenu();
        me.citationMenu = me.createCitationMenu();

        me.callParent(arguments);
    },

    getKey: function () {
        return this.key;
    },

    adjustVisibility: function () {
        this.permissionBtnCls = (Zen.Global.getPref('groups')) ? 'badge' : 'badge-plain';
    },

    createModel: function () {
        return Ext.create('Zen.model.component.DetailPane');
    },

    createDockedItems: function () {
        var me = this, idTemplate = new Ext.XTemplate('<div class="docinfo"><tpl if="rsqv[0] !==\'\'"><tpl for="rsqv">' +
                                                      '<a href="http://rsqv.de/{.}" target="_blank">&#x00A0;' +
                                                      '<img src="resources/img/rsqv.gif"' +
                                                      ' data-qtip="Datensatz {.} im Richard-Strauss-Quellenverzeichnis (RSQV)"' +
                                                      ' class="rsqv-image"/></a>' +
                                                      '</tpl></tpl> <span class="badge-plain" ' +
                                                      'data-qtip="Identifikationsnummer des Dokuments">{key}</span>&#8195;' +
                                                      '<tpl if="rev !== null">Revision {rev}</tpl>' +
                                                      '<tpl if="rev === null"><div class="docdate">{[this.parseDate(values.date)]}</span></tpl>' +
                                                      '</div>', {
            parseDate: function (date) {
                if (date) {
                    return date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4) + ', ' +
                           date.substring(11, 16);
                }
            }
        });

        return [
            {
                xtype         : 'toolbar',
                cls           : 'header-toolbar',
                enableOverflow: true,
                dock          : 'top',
                defaults      : {
                    handler: function (cmp) {
                        var action = cmp.action, key = me.key;
                        if (typeof key === 'string' && typeof action === 'string') {
                            Zen.app.fireEvent(action, key);
                        }
                    }
                }
            },
            {
                xtype : 'component',
                dock  : 'top',
                itemId: 'header'
            },
            {
                xtype : 'toolbar',
                itemId: 'bottomtoolbar',
                cls   : 'bottom-toolbar',
                dock  : 'bottom',
                items : [
                    {
                        xtype: 'label',
                        cls  : 'bottom-toolbar-text-item',
                        name : 'permissions',
                        tpl  : '<span class="{cls}" data-qtip="Sichtbarkeit des Dokuments">{text}</span>'
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'label',
                        cls  : 'bottom-toolbar-text-item',
                        name : 'id',
                        tpl  : idTemplate
                    }
                ]
            }
        ];
    },

    createMenu: function () {
        return Ext.widget(this.contextMenu);
    },

    createLinkContextMenu: function () {
        return Ext.widget('linkcontextmenu');
    },

    createCitationMenu: function () {
        if (this.citationContextMenu) {
            return Ext.widget(this.citationContextMenu);
        }
    },

    initToolbar: function () {
        var me = this, toolbar = this.down('toolbar');
        me.removeCls('nopadding');
        toolbar.add([
            {
                tooltip: 'Erneut laden',
                glyph : '57348@iconfont',
/*                text   : '<span class="zencon-refresh"/>',*/
                handler: me.reloadModel,
                scope  : me
            },
            Zen.Global.getActionConfig('editDoc'),
            Zen.Global.getActionConfig('memorize'),
            Zen.Global.getActionConfig('moveToBin'),
            '->',
            me.getViewCycleConfig()
        ]);
        if (this.master) {
            toolbar.add(me.getRightViewTogglerConfig());
        }
    },

    getRightViewTogglerConfig: function () {
        var me = this;
        return [
            {
                text: 'Rechts öffnen',
                ui  : 'default',
                menu: [
                    {
                        iconCls    : 'zencon-copy adjust',
                        text       : 'Duplikat',
                        targetXType: 'detailpane',
                        scope      : me,
                        handler    : me.handleToggleRightClick
                    },
                    {
                        iconCls    : 'zencon-images adjust',
                        text       : 'Abbildungen',
                        targetXType: 'img',
                        scope      : me,
                        handler    : me.handleToggleRightClick
                    },
                    {
                        iconCls    : 'zencon-history adjust',
                        text       : 'Revisionsgeschichte',
                        targetXType: 'versions',
                        scope      : me,
                        handler    : me.handleToggleRightClick
                    }
                ]
            }
        ];
    },

    handleToggleRightClick: function (btn) {
        var me = this;
        me.fireEvent('requestswitchright', me, btn.targetXType, me.key);
    },

    getViewCycleConfig: function () {
        var me = this;
        return {
            xtype        : 'cycle',
            forceIcon    : 'zencon-file adjust',
            showText     : true,
            renderTo     : Ext.getBody(),
            tooltip      : 'Ansicht',
            // width : 130,
            menu         : {
                items: [
                    {
                        text    : 'Formatiert',
                        viewMode: 'mod',
                        itemId  : 'printview',
                        checked : true
                    },
                    {
                        text    : 'Diplomatisch',
                        viewMode: 'original'
                    },
                    {
                        itemId  : 'cycle',
                        text    : 'XML (roh)',
                        viewMode: 'xml'
                    },
                    {
                        text    : 'XML (publik)',
                        viewMode: 'xml-full'
                    }
                ]
            },
            changeHandler: me.setView,
            scope        : me
        };
    },

    setView: function (unused_cycleBtn, activeItem) {
        var me = this;
        me.viewMode = activeItem.viewMode;
        me.loadModel(me.key, me.rev);
    },

    setPrintView: function (show) {
        var printView = this.down('#printview');
        if (printView !== null) {
            printView.setDisabled(!show);
        }
    },

    loadModel: function (key, rev, rememberOldKey) {
        var me = this, query;
        if (me.isBusyLoading) {
            Ext.log('loading skipped');
        } else {
            if (typeof key === 'string') {
                me.isBusyLoading = true;
                query = me.constructQuery(key, rev);
                me.performQuery(key, query);
                me.manageOldKey(rememberOldKey);
            }
        }
    },

    reloadModel: function () {
        var me = this;
        me.loadModel(me.key, me.rev);
    },

    constructQuery: function (key) {
        var me = this;
        return Zen.Global.getQueryPathFromKey(key) + '?key=' + key + '&ueb=' + me.viewMode + '&master=' + me.master;
    },

    performQuery: function (key, query) {
        var me = this;
        me.record.getProxy().url = query;
        Zen.model.component.DetailPane.load(0, {
            failure: function () {
                me.isBusyLoading = false;
                Ext.log('Loading the detail view data failed.');
            },
            success: function (record) {
                me.isBusyLoading = false;
                me.record = record;
                me.key = key;
                me.fireEvent('modelload', me);
            }
        });
    },

    manageOldKey: function (rememberOldKey) {
        var me = this;
        if (!rememberOldKey) {
            me.oldKey = null;
        } else if (!me.oldKey) {
            me.oldKey = this.key;
        }
    },

    addCustomListeners: function () {
        var me = this;

        me.mon(me.el, 'click', function (e, el, eOpts) {
            me.fireEvent('innerclick', me, e, el, eOpts);
        }, me, {
            delegate: ':any(.badge|.compilation-doc|.img-link|.return-button)'
        });

        me.mon(me.el, 'contextmenu', function (e, el, eOpts) {
            me.fireEvent('innercontextmenu', me, e, el, eOpts);
        }, me, {
            delegate: ':any(.compilation-doc|.x-panel-body)'
        });

        me.mon(me.el, 'click', function (e, el, eOpts) {
            me.fireEvent('linkclick', me, e, el, eOpts);
        }, me, {
            delegate: 'a.link'
        });
        me.mon(me.el, 'contextmenu', function (e, el, eOpts) {
            me.fireEvent('linkcontextmenu', me.linkContextMenu, e, el, eOpts);
        }, me, {
            delegate: 'a.link'
        });
    },

    addTooltip: function () {
        var me = this;
        me.tooltip = Ext.widget('linktooltip', {
            target: me.el
        });
    },

    afterRender: function () {
        var me = this;
        me.addCustomListeners();
        if (Zen.Global.getUIPref('tooltips')) {
            me.addTooltip();
        }
        me.callParent(arguments);
    },

    beforeDestroy: function () {
        var me = this;
        if (me.menu) {
            me.menu.destroy();
        }
        if (me.citationMenu) {
            me.citationMenu.destroy();
        }
        if (me.linkContextMenu) {
            me.linkContextMenu.destroy();
        }
        if (me.tooltip) {
            me.tooltip.destroy();
        }
        me.callParent(arguments);
    }
});
